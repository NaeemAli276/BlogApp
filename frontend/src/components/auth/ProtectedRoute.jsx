// resources/js/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../../assets/Icon';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (   
            <div
                className='w-full h-screen flex items-center justify-center'
            >
                <div
                    className='w-fit h-fit'
                >
                    <Icon
                        type={'spinner'}
                        className='animate-spin text-text'
                        size='24'
                    />
                </div>
            </div> // Or a loading spinner
        )
    }


    if (!user) {
        // Redirect to login page with return url
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;