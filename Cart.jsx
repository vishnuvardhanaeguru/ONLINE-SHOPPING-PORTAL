import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, updateCartItem, removeCartItem } from "../services/cartService";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const load = () => getCart().then(({ data }) => setCart(data.data));

  useEffect(() => { load(); }, []);

  const handleQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    await updateCartItem(itemId, quantity);
    load();
  };

  const handleRemove = async (itemId) => {
    await removeCartItem(itemId);
    load();
  };

  if (!cart) return <p className="text-center py-10">Loading cart...</p>;

  const total = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty. <Link to="/products" className="text-brand">Browse products</Link></p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white rounded shadow p-4">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">₹{item.product.price} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleQuantity(item.id, item.quantity - 1)} className="px-2 border rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantity(item.id, item.quantity + 1)} className="px-2 border rounded">+</button>
                  <button onClick={() => handleRemove(item.id)} className="text-red-600 text-sm ml-4">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ₹{total.toFixed(2)}</p>
            <button onClick={() => navigate("/checkout")} className="bg-brand text-white px-6 py-3 rounded hover:bg-brand-dark">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
