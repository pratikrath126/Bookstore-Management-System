import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Navbar() {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const loggedIn = authService.isLoggedIn();
    const admin = authService.isAdmin();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    📚 Bookstore
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {loggedIn && !admin && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/my-orders">My Orders</Link>
                            </li>
                        )}
                        {admin && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {loggedIn ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-info">
                                        Welcome, {user.name} {admin && <span className="badge bg-warning text-dark ms-1">Admin</span>}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light btn-sm mt-1" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
