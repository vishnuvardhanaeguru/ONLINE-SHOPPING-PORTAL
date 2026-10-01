import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/dashboard").then(({ data }) => setStats(data.data));
  }, []);

  if (!stats) return <p className="text-center py-10">Loading dashboard...</p>;

  const cards = [
    { label: "Total Customers", value: stats.totalCustomers },
    { label: "Total Products", value: stats.totalProducts },
    { label: "Total Orders", value: stats.totalOrders },
    { label: "Total Revenue", value: `₹${stats.totalRevenue}` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-3xl font-bold text-brand">{c.value}</p>
            <p className="text-sm text-gray-500 mt-1">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
