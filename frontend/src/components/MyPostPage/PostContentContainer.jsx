import React, { useEffect, useState } from 'react'
import DropDownBox from './DropDownBox'
import TitleBlock from './TitleBlock'
import FeaturedImageBlock from './FeaturedImageBlock'
import RichTextEditorBlock from './RichTextEditorBlock'
import RichTextInput from '../inputs/RichTextInput'
import Toolbar from '../btns/Toolbar'
import ArticleTab from './ArticleTab'
import UrlBox from './UrlBox'
import LabelBox from './LabelBox'
import { data, Link, useLocation, useNavigate } from 'react-router-dom'
import Icon  from '../../assets/Icon'
import { slugify } from '../../utils/textUtils'
import IsPublishedBox from '../MyPostPage/IsPublishedBox'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../../apis/postApi'
import { useAuth } from '../../context/AuthContext'

const PostContentContainer = ({ 
    postView = 0,
    selectedPost = {},
    handleToggleModal
}) => {

    const { user } = useAuth()

    const tabs = ['Main', 'Content', 'SEO']
    const [currentTab, setCurrentTab] = useState('Main')
    const [post, setPost] = useState(selectedPost)

    const navigate = useNavigate()
    const location = useLocation()

    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: () => createPost(post),
        mutationKey: ['create_post', post],
        onMutate: async (data) => {

            await queryClient.cancelQueries({ querykey: ['get_my_posts'] })

            const previousPosts = queryClient.getQueryData(['get_my_posts']);

            const optimisticPost = {
                id: new Date().toLocaleDateString(),
                title: data?.title,
                excerpt: data?.excerpt,
                thumbnail: data?.thumbnail,
                author: user,
                category: data?.category,
                tags: data?.tags,
                url: data?.url,
                mainContent: data?.mainContent,
                date: data?.date,
                isOptimistic: true
            }

            queryClient.setQueryData(['get_my_posts'], (old) => {
                return old ? [optimisticPost, ...old] : [optimisticPost]
            })

            return { previousPosts }

        },
        onSuccess: (data) => {

            queryClient.setQueryData(['get_my_posts'], (old) => {
                return old.map(post => 
                    post?.id === `temp-${new Date().toLocaleDateString()}`
                    ?   { ...data?.data, isOptimistic:false }
                    :   post
                )
            })

        },
        onError: (error, variables, context) => {
            // Rollback to previous state on error
            if (context?.previousPosts) {
                queryClient.setQueryData(['get_my_posts'], context.previousPosts);
            }
            console.error('Failed to add post:', error);
        },  
        onSettled: (data, error, variables, context) => {
            // Always refetch to ensure consistency
            queryClient.invalidateQueries({ queryKey: ['get_my_posts'] });
        },

    })

    // featured tab 

    const handleTitleChange = (e) => {

        const title = e.target.value

        const url = slugify(title)

        setPost({ ...post, title: title, url: url })

    }

    const handleThumbnail = (image) => {
        if (post.thumbnail === image) {
            setPost({...post, thumbnail: null})
        }
        else {
            setPost({...post, thumbnail: image})
        }
    }  

    const handleExcerpt = (contentHTML) => {
        setPost({ ...post, excerpt: contentHTML })
    }

    // content tab

    const handleArticleChange = (contentHTML) => {
        setPost({ ...post , mainContent: contentHTML })
    }

    // SEO tab

    const handleSEOChange = (data, attr) => {
        setPost({ ...post, [attr]: data })
    }

    const handleTagChange = (tag) => {

        if (post.tags.includes(tag)) {
            const filterTags = post?.tags?.filter((currentTag) => currentTag !== tag)
            setPost({...post, tags: filterTags })
        }
        else {
            setPost({...post, tags: [...post.tags, tag]})
        }

    }

    const handleCategoryChange = (cat) => {
        setPost({...post, category: cat})
    }

    const handlePublishChange = () => {
        setPost({ ...post, is_published: !post?.is_published })
    }

    const handlePreviewPost = () => {

        navigate(
            `/preview/${post?.url}`, 
            { 
                state:{
                    from: 'My_posts',
                    data: post,
                    scrollPosition: window.scrollY
                }
            }
        )
    }

    const handleUpdatePost = (id, post) => {

    }

    const handleCreatePost = () => {
        createPostMutation.mutate(post)
    }

    useEffect(() => {
        setPost(selectedPost)
    }, [selectedPost])

    // useEffect(() => {
    //     console.log(post)
    // }, [post])
    

    const bottomBtns = [
        {
            name: 'Delete',
            icon:   <Icon
                        type={'trash'}
                        size='20'
                    />,
            ftn: () => handleToggleModal(),
        },
        {
            name: 'Preview',
            icon:   <Icon
                        type={'eye'}
                        size='20'
                    />,
            ftn: () => handlePreviewPost(),
        },
        {
            name: 'Update',
            icon:   <Icon
                        type={'update'}
                        size='20'
                    />,
            ftn: () => handleUpdatePost(0, {}),
        },
        {
            name: 'Create',
            icon:   <Icon
                        type={'plus'}
                        size='20'
                    />,
            ftn: () => handleCreatePost(0),
        },
    ] 

    if (postView === 0) {
        return (
            <div
                className='w-full h-full col-span-10 row-span-full col-start-7 bg-background shadow shadow-text/50 rounded flex flex-col gap-2 items-center justify-center'
            >
                
                <i
                    className='text-text/50'
                >
                    <Icon
                        type={'cardView'}
                        size='80'
                    />
                </i>

                <div
                    className='flex flex-col gap-1 items-center justify-center text-center'
                >
                    <h2
                        className='font-medium text-xl'
                    >
                        No post selected
                    </h2>
                    <p
                        className='w-3/5 text-text/70'
                    >
                        Select a post to start updating or, press the create button so start a new post
                    </p>
                </div>

            </div>
        )
    }
    else {
        return (
            <div
                className='flex flex-col w-full h-full col-span-10 col-start-7 row-span-full bg-background shadow shadow-text/50 rounded relative overflow-hidden gap-4 pb-10'
            >

                {/* tabs */}
                <div
                    className='w-full h-fit bg-secondary flex flex-row items-center'
                >
                    {
                        tabs?.map((tab, index) => (
                            <button
                                onClick={() => setCurrentTab(tab)}
                                className={`p-2 text-sm px-3 font-medium cursor-pointer
                                    ${index <= 0 && 'rounded-tl'}
                                    ${currentTab === tab ? 'bg-background text-primary' : 'bg-secondary text-text'}    
                                `}
                                key={tab}
                            >
                                {tab}
                            </button>
                        ))
                    }
                </div>

                {/* featured */}
                <div
                    className={`${currentTab === 'Main' ? 'flex' : 'hidden'} flex flex-col gap-3 px-5  overflow-y-scroll scrollbar-hide pb-10 w-full h-full`}
                >
                    
                    <TitleBlock
                        title={post?.title}
                        setTitle={handleTitleChange}
                    />

                    <FeaturedImageBlock
                        image={post?.thumbnail}
                        handleThumbnail={handleThumbnail}
                    />

                    <RichTextEditorBlock
                        wordLimit={512}
                        content={post?.excerpt}
                        handleChangeContent={handleExcerpt}
                        hiddenComm={['headings', 'align', 'code', 'lists']}
                    />

                </div>

                {/* Content */}
                <div
                    className={`${currentTab === 'Content' ? 'flex' : 'hidden'} flex flex-col gap-3 px-5  overflow-y-scroll scrollbar-hide pb-10 w-full h-full`}
                >
                    
                    <ArticleTab
                        content={post?.mainContent}
                        handleChangeContent={handleArticleChange}
                    />

                </div>

                {/* SEO */}
                <div
                    className={`${currentTab === 'SEO' ? 'flex' : 'hidden'} flex flex-col gap-3 px-5  overflow-y-scroll scrollbar-hide pb-10 w-full h-full`}
                >
                    
                    <LabelBox
                        tags={post?.tags}
                        category={post?.category}
                        handleTagChange={handleTagChange}
                        handleCategoryChange={handleCategoryChange}
                    />

                    {/* <UrlBox
                        currentUrl={post?.url}
                        titleStr={post?.title}
                        handleUrlChange={handleSEOChange}
                    /> */}

                    <IsPublishedBox
                        isPublished={post?.isPublished}
                        handleChangePublish={() => handlePublishChange()}
                    />

                </div>

                {/* delete, preview and update btns */}
                <div
                    className={`w-full h-fit absolute left-0 bottom-0 bg-background rounded-b flex flex-row items-center ${postView === 1 ? 'justify-end' : 'justify-between'} p-2`}
                >
                        {/* delete btn */}
                        <div
                            className='w-full h-fit flex'
                        >
                            <button
                                className={`flex pl-2.5 flex-row items-center gap-1 rounded p-2 px-3 bg-rose-100 text-rose-500 hover:bg-rose-500 hover:text-background duration-200 text-sm w-fit h-fit ${postView === 1 ? 'hidden' : 'flex'}`}
                                onClick={bottomBtns[0].ftn}
                            >
                                {bottomBtns[0].icon}
                                {bottomBtns[0].name}
                            </button>
                        </div>
                        

                    <div
                        className='w-fit h-fit flex flex-row items-center gap-2'
                    >   

                        {/* preview btn */}
                        <button
                            className={`${post?.title === "" ? 'hidden' : 'flex'} pl-2.5 flex-row items-center gap-1 rounded p-2 px-3 bg-secondary text-primary hover:bg-primary hover:text-background duration-200 text-sm w-fit h-fit`}
                            onClick={bottomBtns[1].ftn}
                        >
                            {bottomBtns[1].icon}
                            {bottomBtns[1].name}
                        </button>

                        {/* create or update btn */}
                        <button
                            className={`flex pl-2.5 flex-row items-center gap-1 rounded p-2 px-3 bg-primary text-background hover:bg-blue-900 duration-200 text-sm w-fit h-fit
                                ${
                                    // post?.url?.length <= 1  ||
                                    post?.thumbnail === null || post?.thumbnail === undefined ||
                                    post?.category?.category_id === null ||
                                    post?.title?.length <= 1 

                                    ?   'hidden'
                                    :   'flex'
                                }    
                            `}
                            onClick={
                                postView === 1
                                ? bottomBtns[3].ftn
                                : bottomBtns[2].ftn
                            }
                        >
                            {
                                postView === 1
                                ? bottomBtns[3].icon
                                : bottomBtns[2].icon
                            }
                            {
                                postView === 1
                                ? bottomBtns[3].name
                                : bottomBtns[2].name
                            }
                        </button>

                    </div>

                </div>

            </div>
        )
    }
    

}

export default PostContentContainer