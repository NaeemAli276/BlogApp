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

export async function getPostComments(id) {
    const url = `http://localhost:8000/api/posts/${id}/comments`

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

export async function createComment(comment) {
    
    const response = apiClient.post(`/comments-crud/create/`, comment, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response

}

export async function deleteComment(id) {
    const response = await apiClient.delete(`/comments-crud/delete/${id}`);
    return response.data;
}

export async function updateComment(comment) {
    const response = await apiClient.put(`/comments-crud/update/${comment?.id}`, comment, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

// replies

export async function getCommentReplies(id) {
    const url = `http://localhost:8000/api/comments/${id}/replies`

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

export async function createReply(reply) {
    const response = apiClient.post(`/reply-crud/create/`, reply, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response
}

export async function deleteReply(id) {
    const response = await apiClient.delete(`/reply-crud/delete/${id}`);
    return response.data;
}

export async function updateReply(reply) {
    const response = await apiClient.put(`/reply-crud/update/${reply?.id}`, reply, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}