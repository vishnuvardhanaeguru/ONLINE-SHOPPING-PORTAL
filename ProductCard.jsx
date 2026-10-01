import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
    >
      <img
        src={product.imageUrl || "https://via.placeholder.com/300x200?text=CloudCart"}
        alt={product.name}
        className="rounded-md h-40 object-cover mb-3"
      />
      <h3 className="font-semibold text-gray-800">{product.name}</h3>
      <p className="text-brand font-bold mt-1">₹{product.price}</p>
      <p className="text-xs text-gray-500 mt-1">
        {product.stockQuantity > 0 ? "In stock" : "Out of stock"}
      </p>
    </Link>
  );
}
