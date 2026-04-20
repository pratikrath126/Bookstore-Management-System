import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetails from './pages/BookDetails';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/my-orders" element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/add-book" element={
                        <ProtectedRoute adminOnly={true}>
                            <AddBook />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/edit-book/:id" element={
                        <ProtectedRoute adminOnly={true}>
                            <EditBook />
                        </ProtectedRoute>
                    } />
                </Routes>

                {/* Footer */}
                <footer className="bg-dark text-white text-center py-3 mt-5">
                    <p className="mb-0">© 2025 Bookstore Management System | Pratik Rath (23052584)</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
