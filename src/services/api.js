/* ============================================================
   MARTVEXA — API Service
   Centralized fetch layer for all backend API calls.
============================================================ */

// Live Deployment-ലും Local-ലും ഒരേപോലെ വർക്ക് ചെയ്യാൻ Dynamic Base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_BASE_URL = `${BASE_URL}/api`;

// ─── Generic Fetch Helper ──────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  const { headers, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...headers, // Custom headers (eg: Authorization) ചേർക്കുന്നു
    },
    ...restOptions,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `API error: ${response.status}`);
  }

  return response.json();
}

// ─── Products ─────────────────────────────────────────────

/** Fetch all products */
export function fetchProducts() {
  return apiFetch("/products");
}

/** Fetch a single product by MongoDB _id */
export function fetchProductById(id) {
  return apiFetch(`/products/${id}`);
}

/** Fetch only trending products (isTrending: true, active: true) */
export async function fetchTrendingProducts() {
  const all = await fetchProducts();
  return all.filter((p) => p.isTrending && p.active !== false);
}

/** Create a new product */
export function createProduct(data) {
  return apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/** Update an existing product */
export function updateProduct(id, data) {
  return apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/** Delete a product */
export function deleteProduct(id) {
  return apiFetch(`/products/${id}`, { method: "DELETE" });
}

// ─── Reviews ──────────────────────────────────────────────

/** Fetch all reviews */
export function fetchReviews() {
  return apiFetch("/reviews");
}

/** Create a new review */
export function createReview(data) {
  return apiFetch("/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─── Videos ──────────────────────────────────────────────

/** Fetch all videos */
export function fetchVideos() {
  return apiFetch("/videos");
}

/** Create a new video */
export function createVideo(data) {
  return apiFetch("/videos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/** Delete a video */
export function deleteVideo(id) {
  return apiFetch(`/videos/${id}`, { method: "DELETE" });
}

// ─── Uploads ─────────────────────────────────────────────

/** Upload a file */
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/admin/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `Upload error: ${response.status}`);
  }

  return response.json();
}

// ─── Settings ─────────────────────────────────────────────

/** Fetch store settings */
export function fetchSettings() {
  return apiFetch("/settings");
}

/** Update store settings */
export function updateSettings(data, token) {
  return apiFetch("/settings", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

/** Change admin password */
export function changePasswordApi(data, token) {
  return apiFetch("/settings/change-password", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}