package com.cloudcart.controller;

import com.cloudcart.dto.ApiResponse;
import com.cloudcart.repository.OrderRepository;
import com.cloudcart.repository.ProductRepository;
import com.cloudcart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> dashboard() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalCustomers", userRepository.count());
        stats.put("totalProducts", productRepository.count());
        stats.put("totalOrders", orderRepository.count());

        BigDecimal revenue = orderRepository.findAll().stream()
                .filter(o -> o.getStatus() != com.cloudcart.entity.Order.OrderStatus.CANCELLED)
                .map(com.cloudcart.entity.Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        stats.put("totalRevenue", revenue);

        return ResponseEntity.ok(ApiResponse.success("Dashboard stats", stats));
    }
}
