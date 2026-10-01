import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderService";

export default function Checkout() {
  const [form, setForm] = useState({ shippingAddress: "", paymentMethod: "CARD" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await placeOrder(form);
      navigate(`/orders/${data.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Order placement failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea required placeholder="Shipping address" className="w-full border rounded px-3 py-2"
          value={form.shippingAddress} onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })} />
        <select className="w-full border rounded px-3 py-2" value={form.paymentMethod}
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
          <option value="CARD">Card</option>
          <option value="UPI">UPI</option>
          <option value="COD">Cash on Delivery</option>
          <option value="WALLET">Wallet</option>
        </select>
        <button type="submit" className="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark">
          Place Order
        </button>
      </form>
    </div>
  );
}
