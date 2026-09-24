import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, UserCircle2, Menu } from 'lucide-react';

const ROUTE_LABELS = {
  '/admin/dashboard':      'Dashboard',
  '/admin/products':       'Products',
  '/admin/products/add':   'Add Product',
  '/admin/videos':         'Reels & Videos',
  '/admin/reviews':        'Customer Reviews',
  '/admin/settings':       'Settings',
};

export default function AdminHeader({ onMenuToggle }) {
  const { pathname } = useLocation();

  // Backend login ചെയ്യുമ്പോൾ localStorage-ൽ save ചെയ്ത user details എടുക്കുന്നു
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = storedUser?.email || 'admin@martvexa.com';

  // Resolve label even for dynamic routes like /admin/products/edit/:id
  const label = Object.entries(ROUTE_LABELS).find(([k]) => pathname.startsWith(k) && (pathname === k || pathname.slice(k.length).startsWith('/')))?.[1]
    ?? 'Admin';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white border-b border-gray-200">
      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-display font-semibold text-gray-900 text-base leading-none">
            {label}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Martvexa Admin</p>
        </div>
      </div>

      {/* Right: notification + user */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gray-900" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
            <UserCircle2 size={16} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-gray-700 leading-none">{userEmail}</p>
            <p className="text-xs text-gray-400 mt-0.5">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}