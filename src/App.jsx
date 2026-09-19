import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import HowOrder from "./pages/HowOrder";
import Contact from "./pages/Contact";

// Footer ullavaye matram wrap cheyyanulla layout
const LayoutWithFooter = () => (
  <>
    <Outlet />
    <Footer />
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-brand-white">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Footer ullavar ellaam eethil varum */}
            <Route element={<LayoutWithFooter />}>
              <Route path="/" element={<Home />} />
              <Route path="/products/" element={<Products />} />
              <Route path="/howorder/" element={<HowOrder />} />
              <Route path="/contact/" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* ProductDetails-il Footer varilla */}
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}