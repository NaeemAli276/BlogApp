import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true
});

// Add request interceptor for authentication if needed
apiClient.interceptors.request.use(
    (config) => {
        // You can add auth tokens here
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.status, error.response.data);
        } 
        else if (error.request) {
            // Request was made but no response
            console.error('Network Error:', error.request);
        } 
        else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export async function getMostPopularPost() {

    const url = 'http://127.0.0.1:8000/api/posts/featured'

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        // console.log(data.data)
        return data.data

    }
    catch (error) {
        throw error
    }

}

export async function getPopularPosts() {

    const url = 'http://localhost:8000/api/posts/popular'

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

export async function getSpecifiedPosts(id) {
    const url = `http://localhost:8000/api/users/${id}/posts`

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        // console.log(data?.data)
        return data.data

    }
    catch (error) {
        throw error
    }
}


export async function getPostsFromCategory(category) {
    
    const url = `http://localhost:8000/api/categories/${category}/posts`

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

export async function getMyPosts(id) {
    
    const url = `http://localhost:8000/api/users/${id}/posts-and-stats`

    try {

        const { data } = await axios(url, {
            headers: {
                Accept: 'application/json'
            }
        })

        return data

    }
    catch (error) {
        throw error
    }

}

export async function createPost(post) {

    // Debug: Check if thumbnail is a File object
    console.log('🔍 THUMBNAIL DEBUG:');
    console.log('Type:', typeof post.thumbnail);
    console.log('Is File?', post.thumbnail instanceof File);
    console.log('Is Blob?', post.thumbnail instanceof Blob);
    console.log('Value:', post.thumbnail);
    
    if (post.thumbnail instanceof File) {
        console.log('File name:', post.thumbnail.name);
        console.log('File size:', post.thumbnail.size);
        console.log('File type:', post.thumbnail.type);
    }

    const formattedPost = {
        id: null,
        title: post?.title,
        excerpt: post?.excerpt,
        thumbnail: post?.thumbnail,
        category_id: post?.category?.id,
        tags: post?.tags?.map((tag) => (tag?.id)),
        url: post?.url,
        is_published: post?.is_published,
        mainContent: post?.mainContent
    }

    console.log(formattedPost)

    const response = await apiClient.post('/posts-crud/create', formattedPost)
    return response.data;

}