package com.pratik.bookstore.config;

import com.pratik.bookstore.entity.Book;
import com.pratik.bookstore.entity.Category;
import com.pratik.bookstore.entity.User;
import com.pratik.bookstore.repository.BookRepository;
import com.pratik.bookstore.repository.CategoryRepository;
import com.pratik.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Only seed if database is empty
        if (userRepository.count() > 0) return;

        System.out.println("=== Seeding Database ===");

        // Create Admin user
        User admin = new User("Admin", "admin@bookstore.com", passwordEncoder.encode("admin123"), User.Role.ADMIN);
        userRepository.save(admin);

        // Create a regular user
        User user = new User("John Doe", "john@example.com", passwordEncoder.encode("user123"), User.Role.USER);
        userRepository.save(user);

        // Create Categories
        Category fiction = new Category("Fiction", "Novels, short stories, and literary fiction");
        Category nonFiction = new Category("Non-Fiction", "Biographies, history, and self-help books");
        Category technology = new Category("Technology", "Programming, software, and IT books");
        Category science = new Category("Science", "Physics, chemistry, biology, and research");
        Category business = new Category("Business", "Management, finance, and entrepreneurship");

        categoryRepository.save(fiction);
        categoryRepository.save(nonFiction);
        categoryRepository.save(technology);
        categoryRepository.save(science);
        categoryRepository.save(business);

        // Create Books
        bookRepository.save(new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565", 299.0, 50,
                "A story of the fabulously wealthy Jay Gatsby and his love for Daisy Buchanan.",
                "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg", fiction));

        bookRepository.save(new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084", 350.0, 40,
                "The unforgettable novel of a childhood in a sleepy Southern town.",
                "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg", fiction));

        bookRepository.save(new Book("1984", "George Orwell", "978-0451524935", 275.0, 60,
                "A dystopian social science fiction novel and cautionary tale.",
                "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg", fiction));

        bookRepository.save(new Book("Sapiens", "Yuval Noah Harari", "978-0062316097", 499.0, 35,
                "A brief history of humankind exploring how Homo sapiens came to dominate the world.",
                "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg", nonFiction));

        bookRepository.save(new Book("Atomic Habits", "James Clear", "978-0735211292", 450.0, 45,
                "Tiny changes, remarkable results. An easy way to build good habits.",
                "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", nonFiction));

        bookRepository.save(new Book("Clean Code", "Robert C. Martin", "978-0132350884", 599.0, 30,
                "A handbook of agile software craftsmanship for writing clean, maintainable code.",
                "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg", technology));

        bookRepository.save(new Book("Head First Java", "Kathy Sierra", "978-0596009205", 549.0, 25,
                "A brain-friendly guide to learning Java programming language.",
                "https://covers.openlibrary.org/b/isbn/9780596009205-L.jpg", technology));

        bookRepository.save(new Book("Spring in Action", "Craig Walls", "978-1617297571", 650.0, 20,
                "Covers Spring 5, Spring Boot 2, and reactive programming with Spring WebFlux.",
                "https://covers.openlibrary.org/b/isbn/9781617297571-L.jpg", technology));

        bookRepository.save(new Book("A Brief History of Time", "Stephen Hawking", "978-0553380163", 399.0, 30,
                "From the Big Bang to black holes, a landmark volume in science writing.",
                "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg", science));

        bookRepository.save(new Book("The Lean Startup", "Eric Ries", "978-0307887894", 425.0, 35,
                "How today's entrepreneurs use continuous innovation to create successful businesses.",
                "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg", business));

        System.out.println("=== Database Seeded Successfully ===");
        System.out.println("Admin: admin@bookstore.com / admin123");
        System.out.println("User:  john@example.com / user123");
    }
}
