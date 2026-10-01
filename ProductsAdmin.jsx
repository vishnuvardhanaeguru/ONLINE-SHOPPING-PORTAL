import React, { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from "../../services/productService";

const emptyForm = { name: "", description: "", price: "", stockQuantity: "", imageUrl: "", categoryId: "" };

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const load = () => getProducts({ size: 50 }).then(({ data }) => setProducts(data.data.content || []));

  useEffect(() => {
    load();
    getCategories().then(({ data }) => setCategories(data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), stockQuantity: Number(form.stockQuantity), categoryId: Number(form.categoryId) };
    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }
    setForm(emptyForm);
    setEditingId(null);
    load();
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name, description: p.description || "", price: p.price,
      stockQuantity: p.stockQuantity, imageUrl: p.imageUrl || "", categoryId: p.category?.id || "",
    });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    load();
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 grid md:grid-cols-2 gap-4 mb-10">
        <input required placeholder="Name" className="border rounded px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select required className="border rounded px-3 py-2" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
          <option value="">Select category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input required type="number" step="0.01" placeholder="Price" className="border rounded px-3 py-2" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input required type="number" placeholder="Stock quantity" className="border rounded px-3 py-2" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })} />
        <input placeholder="Image URL" className="border rounded px-3 py-2 md:col-span-2" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <textarea placeholder="Description" className="border rounded px-3 py-2 md:col-span-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit" className="bg-brand text-white py-2 rounded md:col-span-2 hover:bg-brand-dark">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <table className="w-full bg-white rounded shadow overflow-hidden text-sm">
        <thead className="bg-gray-100 text-left">
          <tr><th className="p-3">Name</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Actions</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.name}</td>
              <td className="p-3">₹{p.price}</td>
              <td className="p-3">{p.stockQuantity}</td>
              <td className="p-3 space-x-3">
                <button onClick={() => handleEdit(p)} className="text-brand">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
