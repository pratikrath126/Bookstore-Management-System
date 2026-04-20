import { Link } from 'react-router-dom';

function BookCard({ book }) {
    return (
        <div className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
                <img
                    src={book.imageUrl || 'https://via.placeholder.com/200x280?text=No+Cover'}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: '280px', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/200x280?text=No+Cover'; }}
                />
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title fw-bold text-truncate">{book.title}</h6>
                    <p className="card-text text-muted small mb-1">by {book.author}</p>
                    {book.category && (
                        <span className="badge bg-info text-dark mb-2" style={{ width: 'fit-content' }}>
                            {book.category.name}
                        </span>
                    )}
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-success fs-5">₹{book.price}</span>
                        <Link to={`/book/${book.id}`} className="btn btn-outline-primary btn-sm">
                            View Details
                        </Link>
                    </div>
                    {book.stock <= 5 && book.stock > 0 && (
                        <small className="text-warning mt-1">Only {book.stock} left!</small>
                    )}
                    {book.stock === 0 && (
                        <small className="text-danger mt-1">Out of Stock</small>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookCard;
