import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Star, ToggleLeft, ToggleRight, CheckCircle, Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const REVIEWS_API = `${API_BASE_URL}/api/reviews`;
const PRODUCTS_API = `${API_BASE_URL}/api/products`;

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={13}
          className={n <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </span>
  );
}

const EMPTY_FORM = {
  userName: '',
  productName: '',
  rating: '5',
  comment: '',
  isApproved: true,
};

export default function Reviews() {
  const [reviews, setReviews]       = useState([]);
  const [products, setProducts]     = useState([]);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [saved, setSaved]           = useState(false);
  const [errors, setErrors]         = useState({});
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Reviews from Backend
  async function fetchReviews() {
    try {
      setLoading(true);
      const res = await fetch(REVIEWS_API);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  // Fetch Products from Backend API (MongoDB)
  async function fetchProducts() {
    try {
      const res = await fetch(PRODUCTS_API);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchReviews();
    fetchProducts();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.userName.trim())    e.userName    = 'Customer name is required.';
    if (!form.productName.trim()) e.productName = 'Product name is required.';
    if (!form.comment.trim())     e.comment     = 'Review text is required.';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    try {
      setSubmitting(true);
      const res = await fetch(REVIEWS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName:    form.userName.trim(),
          productName: form.productName.trim(),
          rating:      Number(form.rating),
          comment:     form.comment.trim(),
          isApproved:  form.isApproved,
        }),
      });
      if (!res.ok) throw new Error('Failed to add review');
      setForm(EMPTY_FORM);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      fetchReviews();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this review?')) return;
    try {
      await fetch(`${REVIEWS_API}/${id}`, { method: 'DELETE' });
      fetchReviews();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  async function handleToggle(review) {
    try {
      await fetch(`${REVIEWS_API}/${review._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: !review.isApproved }),
      });
      fetchReviews();
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  }

  const inputClass = `w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50
    text-sm text-gray-900 placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all`;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Add Review Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Star size={16} /> Add New Review
        </h2>

        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-4 text-sm">
            <CheckCircle size={15} /> Review added!
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="r-name" className="block text-xs font-semibold text-gray-700 mb-1.5">Customer Name *</label>
            <input
              id="r-name"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={inputClass}
            />
            {errors.userName && <p className="text-xs text-red-500 mt-1">{errors.userName}</p>}
          </div>

          <div>
            <label htmlFor="r-product" className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name *</label>
            <input
              id="r-product"
              name="productName"
              list="product-list"
              value={form.productName}
              onChange={handleChange}
              placeholder="Type or pick a product"
              className={inputClass}
            />
            <datalist id="product-list">
              {products.map(p => <option key={p._id || p.id} value={p.name} />)}
            </datalist>
            {errors.productName && <p className="text-xs text-red-500 mt-1">{errors.productName}</p>}
          </div>

          <div>
            <label htmlFor="r-rating" className="block text-xs font-semibold text-gray-700 mb-1.5">Rating</label>
            <select
              id="r-rating"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className={inputClass}
            >
              {[5,4,3,2,1].map(n => (
                <option key={n} value={n}>{'⭐'.repeat(n)} ({n} Star{n > 1 ? 's' : ''})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 self-end pb-1">
            <label htmlFor="r-active" className="flex items-center gap-2.5 cursor-pointer group">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                ${form.isApproved ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
                {form.isApproved && <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>}
              </div>
              <input id="r-active" name="isApproved" type="checkbox" className="sr-only" checked={form.isApproved} onChange={handleChange} />
              <span className="text-sm text-gray-700">Visible (Approved)</span>
            </label>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="r-desc" className="block text-xs font-semibold text-gray-700 mb-1.5">Review Text *</label>
            <textarea
              id="r-desc"
              name="comment"
              rows={3}
              value={form.comment}
              onChange={handleChange}
              placeholder="Write the customer's review here…"
              className={`${inputClass} resize-none`}
            />
            {errors.comment && <p className="text-xs text-red-500 mt-1">{errors.comment}</p>}
          </div>

          <div className="sm:col-span-2">
            <button
              id="review-submit"
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold
                         px-5 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-60"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              {submitting ? 'Saving…' : 'Add Review'}
            </button>
          </div>
        </form>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left text-xs text-gray-400 font-semibold px-4 py-3">Customer</th>
                <th className="text-left text-xs text-gray-400 font-semibold px-4 py-3">Product</th>
                <th className="text-left text-xs text-gray-400 font-semibold px-4 py-3">Rating</th>
                <th className="text-left text-xs text-gray-400 font-semibold px-4 py-3">Comment</th>
                <th className="text-center text-xs text-gray-400 font-semibold px-4 py-3">Visible</th>
                <th className="text-right text-xs text-gray-400 font-semibold px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400 text-sm">
                    <Loader2 size={18} className="animate-spin inline-block mr-2" />Loading reviews…
                  </td>
                </tr>
              )}
              {!loading && reviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400 text-sm">No reviews yet.</td>
                </tr>
              )}
              {!loading && reviews.map(r => (
                <tr key={r._id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{r.userName}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[140px] truncate">{r.productName}</td>
                  <td className="px-4 py-3"><StarRating rating={r.rating} /></td>
                  <td className="px-4 py-3 text-gray-500 max-w-[200px]">
                    <p className="line-clamp-2 text-xs leading-relaxed">{r.comment}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(r)}
                      className="flex items-center justify-center mx-auto"
                      title={r.isApproved ? 'Hide review' : 'Show review'}
                    >
                      {r.isApproved
                        ? <ToggleRight size={24} className="text-emerald-500" />
                        : <ToggleLeft size={24} className="text-gray-300" />
                      }
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}