import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Home, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input, Card } from '../../components/common';
import BackToLoginButton from '../../components/common/BackToLoginButton';

const schema = z.object({
  roomNumber: z.string().min(1, 'Room number is required'),
  password: z.string().min(1, 'Password is required'),
});

const StudentLogin = () => {
  const navigate = useNavigate();
  const { loginStudent } = useAuth();
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
    const result = await loginStudent(data.roomNumber, data.password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back!');
      navigate('/student/dashboard');
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
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 flex justify-between items-center">
        <div className="inline-flex items-center gap-3">
          {/* Logo removed */}
        </div>
        <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Back to Home
        </Link>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10 min-h-[calc(100vh-88px)]">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-[#800000] rounded-2xl mb-6 shadow-lg shadow-red-900/20">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-serif">
              Student Login
            </h1>
            <p className="text-slate-300">
              Access your room's cleaning dashboard
            </p>
          </div>

          <Card className="p-8 bg-white/10 backdrop-blur-md border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">Room Number</label>
                <Input
                  placeholder="e.g. 101A"
                  icon={Home}
                  error={errors.roomNumber?.message}
                  {...register('roomNumber')}
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
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-slate-400">
                Are you an admin?{' '}
                <Link
                  to="/login/admin"
                  className="text-[#ff4d4d] hover:text-[#ff3333] transition-colors font-medium font-serif"
                >
                  Login here
                </Link>
              </p>
            </div>
          </Card>

          {/* <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Demo: Room A-101 / password123
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;

