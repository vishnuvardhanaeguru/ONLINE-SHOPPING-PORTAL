import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(({ data }) => setOrders(data.data.content || []));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <Link key={o.id} to={`/orders/${o.id}`} className="block bg-white rounded shadow p-4 hover:shadow-md">
              <div className="flex justify-between">
                <span className="font-medium">Order #{o.id}</span>
                <span className="text-sm px-2 py-1 rounded bg-gray-100">{o.status}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Total: ₹{o.totalAmount}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
