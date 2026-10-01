import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders", { params: { size: 50 } }).then(({ data }) => setOrders(data.data.content || []));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <table className="w-full bg-white rounded shadow overflow-hidden text-sm">
        <thead className="bg-gray-100 text-left">
          <tr><th className="p-3">Order ID</th><th className="p-3">Customer</th><th className="p-3">Total</th><th className="p-3">Status</th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-3">#{o.id}</td>
              <td className="p-3">{o.user?.fullName}</td>
              <td className="p-3">₹{o.totalAmount}</td>
              <td className="p-3">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
