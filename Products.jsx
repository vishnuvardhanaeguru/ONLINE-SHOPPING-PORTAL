import React, { useEffect, useState } from "react";
import { getProducts, getCategories } from "../services/productService";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const params = {};
    if (keyword) params.keyword = keyword;
    if (categoryId) params.categoryId = categoryId;
    const { data } = await getProducts(params);
    setProducts(data.data.content || []);
    setLoading(false);
  };

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.data));
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-8">
        <input
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border rounded px-3 py-2 flex-1 min-w-[200px]"
        />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button className="bg-brand text-white px-5 rounded hover:bg-brand-dark">Search</button>
      </form>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
