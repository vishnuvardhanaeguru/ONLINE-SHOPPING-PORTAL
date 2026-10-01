import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create an account</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Full name" className="w-full border rounded px-3 py-2"
          value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input type="email" required placeholder="Email" className="w-full border rounded px-3 py-2"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" required minLength={8} placeholder="Password (min 8 chars)" className="w-full border rounded px-3 py-2"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input placeholder="Phone (optional)" className="w-full border rounded px-3 py-2"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button type="submit" className="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark">
          Sign Up
        </button>
      </form>
      <p className="text-sm mt-4 text-gray-600">
        Already have an account? <Link to="/login" className="text-brand font-medium">Login</Link>
      </p>
    </div>
  );
}
