import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../common'

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const maxScroll = 100
            const progress = Math.min(currentScrollY / maxScroll, 1)
            setScrollProgress(progress)

            // Show/Hide logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false) // Scrolling down
            } else {
                setIsVisible(true) // Scrolling up
            }
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    const isScrolled = scrollProgress > 0.1

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'
                } ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}
        >
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Logo */}
                        <img src="/logo.png" alt="KLE Tech" className="h-16 w-auto object-contain" />
                        <div className={`font-serif text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>

                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center space-x-8">
                        {['Home'].map((item) => (
                            <a
                                key={item}
                                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                                className={`font-medium transition-colors duration-200 hover:text-[#800000] ${isScrolled ? 'text-slate-700' : 'text-slate-800'}`}
                            >
                                {item}
                            </a>
                        ))}
                        <Link to="/login">
                            <Button className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-md !bg-none" style={{ backgroundImage: 'none' }}>
                                Login to Portal
                            </Button>
                        </Link>
                    </nav>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <svg className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <nav className="lg:hidden mt-4 pb-4 space-y-3 bg-white rounded-xl px-4 py-3 shadow-xl border border-gray-100">
                        {['Home', 'About'].map((item) => (
                            <a
                                key={item}
                                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                                className="block text-slate-700 hover:text-[#800000] font-medium transition-colors duration-200 py-2 hover:bg-gray-50 px-2 rounded"
                            >
                                {item}
                            </a>
                        ))}
                        <Link to="/login" className="block w-full">
                            <Button className="w-full bg-[#ff9999] hover:bg-[#ff8080] text-white border-0 shadow-md !bg-none" style={{ backgroundImage: 'none' }}>
                                Login to Portal
                            </Button>
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Header
