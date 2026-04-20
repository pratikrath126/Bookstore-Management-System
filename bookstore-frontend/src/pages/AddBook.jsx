import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import categoryService from '../services/categoryService';

function AddBook() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [book, setBook] = useState({
        title: '', author: '', isbn: '', price: '', stock: '',
        description: '', imageUrl: ''
    });
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        categoryService.getAllCategories()
            .then(res => setCategories(res.data))
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const bookData = {
            ...book,
            price: parseFloat(book.price),
            stock: parseInt(book.stock)
        };

        bookService.addBook(bookData, categoryId)
            .then(() => navigate('/admin'))
            .catch(err => {
                const msg = err.response?.data?.isbn || err.response?.data?.error || 'Error adding book';
                setError(msg);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">➕ Add New Book</h2>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow border-0">
                        <div className="card-body p-4">
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Title *</label>
                                        <input type="text" className="form-control" name="title"
                                            value={book.title} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Author *</label>
                                        <input type="text" className="form-control" name="author"
                                            value={book.author} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">ISBN *</label>
                                        <input type="text" className="form-control" name="isbn"
                                            value={book.isbn} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Price (₹) *</label>
                                        <input type="number" className="form-control" name="price"
                                            value={book.price} onChange={handleChange} required min="0" step="0.01" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Stock *</label>
                                        <input type="number" className="form-control" name="stock"
                                            value={book.stock} onChange={handleChange} required min="0" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <select className="form-select" value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}>
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image URL</label>
                                    <input type="text" className="form-control" name="imageUrl"
                                        value={book.imageUrl} onChange={handleChange}
                                        placeholder="https://example.com/book-cover.jpg" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" name="description" rows="3"
                                        value={book.description} onChange={handleChange} />
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-success">Add Book</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin')}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBook;
