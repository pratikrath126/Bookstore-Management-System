import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import orderService from '../services/orderService';
import authService from '../services/authService';

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const loggedIn = authService.isLoggedIn();

    useEffect(() => {
        bookService.getBookById(id)
            .then(response => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Book not found');
                setLoading(false);
            });
    }, [id]);

    const handleOrder = () => {
        if (!loggedIn) {
            navigate('/login');
            return;
        }

        setMessage('');
        setError('');

        orderService.placeOrder(book.id, quantity)
            .then(() => {
                setMessage('Order placed successfully!');
                setBook({ ...book, stock: book.stock - quantity });
            })
            .catch(err => {
                setError(err.response?.data?.error || 'Failed to place order');
            });
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" />
            </div>
        );
    }

    if (!book) {
        return <div className="container mt-4"><h4 className="text-danger">Book not found</h4></div>;
    }

    return (
        <div className="container mt-4">
            <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="row">
                <div className="col-md-4">
                    <img
                        src={book.imageUrl || 'https://via.placeholder.com/300x400?text=No+Cover'}
                        alt={book.title}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover'; }}
                    />
                </div>
                <div className="col-md-8">
                    <h2 className="fw-bold">{book.title}</h2>
                    <p className="text-muted fs-5">by {book.author}</p>

                    {book.category && (
                        <span className="badge bg-info text-dark mb-3">{book.category.name}</span>
                    )}

                    <p className="mt-3">{book.description}</p>

                    <table className="table table-borderless" style={{ maxWidth: '300px' }}>
                        <tbody>
                            <tr><td className="fw-bold">ISBN:</td><td>{book.isbn}</td></tr>
                            <tr><td className="fw-bold">Price:</td><td className="text-success fs-4 fw-bold">₹{book.price}</td></tr>
                            <tr><td className="fw-bold">Stock:</td><td>{book.stock > 0 ? `${book.stock} available` : <span className="text-danger">Out of Stock</span>}</td></tr>
                        </tbody>
                    </table>

                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {book.stock > 0 && (
                        <div className="d-flex align-items-center gap-3 mt-3">
                            <div>
                                <label className="form-label fw-bold">Quantity:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    style={{ width: '80px' }}
                                    value={quantity}
                                    min={1}
                                    max={book.stock}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                />
                            </div>
                            <div className="mt-4">
                                <button className="btn btn-primary btn-lg" onClick={handleOrder}>
                                    🛒 {loggedIn ? 'Place Order' : 'Login to Order'}
                                </button>
                            </div>
                        </div>
                    )}

                    {quantity > 0 && book.stock > 0 && (
                        <p className="mt-2 text-muted">
                            Total: <strong className="text-success">₹{(book.price * quantity).toFixed(2)}</strong>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
