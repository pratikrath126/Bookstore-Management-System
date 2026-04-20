package com.pratik.bookstore.service;

import com.pratik.bookstore.entity.Book;
import com.pratik.bookstore.entity.Order;
import com.pratik.bookstore.entity.User;
import com.pratik.bookstore.exception.ResourceNotFoundException;
import com.pratik.bookstore.repository.BookRepository;
import com.pratik.bookstore.repository.OrderRepository;
import com.pratik.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public Order placeOrder(String userEmail, Long bookId, Integer quantity) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));

        if (book.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock. Available: " + book.getStock());
        }

        // Reduce stock
        book.setStock(book.getStock() - quantity);
        bookRepository.save(book);

        // Create order
        Double totalPrice = book.getPrice() * quantity;
        Order order = new Order(user, book, quantity, totalPrice);

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserId(user.getId());
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
