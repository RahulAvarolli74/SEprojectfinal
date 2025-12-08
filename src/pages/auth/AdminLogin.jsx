import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Shield, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input, Card } from '../../components/common';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await loginAdmin(data.username, data.password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome, Admin!');
      navigate('/admin/dashboard');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen relative font-sans">
      {/* Background & Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="/college.png"
          alt="KLE Tech Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-3 text-white hover:text-gray-200 transition-colors">
          <img src="/logo.png" alt="KLE Logo" className="w-10 h-10 object-contain brightness-0 invert" />
          <span className="font-serif font-bold text-xl tracking-wide">KLE Tech</span>
        </Link>
        <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Back to Home
        </Link>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10 min-h-[calc(100vh-88px)]">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-[#800000] rounded-2xl mb-6 shadow-lg shadow-red-900/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-serif">
              Admin Login
            </h1>
            <p className="text-slate-300">
              Access the management dashboard
            </p>
          </div>

          <Card className="p-8 bg-white/10 backdrop-blur-md border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">Username</label>
                <Input
                  placeholder="Enter username"
                  icon={User}
                  error={errors.username?.message}
                  {...register('username')}
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-[#800000] focus:ring-[#800000]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  icon={Lock}
                  error={errors.password?.message}
                  {...register('password')}
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-[#800000] focus:ring-[#800000]"
                />
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full bg-[#800000] hover:bg-[#600000] text-white border-0 py-3 font-bold shadow-lg"
                size="large"
              >
                Sign In as Admin
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-slate-400">
                Are you a student?{' '}
                <Link
                  to="/login/student"
                  className="text-[#ff4d4d] hover:text-[#ff3333] transition-colors font-medium font-serif"
                >
                  Login here
                </Link>
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Demo: admin / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
