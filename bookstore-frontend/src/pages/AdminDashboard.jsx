import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookService from '../services/bookService';
import orderService from '../services/orderService';
import categoryService from '../services/categoryService';

function AdminDashboard() {
    const [books, setBooks] = useState([]);
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState('books');
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [catMessage, setCatMessage] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        bookService.getAllBooks().then(res => setBooks(res.data)).catch(console.error);
        orderService.getAllOrders().then(res => setOrders(res.data)).catch(console.error);
        categoryService.getAllCategories().then(res => setCategories(res.data)).catch(console.error);
    };

    const handleDeleteBook = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            bookService.deleteBook(id)
                .then(() => {
                    setBooks(books.filter(b => b.id !== id));
                })
                .catch(err => alert('Error deleting book'));
        }
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        setCatMessage('');
        categoryService.addCategory(newCategory)
            .then(() => {
                setCatMessage('Category added successfully!');
                setNewCategory({ name: '', description: '' });
                categoryService.getAllCategories().then(res => setCategories(res.data));
            })
            .catch(err => setCatMessage('Error adding category'));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">⚙️ Admin Dashboard</h2>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card bg-primary text-white shadow">
                        <div className="card-body text-center">
                            <h3>{books.length}</h3>
                            <p className="mb-0">Total Books</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white shadow">
                        <div className="card-body text-center">
                            <h3>{orders.length}</h3>
                            <p className="mb-0">Total Orders</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-info text-white shadow">
                        <div className="card-body text-center">
                            <h3>{categories.length}</h3>
                            <p className="mb-0">Categories</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'books' ? 'active' : ''}`}
                        onClick={() => setActiveTab('books')}>📚 Books</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}>📦 Orders</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
                        onClick={() => setActiveTab('categories')}>🏷️ Categories</button>
                </li>
            </ul>

            {/* Books Tab */}
            {activeTab === 'books' && (
                <div>
                    <div className="d-flex justify-content-between mb-3">
                        <h4>Manage Books</h4>
                        <Link to="/admin/add-book" className="btn btn-success">+ Add New Book</Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover shadow-sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(book => (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td className="fw-bold">{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>₹{book.price}</td>
                                        <td>{book.stock}</td>
                                        <td>{book.category?.name || '-'}</td>
                                        <td>
                                            <Link to={`/admin/edit-book/${book.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBook(book.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
                <div>
                    <h4 className="mb-3">All Orders</h4>
                    <div className="table-responsive">
                        <table className="table table-hover shadow-sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Book</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.user?.name}</td>
                                        <td>{order.book?.title}</td>
                                        <td>{order.quantity}</td>
                                        <td className="text-success fw-bold">₹{order.totalPrice}</td>
                                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td><span className="badge bg-warning text-dark">{order.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
                <div>
                    <h4 className="mb-3">Manage Categories</h4>

                    <form onSubmit={handleAddCategory} className="row g-3 mb-4">
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Category name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                required />
                        </div>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="Description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
                        </div>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-success w-100">Add Category</button>
                        </div>
                    </form>

                    {catMessage && <div className="alert alert-info">{catMessage}</div>}

                    <table className="table table-hover shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat.id}>
                                    <td>{cat.id}</td>
                                    <td className="fw-bold">{cat.name}</td>
                                    <td>{cat.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
