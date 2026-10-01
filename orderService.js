import api from "./api";

export const placeOrder = (payload) => api.post("/orders", payload);
export const getMyOrders = (params) => api.get("/orders", { params });
export const getOrder = (id) => api.get(`/orders/${id}`);
export const cancelOrder = (id) => api.post(`/orders/${id}/cancel`);
