import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StudentNavbar from './StudentNavbar';

const StudentLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen relative font-sans bg-gray-50 flex flex-col text-slate-900">
      {/* Background & Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/college.png"
          alt="KLE Tech Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]"></div>
      </div>

      <StudentNavbar user={user} />

      {/* Main content */}
      <main className="relative z-10 flex-grow pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
