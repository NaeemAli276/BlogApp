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

export async function updateUser(user) {
    
    const formData = new FormData()

    formData.append('id', user?.id || null)
    formData.append('username', user?.username || null)
    formData.append('email', user?.email || null)

    if (user?.profileImg) {
        formData.append('profileImg', user?.profileImg)
    }

    const response = await apiClient.put(`/user-crud/update/${user?.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

}