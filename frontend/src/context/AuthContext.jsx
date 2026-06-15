// resources/js/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import userImage from '../assets/user.png'
import { useQuery } from '@tanstack/react-query'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    // const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     console.log("user: ", user)
    // }, [user])

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData)
                    setUser(userData);
                    return userData
                } else {
                    localStorage.removeItem('token');
                    return null
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
                throw new error
            }
        }
        setLoading(false);
    };

    const login = async (formDetails) => {

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formDetails.email, password: formDetails.password, remember_me: formDetails.remember_me }),
            });

            if (!response.ok) {
                const data = await response.json();
                return data.message
            }

            const data = await response.json();

            console.log(data)

            if (formDetails.remember_me) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return true
            }
            else {
                setUser(data.user);
                return true    
            }
        
            return false;
        } catch (error) {
            throw error;
        }
    };

    const register = async (formDetails) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: formDetails.username, 
                    email: formDetails.email, 
                    password: formDetails.password, 
                    password_confirmation: formDetails.password_confirmation, 
                    remember_me: formDetails.remember_me
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                return data;
            }

            const data = await response.json();
            
            if (formDetails.remember_me) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return true
            }
            else {
                setUser(data.user);
                return true
            }
        
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ['get_user'],
        queryFn: checkAuth
    })

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};