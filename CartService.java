package com.cloudcart.service;

import com.cloudcart.dto.CartItemRequest;
import com.cloudcart.entity.Cart;
import com.cloudcart.entity.CartItem;
import com.cloudcart.entity.Product;
import com.cloudcart.exception.BadRequestException;
import com.cloudcart.exception.ResourceNotFoundException;
import com.cloudcart.repository.CartItemRepository;
import com.cloudcart.repository.CartRepository;
import com.cloudcart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public Cart getCartByUser(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user"));
    }

    public Cart addItem(Long userId, CartItemRequest request) {
        Cart cart = getCartByUser(userId);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getStockQuantity() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock for product: " + product.getName());
        }

        CartItem item = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + request.getQuantity());
                    return existing;
                })
                .orElse(CartItem.builder().cart(cart).product(product).quantity(request.getQuantity()).build());

        cartItemRepository.save(item);
        return getCartByUser(userId);
    }

    public Cart updateItemQuantity(Long userId, Long itemId, Integer quantity) {
        Cart cart = getCartByUser(userId);
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        item.setQuantity(quantity);
        cartItemRepository.save(item);
        return getCartByUser(userId);
    }

    public Cart removeItem(Long userId, Long itemId) {
        Cart cart = getCartByUser(userId);
        cartItemRepository.deleteById(itemId);
        return getCartByUser(userId);
    }
}
