import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Film, CheckCircle, Loader } from 'lucide-react';
import { fetchVideos, fetchProducts, createVideo, deleteVideo, uploadFile } from '../../services/api';

export default function Videos() {
  const [videos, setVideos]     = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm]         = useState({ title: '', file: null, previewUrl: '', linkedProductId: '' });
  const [saved, setSaved]       = useState(false);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  async function refresh() {
    try {
      const [v, p] = await Promise.all([fetchVideos(), fetchProducts()]);
      setVideos(v);
      setProducts(p);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  }

  useEffect(() => { refresh(); }, []);

  function handleVideoFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm(f => ({ ...f, file, previewUrl: url }));
    if (errors.file) setErrors(err => ({ ...err, file: '' }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim())  e.title = 'Title is required.';
    if (!form.file)          e.file = 'Please select a video file.';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    setLoading(true);
    setErrors({});
    
    try {
      // Upload the video file
      const uploadRes = await uploadFile(form.file);

      // Save the video data to database
      await createVideo({
        title: form.title.trim(),
        videoUrl: uploadRes.url,
        linkedProductId: form.linkedProductId || null,
      });

      setForm({ title: '', file: null, previewUrl: '', linkedProductId: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      refresh();
      
      const inp = document.getElementById('video-file-input');
      if (inp) inp.value = '';
    } catch (err) {
      console.error(err);
      setErrors({ global: err.message || 'Failed to upload video.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this video?')) return;
    try {
      await deleteVideo(id);
      refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete video');
    }
  }

  function getProductName(id) {
    const p = products.find(p => p._id === id || String(p.id) === String(id));
    return p ? p.name : '—';
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Upload Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Film size={16} /> Upload New Reel / Video
        </h2>

        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-4 text-sm">
            <CheckCircle size={15} /> Video uploaded successfully!
          </div>
        )}

        {errors.global && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {errors.global}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="video-title" className="block text-xs font-semibold text-gray-700 mb-1.5">Video Title *</label>
            <input
              id="video-title"
              type="text"
              value={form.title}
              onChange={e => { setForm(f => ({ ...f, title: e.target.value })); if (errors.title) setErrors(er => ({ ...er, title: '' })); }}
              placeholder="e.g. Product Demo"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                         text-sm text-gray-900 placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Video File */}
          <div>
            <label htmlFor="video-file-input" className="block text-xs font-semibold text-gray-700 mb-1.5">Video File (.mp4) *</label>
            <input
              id="video-file-input"
              type="file"
              accept="video/*"
              onChange={handleVideoFile}
              className="block w-full text-sm text-gray-600
                         file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0
                         file:text-sm file:font-medium file:bg-gray-900 file:text-white
                         hover:file:bg-gray-800 cursor-pointer"
            />
            {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
            {form.previewUrl && (
              <video
                src={form.previewUrl}
                controls
                className="mt-3 w-full max-h-44 rounded-xl border border-gray-100 object-cover"
              />
            )}
          </div>

          {/* Linked Product */}
          <div>
            <label htmlFor="video-product" className="block text-xs font-semibold text-gray-700 mb-1.5">Link to Product (optional)</label>
            <select
              id="video-product"
              value={form.linkedProductId}
              onChange={e => setForm(f => ({ ...f, linkedProductId: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                         text-sm text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
            >
              <option value="">— None —</option>
              {products.map(p => (
                <option key={p._id || p.id} value={p._id || p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <button
            id="video-upload-btn"
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold
                       px-5 py-2.5 rounded-xl transition-all active:scale-95"
          >
            {loading ? <Loader className="animate-spin" size={16} /> : <Plus size={16} />}
            {loading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>

      {/* Video Grid */}
      {videos.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 py-12 text-center text-gray-400 text-sm">
          No videos uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map(v => (
            <div key={v._id || v.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group">
              {v.videoUrl ? (
                <video
                  src={v.videoUrl}
                  controls
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-300">
                  <Film size={32} />
                </div>
              )}
              <div className="p-4 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{v.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    Product: {getProductName(v.linkedProductId?._id || v.linkedProductId)}
                  </p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : ''}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(v._id || v.id)}
                  className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete video"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
