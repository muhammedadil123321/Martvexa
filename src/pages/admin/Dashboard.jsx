import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, Video, Star, TrendingUp, Plus, ChevronRight,
  ToggleLeft, ToggleRight, Loader2, RefreshCw
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const PRODUCTS_API = `${API_BASE_URL}/api/products`;
const REVIEWS_API = `${API_BASE_URL}/api/reviews`;
const VIDEOS_API = `${API_BASE_URL}/api/videos`;

function StatCard({ icon: Icon, label, value, color = 'gray' }) {
  const colors = {
    gray: 'bg-gray-900 text-white',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    blue: 'bg-blue-50 text-blue-700 border border-blue-100',
    amber: 'bg-amber-50 text-amber-700 border border-amber-100',
  };
  const iconBg = {
    gray: 'bg-white/20',
    green: 'bg-emerald-100',
    blue: 'bg-blue-100',
    amber: 'bg-amber-100',
  };
  return (
    <div className={`rounded-2xl p-5 flex items-start gap-4 ${colors[color]}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg[color]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold leading-none">{value}</p>
        <p className="text-sm font-medium mt-1 opacity-90">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  // Safe API Fetcher Function
  const fetchJsonSafe = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  async function fetchData() {
    try {
      setLoading(true);

      // Fetch all backend data concurrently without breaking if one endpoint fails
      const [dataProducts, dataReviews, dataVideos] = await Promise.all([
        fetchJsonSafe(PRODUCTS_API),
        fetchJsonSafe(REVIEWS_API),
        fetchJsonSafe(VIDEOS_API),
      ]);

      setProducts(Array.isArray(dataProducts) ? dataProducts : []);
      setReviews(Array.isArray(dataReviews) ? dataReviews : []);
      setVideos(Array.isArray(dataVideos) ? dataVideos : []);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Smooth Optimistic Stock Toggle
  async function handleToggleActive(product) {
    const productId = product._id || product.id;
    if (!productId) return;

    const newActiveState = !product.active;
    setTogglingId(productId);

    // 1. Local State Optimistic Update (Immediate UI feedback)
    setProducts(prev =>
      prev.map(p => ((p._id === productId || p.id === productId) ? { ...p, active: newActiveState } : p))
    );

    try {
      // 2. PUT Request to Backend
      const res = await fetch(`${PRODUCTS_API}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: newActiveState }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status on server');
      }
    } catch (err) {
      console.error('Failed to toggle active status:', err);
      // Revert local state on error
      setProducts(prev =>
        prev.map(p => ((p._id === productId || p.id === productId) ? { ...p, active: product.active } : p))
      );
      alert('Could not update status. Please try again.');
    } finally {
      setTogglingId(null);
    }
  }

  const trending = products.filter(p => p.isTrending);
  const recent = [...products].reverse().slice(0, 6);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Loader2 size={24} className="animate-spin mb-2" />
        <span className="text-sm">Loading dashboard…</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Refresh */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
        <button
          onClick={fetchData}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-lg transition-all"
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Products" value={products.length} color="gray" />
        <StatCard icon={Video} label="Reels / Videos" value={videos.length} color="blue" />
        <StatCard icon={Star} label="Reviews" value={reviews.length} color="amber" />
        <StatCard icon={TrendingUp} label="Trending Products" value={trending.length} color="green" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            id="dash-add-product"
            onClick={() => navigate('/admin/products/add')}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium
                       px-4 py-2.5 rounded-xl transition-all active:scale-95"
          >
            <Plus size={16} /> Add New Product
          </button>
          <button
            id="dash-upload-reel"
            onClick={() => navigate('/admin/videos')}
            className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium
                       px-4 py-2.5 rounded-xl transition-all active:scale-95"
          >
            <Plus size={16} /> Upload Reel
          </button>
          <button
            id="dash-add-review"
            onClick={() => navigate('/admin/reviews')}
            className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium
                       px-4 py-2.5 rounded-xl transition-all active:scale-95"
          >
            <Plus size={16} /> Add Review
          </button>
        </div>
      </div>

      {/* Trending Products */}
      {trending.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-600" /> Trending Products
            </h2>
            <button
              onClick={() => navigate('/admin/products')}
              className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-0.5"
            >
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {trending.map(p => {
              const pid = p._id || p.id;
              return (
                <div key={pid} className="rounded-xl border border-gray-100 overflow-hidden group bg-gray-50/50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.currentTarget.src = 'https://placehold.co/300x200?text=No+Image'; }}
                  />
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">₹{p.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Recent Products</h2>
          <button
            onClick={() => navigate('/admin/products')}
            className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-0.5"
          >
            Manage all <ChevronRight size={14} />
          </button>
        </div>

        {recent.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-6">No products found. Add your first product to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs text-gray-400 font-semibold pb-3 pr-4">Product</th>
                  <th className="text-left text-xs text-gray-400 font-semibold pb-3 pr-4">Price</th>
                  <th className="text-left text-xs text-gray-400 font-semibold pb-3 pr-4">Status</th>
                  <th className="text-left text-xs text-gray-400 font-semibold pb-3">Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map(p => {
                  const pid = p._id || p.id;
                  const isToggling = togglingId === pid;
                  return (
                    <tr key={pid} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-9 h-9 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                            onError={e => { e.currentTarget.src = 'https://placehold.co/40?text=?'; }}
                          />
                          <span className="font-medium text-gray-800 line-clamp-1">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-gray-600">₹{p.price}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                         ${p.active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                          {p.active ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => handleToggleActive(p)}
                          disabled={isToggling}
                          className="text-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50"
                          title="Toggle stock status"
                        >
                          {isToggling ? (
                            <Loader2 size={18} className="animate-spin text-gray-400" />
                          ) : p.active ? (
                            <ToggleRight size={22} className="text-emerald-600" />
                          ) : (
                            <ToggleLeft size={22} />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}