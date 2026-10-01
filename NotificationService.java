package com.cloudcart.service;

import com.cloudcart.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;

/**
 * Publishes order events to Amazon SNS so subscribers (email/SMS) get notified.
 */
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final SnsClient snsClient;

    @Value("${aws.sns.order-topic-arn}")
    private String orderTopicArn;

    public void notifyOrderPlaced(Order order) {
        if (orderTopicArn == null || orderTopicArn.isBlank()) {
            return; // SNS not configured (e.g. local dev)
        }
        String message = "Order #%d placed successfully. Total: %s".formatted(order.getId(), order.getTotalAmount());
        snsClient.publish(PublishRequest.builder()
                .topicArn(orderTopicArn)
                .subject("CloudCart Order Confirmation")
                .message(message)
                .build());
    }
}
