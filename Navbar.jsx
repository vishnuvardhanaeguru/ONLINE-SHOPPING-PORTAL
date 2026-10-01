import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-brand text-white px-6 py-4 flex items-center justify-between shadow">
      <Link to="/" className="text-xl font-bold">CloudCart</Link>
      <div className="flex items-center gap-5 text-sm">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            <span className="opacity-80">{user.fullName}</span>
            <button onClick={handleLogout} className="bg-brand-dark px-3 py-1 rounded hover:opacity-90">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-brand-dark px-3 py-1 rounded hover:opacity-90">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
