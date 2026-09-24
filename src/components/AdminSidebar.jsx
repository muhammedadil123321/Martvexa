import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Video,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products',  icon: Package,         label: 'Products' },
  { to: '/admin/videos',    icon: Video,            label: 'Reels / Videos' },
  { to: '/admin/reviews',   icon: Star,             label: 'Reviews' },
  { to: '/admin/settings',  icon: Settings,         label: 'Settings' },
];

export default function AdminSidebar({ collapsed, onToggle }) {
  const navigate  = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login', { replace: true });
  }

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 flex flex-col
        bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo / Brand */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-200 ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
          <Zap size={15} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-display font-bold text-gray-900 text-sm leading-none">Martvexa</p>
            <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150
               ${isActive
                 ? 'bg-gray-900 text-white'
                 : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
               }
               ${collapsed ? 'justify-center' : ''}
              `
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout + Collapse Toggle */}
      <div className="px-2 pb-4 border-t border-gray-200 pt-3 space-y-1">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                      text-red-600 hover:bg-red-50 transition-all duration-150
                      ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        <button
          onClick={onToggle}
          className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                      text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-150
                      ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
