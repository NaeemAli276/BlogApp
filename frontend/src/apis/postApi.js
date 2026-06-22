import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for authentication if needed
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
    } else if (error.request) {
      // Request was made but no response
      console.error('Network Error:', error.request);
    } else {
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

    const response = await apiClient.post('/posts-crud/create', post)
    return response.data;

}