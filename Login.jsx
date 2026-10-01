import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" required placeholder="Email" className="w-full border rounded px-3 py-2"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" required placeholder="Password" className="w-full border rounded px-3 py-2"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark">
          Login
        </button>
      </form>
      <p className="text-sm mt-4 text-gray-600">
        No account? <Link to="/register" className="text-brand font-medium">Sign up</Link>
      </p>
    </div>
  );
}
