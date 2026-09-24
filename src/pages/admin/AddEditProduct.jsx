import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, CheckCircle, Loader2, Upload, X } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const UPLOAD_API = `${API_BASE_URL}/api/admin/upload`;
const API = `${API_BASE_URL}/api/products`;

const EMPTY = {
  name: '',
  smallDescription: '',
  price: '',
  codCharge: '',
  image: '',
  images: ['', '', '', ''],
  videoUrl: '',
  isTrending: false,
  returnable: true,
  exchangeable: true,
  returnDays: 7,
  description: '',
  keyBenefits: [''],
  // Dynamic Array format for Additional Details [{ key: '', value: '' }]
  additionalDetails: [{ key: '', value: '' }],
  deliveryInformation: '',
  returnExchangePolicy: '',
  active: true,
};

function Field({ label, id, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function Input({ id, value, onChange, type = 'text', placeholder, ...rest }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                 text-sm text-gray-900 placeholder:text-gray-400
                 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white
                 transition-all duration-150"
      {...rest}
    />
  );
}

function Textarea({ id, value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                 text-sm text-gray-900 placeholder:text-gray-400
                 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white
                 transition-all duration-150 resize-none"
    />
  );
}

function CheckboxRow({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2.5 cursor-pointer group">
      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                       ${checked ? 'bg-gray-900 border-gray-900' : 'border-gray-300 group-hover:border-gray-500'}`}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>}
      </div>
      <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

export default function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // 1. Edit mode ആണെങ്കിൽ Backend-ൽ നിന്ന് single product fetch ചെയ്യുക
  useEffect(() => {
    if (isEdit) {
      async function fetchProduct() {
        try {
          setLoading(true);
          const res = await fetch(`${API}/${id}`);
          if (!res.ok) throw new Error('Product not found');
          const p = await res.json();

          if (p) {
            // Convert additionalDetails object/array to dynamic array structure
            let formattedDetails = [{ key: '', value: '' }];
            if (p.additionalDetails) {
              if (Array.isArray(p.additionalDetails) && p.additionalDetails.length > 0) {
                formattedDetails = p.additionalDetails;
              } else if (typeof p.additionalDetails === 'object' && Object.keys(p.additionalDetails).length > 0) {
                formattedDetails = Object.entries(p.additionalDetails).map(([k, v]) => ({ key: k, value: String(v) }));
              }
            }

            setForm({
              ...p,
              price: p.price ?? '',
              codCharge: p.codCharge ?? '',
              returnDays: p.returnDays ?? 7,
              images: Array.isArray(p.images) && p.images.length === 4
                ? p.images
                : [...(p.images || []), '', '', '', ''].slice(0, 4),
              keyBenefits: Array.isArray(p.keyBenefits) && p.keyBenefits.length > 0
                ? p.keyBenefits
                : [''],
              additionalDetails: formattedDetails,
            });
          }
        } catch (err) {
          console.error('Failed to load product:', err);
          alert('Could not load product details.');
          navigate('/admin/products');
        } finally {
          setLoading(false);
        }
      }
      fetchProduct();
    }
  }, [id, isEdit, navigate]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  }

  // ── Dynamic Additional Details Handlers ──
  function addDetail() {
    set('additionalDetails', [...form.additionalDetails, { key: '', value: '' }]);
  }

  function removeDetail(i) {
    const details = form.additionalDetails.filter((_, idx) => idx !== i);
    set('additionalDetails', details.length > 0 ? details : [{ key: '', value: '' }]);
  }

  function setDetailField(i, field, value) {
    const details = [...form.additionalDetails];
    details[i] = { ...details[i], [field]: value };
    set('additionalDetails', details);
  }

  function setImageAt(i, val) {
    const imgs = [...form.images];
    imgs[i] = val;
    set('images', imgs);
  }

  function addBenefit() { set('keyBenefits', [...form.keyBenefits, '']); }
  function removeBenefit(i) {
    const b = form.keyBenefits.filter((_, idx) => idx !== i);
    set('keyBenefits', b.length > 0 ? b : ['']);
  }
  function setBenefit(i, val) {
    const b = [...form.keyBenefits];
    b[i] = val;
    set('keyBenefits', b);
  }

  // ── Upload state: tracks loading per slot ("main", 0-3 for images, "video") ──
  const [uploadingSlot, setUploadingSlot] = useState(null);
  const [uploadError, setUploadError] = useState('');

  async function uploadToCloudinary(file, slot) {
    setUploadingSlot(slot);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(UPLOAD_API, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Upload failed');
      return data.url;
    } catch (err) {
      setUploadError(err.message);
      return null;
    } finally {
      setUploadingSlot(null);
    }
  }

  async function handleMainImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const url = await uploadToCloudinary(file, 'main');
    if (url) set('image', url);
  }

  async function handleAdditionalImageUpload(e, i) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const url = await uploadToCloudinary(file, i);
    if (url) setImageAt(i, url);
  }

  async function handleVideoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const url = await uploadToCloudinary(file, 'video');
    if (url) set('videoUrl', url);
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Product name is required.';
    if (!form.price) e.price = 'Price is required.';
    if (isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Enter a valid price.';
    return e;
  }

  // 2. Form Submit handling (POST for New Product, PUT for Edit Product)
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Convert dynamic details array into clean Key-Value Object
    const detailsObj = {};
    form.additionalDetails.forEach(item => {
      if (item.key.trim()) {
        detailsObj[item.key.trim()] = item.value.trim();
      }
    });

    const data = {
      ...form,
      price: Number(form.price),
      codCharge: Number(form.codCharge) || 0,
      returnDays: Number(form.returnDays) || 0,
      keyBenefits: form.keyBenefits.filter(b => b.trim()),
      additionalDetails: detailsObj,
    };

    try {
      setSubmitting(true);
      let res;
      if (isEdit) {
        // Update product (PUT)
        res = await fetch(`${API}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        // Add product (POST)
        res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }

      if (res.ok) {
        setSaved(true);
        setTimeout(() => { navigate('/admin/products'); }, 1200);
      } else {
        alert('Failed to save product. Please check server logs.');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Network error. Failed to save product.');
    } finally {
      setSubmitting(false);
    }
  }

  const imagePreviewCount = form.images.filter(u => Boolean(u && u.trim())).length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 text-sm">
        <Loader2 size={24} className="animate-spin mb-2" />
        Loading product details…
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="font-display font-bold text-gray-900 text-lg">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h2>
      </div>

      {/* Success banner */}
      {saved && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-5 text-sm">
          <CheckCircle size={16} /> Product {isEdit ? 'updated' : 'added'} successfully! Redirecting…
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Basic Info ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Basic Information</h3>

          <Field label="Product Name *" id="pname">
            <Input
              id="pname"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Cable Organizer Set"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </Field>

          <Field label="Short Description" id="pshort">
            <Input
              id="pshort"
              value={form.smallDescription}
              onChange={e => set('smallDescription', e.target.value)}
              placeholder="One-line summary shown on product cards"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (₹) *" id="pprice">
              <Input
                id="pprice"
                type="number"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="399"
                min="0"
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </Field>
            <Field label="COD Charge (₹)" id="pcod">
              <Input
                id="pcod"
                type="number"
                value={form.codCharge}
                onChange={e => set('codCharge', e.target.value)}
                placeholder="50"
                min="0"
              />
            </Field>
          </div>

          <Field label="Full Description" id="pdesc">
            <Textarea
              id="pdesc"
              rows={4}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Detailed product description…"
            />
          </Field>
        </section>

        {/* ── Images ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Images</h3>

          {/* Upload error banner */}
          {uploadError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-3 py-2 text-xs">
              <X size={13} /> Upload failed: {uploadError}
            </div>
          )}

          {/* Main Image */}
          <Field label="Main Product Image" id="pimageMain">
            <div className="flex gap-2 items-center">
              <Input
                id="pimageMain"
                value={form.image}
                onChange={e => set('image', e.target.value)}
                placeholder="Paste URL or upload a file…"
              />
              <label
                htmlFor="upload-main"
                className={`flex items-center gap-1.5 flex-shrink-0 cursor-pointer px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                  ${uploadingSlot === 'main' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
              >
                {uploadingSlot === 'main' ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                {uploadingSlot === 'main' ? 'Uploading…' : 'Upload'}
              </label>
              <input
                id="upload-main"
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={uploadingSlot !== null}
                onChange={handleMainImageUpload}
              />
            </div>
            {form.image && (
              <div className="relative inline-block mt-2">
                <img
                  src={form.image}
                  alt="main preview"
                  className="w-24 h-24 object-cover rounded-xl border border-gray-100"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => set('image', '')}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600"
                >
                  <X size={9} />
                </button>
              </div>
            )}
          </Field>

          {/* Additional Images */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Additional Images (up to 4)</p>
            <div className="space-y-2">
              {form.images.map((url, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    id={`pimage-${i}`}
                    value={url}
                    onChange={e => setImageAt(i, e.target.value)}
                    placeholder={`Image ${i + 1} URL or upload…`}
                  />
                  {url && (
                    <img
                      src={url}
                      alt={`thumb-${i}`}
                      className="w-10 h-10 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                  <label
                    htmlFor={`upload-img-${i}`}
                    className={`flex items-center gap-1 flex-shrink-0 cursor-pointer px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                      ${uploadingSlot === i ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
                  >
                    {uploadingSlot === i ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                    {uploadingSlot === i ? '…' : 'Upload'}
                  </label>
                  <input
                    id={`upload-img-${i}`}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={uploadingSlot !== null}
                    onChange={e => handleAdditionalImageUpload(e, i)}
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={() => setImageAt(i, '')}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Video ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Video</h3>

          <Field label="Video URL or Upload" id="pvideoUrl" hint="Upload a file to Cloudinary, or paste a direct video URL.">
            <div className="flex gap-2 items-center">
              <Input
                id="pvideoUrl"
                value={form.videoUrl}
                onChange={e => set('videoUrl', e.target.value)}
                placeholder="Paste URL or upload a video file…"
              />
              <label
                htmlFor="upload-video"
                className={`flex items-center gap-1.5 flex-shrink-0 cursor-pointer px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                  ${uploadingSlot === 'video' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
              >
                {uploadingSlot === 'video' ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                {uploadingSlot === 'video' ? 'Uploading…' : 'Upload'}
              </label>
              <input
                id="upload-video"
                type="file"
                accept="video/mp4,video/mov,video/avi,video/mkv,video/webm"
                className="sr-only"
                disabled={uploadingSlot !== null}
                onChange={handleVideoUpload}
              />
              {form.videoUrl && (
                <button
                  type="button"
                  onClick={() => set('videoUrl', '')}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </Field>

          {form.videoUrl && (
            <video
              src={form.videoUrl}
              controls
              className="w-full max-h-52 rounded-xl border border-gray-100 mt-1"
            />
          )}

          {uploadingSlot === 'video' && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Loader2 size={14} className="animate-spin" />
              Uploading video to Cloudinary… this may take a moment.
            </div>
          )}
        </section>

        {/* ── Key Benefits ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Key Benefits</h3>
          {form.keyBenefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                id={`benefit-${i}`}
                value={b}
                onChange={e => setBenefit(i, e.target.value)}
                placeholder={`Benefit ${i + 1}…`}
              />
              <button
                type="button"
                onClick={() => removeBenefit(i)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addBenefit}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-medium transition-colors"
          >
            <Plus size={14} /> Add benefit
          </button>
        </section>

        {/* ── Additional Details (Dynamic Key-Value Pairs) ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Additional Details</h3>

          <div className="space-y-3">
            {form.additionalDetails.map((detail, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1/2">
                  <Input
                    id={`detail-key-${i}`}
                    value={detail.key}
                    onChange={e => setDetailField(i, 'key', e.target.value)}
                    placeholder="Field Title (e.g. Material)"
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    id={`detail-val-${i}`}
                    value={detail.value}
                    onChange={e => setDetailField(i, 'value', e.target.value)}
                    placeholder="Value (e.g. Silicone)"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeDetail(i)}
                  className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addDetail}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-medium transition-colors pt-1"
          >
            <Plus size={14} /> Add detail field
          </button>
        </section>

        {/* ── Policies ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery & Return Policy</h3>

          <Field label="Delivery Information" id="pdel">
            <Textarea id="pdel" value={form.deliveryInformation} onChange={e => set('deliveryInformation', e.target.value)} placeholder="Delivery info…" />
          </Field>

          <Field label="Return / Exchange Policy" id="preturn">
            <Textarea id="preturn" value={form.returnExchangePolicy} onChange={e => set('returnExchangePolicy', e.target.value)} placeholder="Return policy…" />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Return Days" id="pretDays">
              <Input id="pretDays" type="number" min="0" value={form.returnDays} onChange={e => set('returnDays', e.target.value)} placeholder="7" />
            </Field>
          </div>
        </section>

        {/* ── Flags / Checkboxes ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Product Flags</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <CheckboxRow id="flag-active" label="In Stock (Active)" checked={form.active} onChange={e => set('active', e.target.checked)} />
            <CheckboxRow id="flag-trending" label="Trending" checked={form.isTrending} onChange={e => set('isTrending', e.target.checked)} />
            <CheckboxRow id="flag-returnable" label="Returnable" checked={form.returnable} onChange={e => set('returnable', e.target.checked)} />
            <CheckboxRow id="flag-exchange" label="Exchangeable" checked={form.exchangeable} onChange={e => set('exchangeable', e.target.checked)} />
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center gap-3 pb-6">
          <button
            type="submit"
            id="product-save"
            disabled={saved || submitting}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold
                       px-6 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-60"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : null}
            {isEdit ? 'Save Changes' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}