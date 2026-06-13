import axios from 'axios'

export async function getMostPopularPost() {

    const url = 'http://127.0.0.1:8000/api/posts/featured'

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        console.log(data.data)
        return data.data

    }
    catch (error) {
        throw error
    }

}

export async function getPopularPosts() {

    const url = 'http://localhost:8000/api/posts/featured_posts'

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        return data.data

    }
    catch (error) {
        throw error
    }

}

export async function getMostRecentPosts() {
    
    const url = 'http://localhost:8000/api/posts'

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        return data.data

    }
    catch (error) {
        throw error
    }

}

export async function getRequestedPost(id) {
    const url = `http://localhost:8000/api/posts/${id}`

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        return data.data

    }
    catch (error) {
        throw error
    }
}

export async function getPostsFromCategory(category) {
    
    const url = `http://localhost:8000/api/posts/category/${category}`

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        // console.log(data)
        return data.data

    }
    catch (error) {
        throw error
    }

}