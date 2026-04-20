import { useState, useEffect } from 'react';
import bookService from '../services/bookService';
import categoryService from '../services/categoryService';
import BookCard from '../components/BookCard';

function Home() {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBooks();
        loadCategories();
    }, []);

    const loadBooks = () => {
        setLoading(true);
        bookService.getAllBooks()
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading books:', error);
                setLoading(false);
            });
    };

    const loadCategories = () => {
        categoryService.getAllCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error loading categories:', error));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            setLoading(true);
            bookService.searchBooks(searchKeyword)
                .then(response => {
                    setBooks(response.data);
                    setLoading(false);
                    setSelectedCategory('');
                })
                .catch(error => {
                    console.error('Error searching:', error);
                    setLoading(false);
                });
        } else {
            loadBooks();
        }
    };

    const handleCategoryFilter = (categoryId) => {
        setSelectedCategory(categoryId);
        setSearchKeyword('');
        if (categoryId === '') {
            loadBooks();
        } else {
            setLoading(true);
            bookService.getBooksByCategory(categoryId)
                .then(response => {
                    setBooks(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error filtering:', error);
                    setLoading(false);
                });
        }
    };

    return (
        <div className="container mt-4">
            {/* Hero Section */}
            <div className="bg-primary text-white rounded-3 p-5 mb-4 text-center">
                <h1 className="display-5 fw-bold">📚 Welcome to Bookstore</h1>
                <p className="lead mb-0">Discover your next favorite book from our curated collection</p>
            </div>

            {/* Search and Filter */}
            <div className="row mb-4">
                <div className="col-md-8">
                    <form onSubmit={handleSearch} className="d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search books by title or author..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                        {searchKeyword && (
                            <button type="button" className="btn btn-outline-secondary ms-2"
                                onClick={() => { setSearchKeyword(''); loadBooks(); }}>
                                Clear
                            </button>
                        )}
                    </form>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => handleCategoryFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Book Grid */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-muted">Loading books...</p>
                </div>
            ) : books.length === 0 ? (
                <div className="text-center py-5">
                    <h4 className="text-muted">No books found</h4>
                    <p className="text-muted">Try a different search or category</p>
                </div>
            ) : (
                <>
                    <p className="text-muted mb-3">Showing {books.length} book(s)</p>
                    <div className="row">
                        {books.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
