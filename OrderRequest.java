package com.cloudcart.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrderRequest {
    @NotBlank
    private String shippingAddress;

    @NotBlank
    private String paymentMethod; // CARD, UPI, COD, WALLET
}
