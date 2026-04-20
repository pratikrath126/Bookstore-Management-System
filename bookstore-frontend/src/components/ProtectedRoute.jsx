import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

function ProtectedRoute({ children, adminOnly = false }) {
    const loggedIn = authService.isLoggedIn();
    const admin = authService.isAdmin();

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !admin) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
