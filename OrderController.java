package com.cloudcart.controller;

import com.cloudcart.dto.ApiResponse;
import com.cloudcart.dto.OrderRequest;
import com.cloudcart.entity.Order;
import com.cloudcart.entity.User;
import com.cloudcart.repository.UserRepository;
import com.cloudcart.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    private Long currentUserId(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername()).map(User::getId).orElseThrow();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Order>> placeOrder(@AuthenticationPrincipal UserDetails userDetails,
                                                            @Valid @RequestBody OrderRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Order placed", orderService.placeOrder(currentUserId(userDetails), request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Order>>> myOrders(@AuthenticationPrincipal UserDetails userDetails, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Orders fetched", orderService.getUserOrders(currentUserId(userDetails), pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Order>> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Order fetched", orderService.getOrderById(id)));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<Order>> cancel(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Order cancelled", orderService.cancelOrder(id)));
    }
}
