import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

const StudentNavbar = ({ user }) => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login/student');
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-white/65 backdrop-blur-md py-3 shadow-md border-b border-slate-100"
                : "bg-white/60 backdrop-blur-sm py-5 border-b border-white/20"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center h-10">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/student/dashboard')}>
                    <img src="/logo.png" alt="KLE Logo" className="h-12 w-auto object-contain" />
                    <div>
                        <span className={`block text-xl font-serif font-bold leading-none tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}
                        >
                            KLE Tech
                        </span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">Student Portal</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">

                    <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                        {user && (
                            <div className="text-right hidden lg:block">
                                <span className="block text-sm font-bold text-slate-900">
                                    {user.name || 'Student'}
                                </span>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 border rounded-full transition-all duration-300 text-sm font-medium tracking-wide border-slate-200 text-slate-700 hover:bg-[#800000] hover:text-white hover:border-[#800000] flex items-center gap-2 group"
                        >
                            <LogOut className="w-4 h-4 group-hover:stroke-white" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-slate-900 p-2 hover:bg-slate-100 rounded-lg"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 transition-all duration-300 overflow-hidden shadow-xl ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col p-6 space-y-4">
                    {user && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
                            <div className="text-slate-900 font-bold">{user.name}</div>
                            <div className="text-slate-500 text-sm">{user.usn}</div>
                        </div>
                    )}
                    {['Projects', 'Team', 'Resources'].map((item) => (
                        <a key={item} href={`/student/dashboard#${item.toLowerCase()}`} className="text-slate-700 hover:text-[#800000] text-lg font-serif font-medium py-2 border-b border-slate-50">
                            {item}
                        </a>
                    ))}
                    <button onClick={handleLogout} className="text-[#800000] font-serif text-lg flex items-center gap-2 py-2 mt-2">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default StudentNavbar;
