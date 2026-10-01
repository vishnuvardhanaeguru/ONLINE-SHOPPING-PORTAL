import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-24 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to CloudCart</h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Your cloud-native shopping destination — browse products, build your cart,
        and check out securely.
      </p>
      <Link to="/products" className="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-dark">
        Shop Now
      </Link>
    </div>
  );
}
