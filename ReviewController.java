package com.cloudcart.controller;

import com.cloudcart.dto.ApiResponse;
import com.cloudcart.dto.ReviewRequest;
import com.cloudcart.entity.Review;
import com.cloudcart.entity.User;
import com.cloudcart.repository.UserRepository;
import com.cloudcart.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<Review>> add(@AuthenticationPrincipal UserDetails userDetails,
                                                      @Valid @RequestBody ReviewRequest request) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(ApiResponse.success("Review added", reviewService.addReview(user, request)));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<Review>>> byProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.success("Reviews fetched", reviewService.getByProduct(productId)));
    }
}
