import api from "./api";

export const getCart = () => api.get("/cart");
export const addToCart = (payload) => api.post("/cart/items", payload);
export const updateCartItem = (itemId, quantity) =>
  api.put(`/cart/items/${itemId}`, null, { params: { quantity } });
export const removeCartItem = (itemId) => api.delete(`/cart/items/${itemId}`);
