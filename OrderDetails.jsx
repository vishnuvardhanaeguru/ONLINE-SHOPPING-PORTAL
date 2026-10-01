import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder, cancelOrder } from "../services/orderService";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const load = () => getOrder(id).then(({ data }) => setOrder(data.data));
  useEffect(() => { load(); }, [id]);

  const handleCancel = async () => {
    await cancelOrder(id);
    load();
  };

  if (!order) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">Order #{order.id}</h1>
      <p className="mb-1">Status: <strong>{order.status}</strong></p>
      <p className="mb-1">Shipping to: {order.shippingAddress}</p>
      <p className="mb-4">Total: ₹{order.totalAmount}</p>

      <h2 className="font-semibold mb-2">Items</h2>
      <ul className="divide-y">
        {order.items.map((item) => (
          <li key={item.id} className="py-2 flex justify-between text-sm">
            <span>{item.product.name} × {item.quantity}</span>
            <span>₹{item.priceAtPurchase}</span>
          </li>
        ))}
      </ul>

      {order.status !== "SHIPPED" && order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
        <button onClick={handleCancel} className="mt-6 text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50">
          Cancel Order
        </button>
      )}
    </div>
  );
}
