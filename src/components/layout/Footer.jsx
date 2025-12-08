import React from 'react';

function Footer() {
    return (
        <footer className="bg-[#1e293b] text-slate-300 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white font-serif font-bold">K</div>
                            <span className="text-white font-serif font-bold text-xl">KLE Tech</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4 text-slate-400">
                            A premier institution committed to excellence in education, research, and innovation.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Icons Placeholder */}
                            {[1, 2, 3].map((i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-slate-800 hover:bg-[#800000] rounded-lg flex items-center justify-center transition-colors duration-200 text-white">
                                    <span className="text-xs">S{i}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-4 font-serif">Quick Links</h4>
                        <ul className="space-y-2">
                            {['About Us', 'Admissions', 'Academic Programs', 'Research', 'Campus Life'].map((item) => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors text-sm">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-4 font-serif">Resources</h4>
                        <ul className="space-y-2">
                            {['Library', 'E-Learning', 'Student Portal', 'Faculty Portal', 'Alumni Network'].map((item) => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors text-sm">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-4 font-serif">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-[#800000] font-bold">📍</span>
                                <span>KLE Technological University, Hubballi, Karnataka - 580031</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-[#800000] font-bold">📞</span>
                                <span>+91 836 237 7000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-[#800000] font-bold">✉️</span>
                                <span>info@kletech.ac.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-center md:text-left text-slate-500">
                            <p className="mb-2">© 2025 KLE Technological University. All rights reserved.</p>
                            <p className="text-xs">
                                Accredited by NAAC with 'A++' Grade | Approved by AICTE | Recognized by UGC
                            </p>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Site Map</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
