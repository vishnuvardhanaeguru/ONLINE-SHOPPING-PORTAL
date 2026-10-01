package com.cloudcart.controller;

import com.cloudcart.dto.ApiResponse;
import com.cloudcart.dto.CartItemRequest;
import com.cloudcart.entity.Cart;
import com.cloudcart.entity.User;
import com.cloudcart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final com.cloudcart.repository.UserRepository userRepository;

    private Long currentUserId(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .map(User::getId)
                .orElseThrow();
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Cart>> view(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success("Cart fetched", cartService.getCartByUser(currentUserId(userDetails))));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<Cart>> addItem(@AuthenticationPrincipal UserDetails userDetails,
                                                        @Valid @RequestBody CartItemRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Item added", cartService.addItem(currentUserId(userDetails), request)));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<Cart>> updateItem(@AuthenticationPrincipal UserDetails userDetails,
                                                           @PathVariable Long itemId,
                                                           @RequestParam Integer quantity) {
        return ResponseEntity.ok(ApiResponse.success("Item updated",
                cartService.updateItemQuantity(currentUserId(userDetails), itemId, quantity)));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<Cart>> removeItem(@AuthenticationPrincipal UserDetails userDetails,
                                                           @PathVariable Long itemId) {
        return ResponseEntity.ok(ApiResponse.success("Item removed", cartService.removeItem(currentUserId(userDetails), itemId)));
    }
}
