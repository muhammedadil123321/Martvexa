import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sideW = collapsed ? 'lg:pl-16' : 'lg:pl-60';

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
      />

      {/* Main content */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${sideW}`}>
        <AdminHeader onMenuToggle={() => setMobileOpen(o => !o)} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
