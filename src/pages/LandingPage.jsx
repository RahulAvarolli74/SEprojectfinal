import { Link } from 'react-router-dom';
import { Home, Shield, Sparkles, CheckCircle2, Users, BarChart3, ArrowRight } from 'lucide-react';
import { Button, Card } from '../components/common';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  const features = [
    {
      icon: CheckCircle2,
      title: 'Easy Verification',
      description: 'Quick and simple cleaning verification with photo uploads',
    },
    {
      icon: Users,
      title: 'Worker Management',
      description: 'Track and manage cleaning staff efficiently',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights and comprehensive reports',
    },
  ];

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

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 flex-grow">
        <div className="text-center max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700 fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#800000]/5 border border-[#800000]/20 rounded-full mb-8 backdrop-blur-sm">
            {/* <Sparkles className="w-4 h-4 text-[#800000]" /> */}
            <span className="text-sm text-[#800000] font-medium tracking-wide">KLE Hostel Management System</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight font-serif tracking-tight">
            Smart Cleaning{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800000] to-red-900">
              Verification
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Streamline your hostel cleaning operations with our comprehensive
            verification and worker management system designed for KLE Tech.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login/student">
              <Button size="large" icon={Home} className="bg-[#800000] hover:bg-[#600000] text-white border-0 shadow-lg shadow-red-900/20">
                Student Portal
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/login/admin">
              <Button variant="secondary" size="large" icon={Shield} className="bg-white text-slate-900 border border-gray-200 hover:bg-gray-50 hover:border-[#800000]/30 shadow-sm">
                Admin Portal
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm hover:shadow-xl hover:border-[#800000]/20 transition-all duration-300 group"
              hover
            >
              <div className="p-4 bg-[#800000]/5 rounded-2xl w-fit mb-6 group-hover:bg-[#800000] transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-[#800000] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif group-hover:text-[#800000] transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed group-hover:text-slate-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20">
          <Card className="p-10 bg-white shadow-xl border-gray-100 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
              {[
                { value: '500+', label: 'Rooms Managed' },
                { value: '50+', label: 'Cleaning Staff' },
                { value: '10K+', label: 'Verifications' },
                { value: '99%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <div key={index} className="text-center px-4">
                  <div className="text-4xl md:text-5xl font-bold text-[#800000] font-serif mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
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

export default LandingPage;
