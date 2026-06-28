import React, { useEffect, useMemo, useState } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import PostsViewer from '../../components/MyPostPage/PostsViewer'
import AnalyticsCard from '../../components/cards/AnalyticsCard'
import PostCreator from '../../components/MyPostPage/PostCreator'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deletePost, getMyPosts, createPost, updatePost } from '../../apis/postApi'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../assets/Icon'
import PostContentContainer from '../../components/MyPostPage/PostContentContainer'
import { useLocation } from 'react-router-dom'
import ConfirmationModal from '../../components/modals/ConfirmationModal'

const MyPosts = () => {

    const { user } = useAuth()

    const location = useLocation()

    const [isConfirmationModalActive, setIsConfirmationModalActive] = useState(false)

    const [postView, setPostView] = useState(0) // 0: empty state, 1: new post, 2: editing post not related to the component PostsView
    const [selectedPost, setSelectedPost] = useState(
        {
            id: null,
            title: '',
            thumbnail: null,
            excerpt: '',
            mainContent: ``,
            url: '',
            tags: [],
            metaDesc: '',
            author: user,
            category: {
                id: null,
                category_name: ''
            },
            created_at: '',
            is_published: false
        }
    )

    const { isLoading, error, data } = useQuery({
        queryFn: () => getMyPosts(user?.id),
        queryKey: ['get_my_posts', user?.id]
    })

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        mutationKey: ['delete_post'],
        onMutate: async (deletedId) => {
            if (!user?.id) return { previousPosts: [] };

            await queryClient.cancelQueries({ 
                queryKey: ['get_my_posts', user?.id] 
            });

            // Get previous data with fallback
            const previousPosts = queryClient.getQueryData(['get_my_posts', user?.id]) || [];

            // Update the cache with safety checks
            queryClient.setQueryData(['get_my_posts', user?.id], (oldData) => {
                // If oldData is undefined or null, return empty array
                if (!oldData) return [];
                
                // Filter out the deleted post
                return oldData?.posts?.filter((post) => post.id !== deletedId);
            });

            return { previousPosts };
        },

        onError: (error, deletedId, context) => {
            // Restore previous data
            if (user?.id) {
                queryClient.setQueryData(
                    ['get_my_posts', user?.id], 
                    context?.previousPosts || []
                );
            }
            console.error('Delete error:', error);
        },

        onSettled: () => {
            if (user?.id) {
                queryClient.invalidateQueries({ 
                    queryKey: ['get_my_posts', user?.id] 
                });
            }
        },
    })

    const createPostMutation = useMutation({
        mutationFn: createPost,
        mutationKey: ['create_post'],
        onMutate: async (data) => {

            await queryClient.cancelQueries({ querykey: ['get_my_posts', user?.id] })

            const previousPosts = queryClient.getQueryData(['get_my_posts', user?.id]);

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
                created_at: data?.created_at,
                isOptimistic: true
            }

            queryClient.setQueryData(['get_my_posts', user?.id], (old) => {
                return old ? [optimisticPost, ...old] : [optimisticPost]
            })

            return { previousPosts }

        },
        onSuccess: (data) => {

            queryClient.setQueryData(['get_my_posts', user?.id], (old) => {
                return old.map(post => 
                    post?.id === `temp-${new Date().toLocaleDateString()}`
                    ?   { ...data?.data, isOptimistic:false }
                    :   post
                )
            })

            setPostView(2)
            setSelectedPost(data?.post)

        },
        onError: (error, variables, context) => {
            // Rollback to previous state on error
            if (context?.previousPosts) {
                queryClient.setQueryData(['get_my_posts', user?.id], context.previousPosts);
            }
            console.error('Failed to add post:', error);
        },  
        onSettled: (data, error, variables, context) => {
            // Always refetch to ensure consistency
            queryClient.invalidateQueries({ queryKey: ['get_my_posts', user?.id] });
        },

    })

    const updatePostMutation = useMutation({
        mutationFn: updatePost,
        mutationKey: ['update_post'],
        onSuccess: (updatedPost) => {

            // console.log('updated post: ', updatedPost)

            queryClient.setQueryData(['get_my_posts', user?.id], (oldData) => {
                
                // console.log('old data: ', oldData)    

                return oldData?.map((post) => 
                    post?.id === updatedPost?.post?.id ? updatedPost?.post : post 
                )
            })

            // Also update individual post query if it exists
            // queryClient.setQueryData(['get_my_posts', updatedPost.id], updatedPost);



        },  
        onError: (error) => {
            console.error('Update error:', error);
        }
    })
    
    /* 
        params
        post: the post itself (contains the data)
        isNew: checks if it is a new one, or if it has already been created

    */
    const handlePostSelect = (post, isNew) => {

        if (isNew === true && post === null) {
            setSelectedPost({
                id: null,
                title: '',
                thumbnail: null,
                excerpt: '',
                mainContent: ``,
                url: '',
                tags: [],
                metaDesc: '',
                author: user,
                category: {
                    id: null,
                    category_name: ''
                },
                created_at: '',
                is_published: false
            })    
            setPostView(1)
        }
        else {
            setSelectedPost({...post})
            setPostView(2)
        }
    }

    const handleToggleModal = () => {
        setIsConfirmationModalActive(!isConfirmationModalActive)
    }  
    
    const handleDeletePost = (id) => {
        deleteMutation.mutate(id)
        setIsConfirmationModalActive(false)
        setSelectedPost({
            id: null,
            title: '',
            thumbnail: null,
            excerpt: '',
            mainContent: ``,
            url: '',
            tags: [],
            metaDesc: '',
            author: user,
            category: {
                id: null,
                category_name: ''
            },
            created_at: '',
            is_published: false
        })
        setPostView(0)
    }

    const handleCreatePost = (post) => {
        createPostMutation.mutate(post)
    }

    const handleUpdatePost = (post) => {
        updatePostMutation.mutate(post)
    }

    // useEffect(() => {
    //     console.log(selectedPost)
    // }, [selectedPost])

    // used to remember state when coming back from preview
    useEffect(() => {
        const state = location.state;
        console.log(state)
        if (state?.from === 'preview') {
            if (state?.post?.id !== null) {
                setSelectedPost(state?.post)
                setPostView(2)
            }
            else {
                setSelectedPost(state?.post)
                setPostView(1)
            }
        }
    
    }, [location]);

    if (isLoading) {
        return (
            <div
                className='w-full h-screen flex items-center justify-center'
            >
                <Icon
                    type={'spinner'}
                    size='20'
                    className='text-text/80 animate-spin'
                />
            </div>
        )
    }
    else if (error) {
        return (
            <div
                className='aspect-video rounded items-center justify-center flex shadow shadow-text/50 flex-col gap-2 text-text/80 w-full h-screen'
            >
                <Icon
                    type={'sad'}
                    size='80'
                    className='text-text'
                />  
                <h3
                    className='w-1/6 text-center'
                >
                    An error has occured, please try reloading the page
                </h3>
            </div>
        )
    }
    else {
        return (
            <DashboardLayout
                // className='w-full h-full p-5 grid grid-cols-16 grid-rows-16 gap-4'
            >
                
                {/* {
                    analytics.map((analytic) => (
                        <AnalyticsCard
                            key={analytic.name}
                            icon={analytic.icon}
                            name={analytic.name}
                            stat={analytic.stat}
                        />
                    ))
                } */}
                <PostsViewer
                    posts={data}
                    handlePostSelect={handlePostSelect}
                />

                <PostContentContainer
                    postView={postView}
                    selectedPost={selectedPost}
                    handleToggleModal={handleToggleModal}
                    handleCreatePost={handleCreatePost}
                    handleUpdatePost={handleUpdatePost}
                />

                <ConfirmationModal
                    isActive={isConfirmationModalActive}
                    cancelFtn={() => handleToggleModal()}
                    ftn={() => handleDeletePost(selectedPost?.id)}
                />
    
            </DashboardLayout>   
        )
    }

}

export default MyPosts
