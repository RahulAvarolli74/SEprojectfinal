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
      setDashboardData({
        lastCleaningDate: '2025-11-27',
        submissionsThisMonth: 12,
        openIssues: 2,
        recentCleanings: [
          { id: 1, date: '2025-11-27', worker: 'Raju', types: ['Sweeping', 'Room Cleaning'] },
          { id: 2, date: '2025-11-25', worker: 'Shyam', types: ['Bathroom Cleaning'] },
          { id: 3, date: '2025-11-23', worker: 'Raju', types: ['Corridor Cleaning', 'Sweeping'] },
        ],
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: 'Cleanings This Month', value: dashboardData.submissionsThisMonth.toString(), icon: ClipboardCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Pending Issues', value: dashboardData.openIssues.toString(), icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Next Scheduled', value: 'Tomorrow', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
  ];

  if (loading) {
    return <div className="flex justify-center py-20"><LoadingSpinner /></div>;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
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
          <Card key={index} className="p-6 border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
            Quick Actions
          </h2>
          <div className="grid gap-4">
            <button
              onClick={() => navigate('/student/submit-cleaning')}
              className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-[#800000] hover:shadow-md transition-all group text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#800000]/10 rounded-lg group-hover:bg-[#800000] transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#800000] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Verify Cleaning</h3>
                  <p className="text-sm text-slate-500">Submit proof of cleaning</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#800000] transition-colors" />
            </button>

            <button
              onClick={() => navigate('/student/raise-issue')}
              className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-[#800000] hover:shadow-md transition-all group text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#800000]/10 rounded-lg group-hover:bg-[#800000] transition-colors">
                  <AlertCircle className="w-5 h-5 text-[#800000] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Report Issue</h3>
                  <p className="text-sm text-slate-500">Raise a complaint</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#800000] transition-colors" />
            </button>

            <button
              onClick={() => navigate('/student/history')}
              className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-[#800000] hover:shadow-md transition-all group text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#800000]/10 rounded-lg group-hover:bg-[#800000] transition-colors">
                  <History className="w-5 h-5 text-[#800000] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">History</h3>
                  <p className="text-sm text-slate-500">View past records</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#800000] transition-colors" />
            </button>
          </div>
        </div>

        {/* Notifications / Recent Activity Placeholder */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#800000]" />
            Recent Updates
          </h2>
          <Card className="p-6 border-slate-100 bg-white/80">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-[#800000] mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Room inspection scheduled for tomorrow</p>
                    <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
