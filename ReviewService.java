package com.cloudcart.service;

import com.cloudcart.dto.ReviewRequest;
import com.cloudcart.entity.Product;
import com.cloudcart.entity.Review;
import com.cloudcart.entity.User;
import com.cloudcart.repository.ProductRepository;
import com.cloudcart.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public Review addReview(User user, ReviewRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new com.cloudcart.exception.ResourceNotFoundException("Product not found"));

        Review review = Review.builder()
                .product(product)
                .user(user)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        return reviewRepository.save(review);
    }

    public List<Review> getByProduct(Long productId) {
        return reviewRepository.findByProductId(productId);
    }
}
