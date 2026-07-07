import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        // 'Content-Type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
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

        // console.log(data.data)
        return data.data

    }
    catch (error) {
        throw error
    }

}

export async function createPost(post) {

    const formData = new FormData();

    // Append simple text/numeric values
    formData.append('title', post?.title || '');
    formData.append('excerpt', post?.excerpt || '');
    formData.append('category_id', post?.category?.id || '');
    formData.append('url', post?.url || '');
    formData.append('mainContent', post?.mainContent || '');
    formData.append('user_id', post?.author?.id || '');

    // Convert boolean to 1 or 0 (Laravel handles this best in FormData)
    formData.append('is_published', post?.is_published ? '1' : '0');

    // Append the file/blob object
    if (post?.thumbnail) {
        formData.append('thumbnail', post?.thumbnail); 
    }

    // Append arrays by using square brackets 'tags[]'
    if (post?.tags) {
        post.tags.forEach((tag) => {
            if (tag?.id) {
                formData.append('tags[]', tag.id);
            }
        });
    }

    // // Log FormData content to verify (you cannot console.log(formData) directly)
    // for (let [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    // }

    // Send the FormData object directly
    const response = await apiClient.post('/posts-crud/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;


}

export async function deletePost(id) {
    const response = await apiClient.delete(`/posts-crud/delete/${id}`);
    return response.data; // or response.status for success confirmation
}

export async function updatePost(post) {
    
    const formData = new FormData();

    // Append simple text/numeric values
    formData.append('title', post?.title || '');
    formData.append('excerpt', post?.excerpt || '');
    formData.append('category_id', post?.category?.id || '');
    formData.append('url', post?.url || '');
    formData.append('mainContent', post?.mainContent || '');
    formData.append('user_id', post?.author?.id || '');

    // Convert boolean to 1 or 0 (Laravel handles this best in FormData)
    formData.append('is_published', post?.is_published ? '1' : '0');

    // Append the file/blob object
    if (post?.thumbnail) {
        formData.append('thumbnail', post?.thumbnail); 
    }

    // Append arrays by using square brackets 'tags[]'
    if (post?.tags) {
        post.tags.forEach((tag) => {
            if (tag?.id) {
                formData.append('tags[]', tag.id);
            }
        });
    }

    // // Log FormData content to verify (you cannot console.log(formData) directly)
    // for (let [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    // }

    // Send the FormData object directly
    const response = await apiClient.put(`/posts-crud/update/${post?.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;

}