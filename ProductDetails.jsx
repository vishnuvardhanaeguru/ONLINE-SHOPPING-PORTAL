import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";
import api from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProductById(id).then(({ data }) => setProduct(data.data));
    api.get(`/reviews/product/${id}`).then(({ data }) => setReviews(data.data));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: Number(id), quantity: 1 });
      setMessage("Added to cart!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not add to cart");
    }
  };

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <img
        src={product.imageUrl || "https://via.placeholder.com/500x400?text=CloudCart"}
        alt={product.name}
        className="rounded-lg w-full object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-bold text-brand mb-4">₹{product.price}</p>
        <p className="text-sm text-gray-500 mb-6">{product.stockQuantity} in stock</p>
        <button onClick={handleAddToCart} className="bg-brand text-white px-6 py-3 rounded hover:bg-brand-dark">
          Add to Cart
        </button>
        {message && <p className="mt-3 text-sm text-green-700">{message}</p>}

        <h2 className="text-lg font-semibold mt-10 mb-3">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li key={r.id} className="border rounded p-3 text-sm">
                <strong>{r.rating}★</strong> — {r.comment}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
