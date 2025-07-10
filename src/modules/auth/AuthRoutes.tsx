import { useAuth } from './AuthContext'; // Adjust the path to your AuthContext
import { Navigate,  } from 'react-router-dom';

interface AuthRoutesProps {
    children: React.ReactNode;
}

export default function AuthRoutes({ children }: AuthRoutesProps) {
    const { token } = useAuth();

    return token ? 
        children
    : 
        <Navigate to="/login" replace />
    ;
}