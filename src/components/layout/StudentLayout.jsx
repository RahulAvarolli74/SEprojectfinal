import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StudentSidebar from './StudentSidebar';

const StudentLayout = () => {
  const { logout } = useAuth(); // Assuming logout is needed or handle in Sidebar? 
  // StudentSidebar handles logout internally so we might not need it here, but let's keep consistency.

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      <StudentSidebar />

      {/* Main content */}
      <main className="flex-1 relative flex flex-col h-screen overflow-y-auto w-full">
        <div className="flex-1 p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
