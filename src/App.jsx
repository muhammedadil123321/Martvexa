
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

// ── Store pages ────────────────────────────────────────────
import Home           from './pages/Home';
import NotFound       from './pages/NotFound';
import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import Products       from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import HowOrder       from './pages/HowOrder';
import Contact        from './pages/Contact';

// ── Admin pages ────────────────────────────────────────────
import AdminLayout    from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login          from './pages/admin/Login';
import Dashboard      from './pages/admin/Dashboard';
import AdminProducts  from './pages/admin/Products';
import AddEditProduct from './pages/admin/AddEditProduct';
import Videos         from './pages/admin/Videos';
import Reviews        from './pages/admin/Reviews';
import Settings       from './pages/admin/Settings';


// Footer wrapper for store routes
const LayoutWithFooter = () => (
  <>
    <Outlet />
    <Footer />
  </>
);

export default function App() {
 
 

  return (
    <BrowserRouter>
      <Routes>
        {/* ══════════════ STORE ROUTES ══════════════ */}
        <Route
          element={
            <div className="flex flex-col min-h-screen bg-brand-white">
              <Navbar />
              <main className="flex-1">
                <Outlet />
              </main>
            </div>
          }
        >
          {/* Routes WITH footer */}
          <Route element={<LayoutWithFooter />}>
            <Route path="/"            element={<Home />} />
            <Route path="/products/"   element={<Products />} />
            <Route path="/howorder/"   element={<HowOrder />} />
            <Route path="/contact/"    element={<Contact />} />
            <Route path="*"            element={<NotFound />} />
          </Route>

          {/* ProductDetails – no footer */}
          <Route path="/products/:id"  element={<ProductDetails />} />
        </Route>

        {/* ══════════════ ADMIN ROUTES ══════════════ */}
        {/* Public: login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Redirect bare /admin → login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Protected admin panel */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard"            element={<Dashboard />} />
          <Route path="products"             element={<AdminProducts />} />
          <Route path="products/add"         element={<AddEditProduct />} />
          <Route path="products/edit/:id"    element={<AddEditProduct />} />
          <Route path="videos"               element={<Videos />} />
          <Route path="reviews"              element={<Reviews />} />
          <Route path="settings"             element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}