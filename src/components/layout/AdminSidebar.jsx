import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  AlertTriangle,
  LogOut,
  Sparkles,
  Menu,
  X,
  School,
  Settings,
  Calendar,
  Package
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/workers', icon: ClipboardList, label: 'Workers' },
    { to: '/admin/cleaning-logs', icon: AlertTriangle, label: 'Cleaning Logs' },
    { to: '/admin/issues', icon: AlertTriangle, label: 'Issues' },
  ];

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#800000] rounded-lg shadow-sm">
            <School className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 leading-none font-serif">KLE Tech</h1>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Admin Panel</span>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="p-4 mx-4 mt-6 bg-[#800000]/5 border border-[#800000]/10 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white border border-[#800000]/20 flex items-center justify-center text-[#800000] font-bold font-serif shadow-sm">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Logged in as</p>
            <p className="text-slate-900 font-serif font-bold">{user?.username || 'Administrator'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium group
              ${isActive
                ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/20 translate-x-1'
                : 'text-slate-500 hover:bg-slate-50 hover:text-[#800000] hover:translate-x-1'
              }
            `}
          >
            <item.icon className={`w-5 h-5 ${({ isActive }) => isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#800000]'}`} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100 bg-slate-50/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 border border-transparent transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-slate-200 shadow-md rounded-lg text-slate-900"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 bg-white border-r border-slate-200 shadow-xl lg:shadow-none
        flex flex-col h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <NavContent />
      </aside>
    </>
  );
};

export default AdminSidebar;
