import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  ClipboardCheck,
  AlertTriangle,
  Plus,
  History,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bell
} from 'lucide-react';
import { Card, Button, LoadingSpinner } from '../../components/common';
import { useAuth } from '../../contexts/AuthContext';
import { authService, cleaningService } from '../../services';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    lastCleaningDate: null,
    submissionsThisMonth: 0,
    openIssues: 0,
    recentCleanings: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Backend /students/dashboard returns ApiRes { statusCode, data: { student, roomDetails, stats }, success }
      const dashboardInfo = await authService.getCurrentUser();
      const dashboardData = dashboardInfo.data || {}; // Safety check

      // Also fetch recent cleaning history if not included in dashboardInfo
      const history = await cleaningService.getStudentHistory({ limit: 5 });
      const historyLogs = history.data || []; // Assuming history also returns ApiRes with logs in .data or .data.logs

      setDashboardData({
        lastCleaningDate: dashboardData.stats?.lastCleaningDate || null,
        submissionsThisMonth: dashboardData.stats?.monthCleanings || 0,
        openIssues: dashboardData.stats?.openIssues || 0,
        recentCleanings: historyLogs, // Adjust based on actual history response nesting
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // toast.error("Could not load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: 'Cleanings This Month', value: dashboardData.submissionsThisMonth.toString(), icon: ClipboardCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Pending Issues', value: dashboardData.openIssues.toString(), icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Next Scheduled', value: 'Tomorrow', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  if (loading) {
    return <div className="flex justify-center py-20"><LoadingSpinner /></div>;
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-serif mb-2">
          Welcome back, {user?.name || 'Student'}
        </h1>
        <p className="text-slate-600">
          Here's what's happening with your room cleaning services.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${stat.bg} bg-opacity-50`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Notifications / Recent Activity Placeholder */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#800000]" />
          Recent Updates
        </h2>
        <Card className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="space-y-4">
            {dashboardData.recentCleanings.length > 0 ? (
              dashboardData.recentCleanings.map((cleaning, i) => (
                <div key={cleaning._id || i} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${cleaning.cleanstatus === 'Completed' ? 'bg-emerald-500' : 'bg-[#800000]'}`} />
                  <div>
                    <p className="text-sm text-slate-800 font-medium">
                      {cleaning.cleaningType?.join(', ') || 'Room Service'} - {cleaning.cleanstatus}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(cleaning.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 ml-5">No recent activity.</p>
            )}
          </div>
        </Card>
      </div>
    </div>

  );
};

export default StudentDashboard;
