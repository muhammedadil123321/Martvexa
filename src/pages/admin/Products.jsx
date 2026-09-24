import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Search, Pencil, Trash2, ToggleLeft, ToggleRight, TrendingUp, Loader2
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API = `${API_BASE_URL}/api/products`;

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [filterActive, setFilterActive] = useState('all'); // 'all' | 'active' | 'inactive'
  const [loading, setLoading] = useState(true);

  // 1. Backend-ൽ നിന്ന് പ്രോഡക്റ്റുകൾ Fetch ചെയ്യുക
  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Product Delete ചെയ്യുക (Backend API Call)
  async function handleDelete(id) {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts(); // Table Refresh ചെയ്യുക
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  // 3. Stock Active / Trending status toggle ചെയ്യുക (Backend API Call)
  async function handleToggle(product, field) {
    const id = product._id || product.id;
    try {
      await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !product[field] }),
      });
      fetchProducts(); // Refresh data
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  }

  // Search and Filter Logic
  const filtered = products.filter(p => {
    const matchQ = (p.name || '').toLowerCase().includes(query.toLowerCase());
    const matchF =
      filterActive === 'all' ? true :
        filterActive === 'active' ? p.active :
          !p.active;
    return matchQ && matchF;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="product-search"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-white text-sm
                         text-gray-800 placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          {/* Filter */}
          <select
            id="product-filter"
            value={filterActive}
            onChange={e => setFilterActive(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="all">All</option>
            <option value="active">In Stock</option>
            <option value="inactive">Out of Stock</option>
          </select>
        </div>
        <button
          id="product-add-btn"
          onClick={() => navigate('/admin/products/add')}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium
                     px-4 py-2.5 rounded-xl transition-all active:scale-95 flex-shrink-0"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left text-xs text-gray-400 font-semibold px-4 py-3">Product</th>
                <th className="text-left text-xs text-gray-400 font-semibold px-4 py-3">Price</th>
                <th className="text-left text-xs text-gray-400 font-semibold px-4 py-3">COD</th>
                <th className="text-center text-xs text-gray-400 font-semibold px-4 py-3">In Stock</th>
                <th className="text-center text-xs text-gray-400 font-semibold px-4 py-3">Trending</th>
                <th className="text-right text-xs text-gray-400 font-semibold px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* Loading State */}
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                    <Loader2 size={20} className="animate-spin inline-block mr-2" />
                    Loading products…
                  </td>
                </tr>
              )}

              {/* No Products Found */}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                    No products found.
                  </td>
                </tr>
              )}

              {/* Products List */}
              {!loading && filtered.map(p => {
                const id = p._id || p.id; // MongoDB `_id` അല്ലെങ്കിൽ custom `id` സപ്പോർട്ട് ചെയ്യും
                return (
                  <tr key={id} className="hover:bg-gray-50/40 transition-colors">
                    {/* Image + Name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                          onError={e => { e.currentTarget.src = 'https://placehold.co/40?text=?'; }}
                        />
                        <div>
                          <p className="font-medium text-gray-800 max-w-[180px] truncate">{p.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[180px]">{p.smallDescription}</p>
                        </div>
                      </div>
                    </td>
                    {/* Price */}
                    <td className="px-4 py-3 text-gray-700 font-medium">₹{p.price}</td>
                    {/* COD */}
                    <td className="px-4 py-3 text-gray-500">₹{p.codCharge}</td>
                    {/* Stock Toggle */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggle(p, 'active')}
                        className="flex items-center justify-center mx-auto"
                        title={p.active ? 'Mark Out of Stock' : 'Mark In Stock'}
                      >
                        {p.active
                          ? <ToggleRight size={24} className="text-emerald-500" />
                          : <ToggleLeft size={24} className="text-gray-300" />
                        }
                      </button>
                    </td>
                    {/* Trending Toggle */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggle(p, 'isTrending')}
                        className="flex items-center justify-center mx-auto"
                        title={p.isTrending ? 'Remove from Trending' : 'Mark as Trending'}
                      >
                        {p.isTrending
                          ? <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 text-xs font-semibold px-2 py-1 rounded-full border border-amber-100">
                            <TrendingUp size={11} /> Yes
                          </span>
                          : <span className="inline-flex items-center text-xs text-gray-400 px-2 py-1 rounded-full border border-gray-100">No</span>
                        }
                      </button>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${id}`)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}