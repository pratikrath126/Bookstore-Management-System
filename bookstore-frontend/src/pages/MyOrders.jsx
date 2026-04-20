import { useState, useEffect } from 'react';
import orderService from '../services/orderService';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        orderService.getMyOrders()
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading orders:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">📦 My Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center py-5">
                    <h4 className="text-muted">No orders yet</h4>
                    <p className="text-muted">Browse our collection and place your first order!</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>Book</th>
                                <th>Author</th>
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
                                    <td className="fw-bold">{order.book?.title}</td>
                                    <td>{order.book?.author}</td>
                                    <td>{order.quantity}</td>
                                    <td className="text-success fw-bold">₹{order.totalPrice}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge ${
                                            order.status === 'CONFIRMED' ? 'bg-success' :
                                            order.status === 'PENDING' ? 'bg-warning text-dark' :
                                            order.status === 'SHIPPED' ? 'bg-info' :
                                            order.status === 'DELIVERED' ? 'bg-primary' :
                                            'bg-danger'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MyOrders;
