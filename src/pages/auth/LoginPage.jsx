import { Link } from 'react-router-dom';
import { Home, Shield, ArrowRight } from 'lucide-react';
import { Button, Card } from '../../components/common';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const LoginPage = () => {
    return (
        <div className="min-h-screen relative font-sans bg-gray-50 flex flex-col">
            <Header />

            {/* Background & Overlay */}
            <div className="fixed inset-0 z-0">
                <img
                    src="/college.png"
                    alt="KLE Tech Campus"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg animate-in slide-in-from-bottom-4 duration-700 fade-in">
                    <Card className="p-8 md:p-12 bg-white/80 backdrop-blur-md shadow-2xl border-white/20">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-slate-900 mb-4 font-serif">Welcome Back</h1>
                            <p className="text-slate-600">Please select your portal to continue</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Link to="/login/student" className="w-full">
                                <Button size="large" icon={Home} className="w-full bg-[#800000] hover:bg-[#600000] text-white border-0 shadow-lg shadow-red-900/20 justify-center h-14 text-lg">
                                    Student Portal
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white/50 text-slate-500 font-medium">or</span>
                                </div>
                            </div>

                            <Link to="/login/admin" className="w-full">
                                <Button variant="secondary" size="large" icon={Shield} className="w-full bg-white text-slate-900 border border-gray-200 hover:bg-gray-50 hover:border-[#800000]/30 shadow-sm justify-center h-14 text-lg">
                                    Admin Portal
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default LoginPage;
