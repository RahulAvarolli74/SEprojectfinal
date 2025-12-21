import React, { useState, useEffect } from 'react';
import {
  Users,
  ClipboardCheck,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { authService } from '../../services';
import { LoadingSpinner } from '../../components/common';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalWorkers: 0,
      cleaningsToday: 0,
      weeklySubmissions: 0,
      pendingIssues: 0
    },
    charts: {
      workerPerformance: [],
      taskDistribution: [],
      weeklyTrend: []
    }
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await authService.getAdminDashboard();
      // response is ApiRes: { statusCode, data: { stats, charts, recentIssues }, success }
      const data = response.data || {};

      setDashboardData({
        stats: data.stats || {
          totalWorkers: 0,
          cleaningsToday: 0,
          weeklySubmissions: 0,
          pendingIssues: 0
        },
        charts: {
          workerPerformance: data.charts?.workerPerformance || [],
          taskDistribution: data.charts?.taskDistribution || [],
          weeklyTrend: data.charts?.weeklyTrend || []
        }
      });
    } catch (error) {
      console.error("Failed to fetch admin dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  // Stats mapped from state
  const stats = [
    { title: 'Total Workers', value: dashboardData.stats.totalWorkers.toString(), change: 'Active', icon: Users, color: 'bg-violet-500', iconColor: 'text-violet-500' },
    { title: 'Cleanings Today', value: dashboardData.stats.cleaningsToday.toString(), change: 'Daily', icon: ClipboardCheck, color: 'bg-emerald-500', iconColor: 'text-emerald-500' },
    { title: 'Weekly Submissions', value: dashboardData.stats.weeklySubmissions.toString(), change: 'Last 7 Days', icon: Calendar, color: 'bg-blue-500', iconColor: 'text-blue-500' },
    { title: 'Open Issues', value: dashboardData.stats.pendingIssues.toString(), change: 'Action Required', icon: AlertTriangle, color: 'bg-amber-500', iconColor: 'text-amber-500' },
  ];

  // Transform backend data to Recharts format if needed
  // Backend workerPerformance: [{ name: "Raju", count: 10 }] -> matches
  // Backend taskDistribution: [{ name: "Sweeping", value: 5 }] -> matches
  // Backend weeklyTrend: [{ _id: "2023-10-01", count: 5 }] -> needs mapping to "day"

  const weeklyTrendData = dashboardData.charts.weeklyTrend.map(item => ({
    day: new Date(item._id).toLocaleDateString('en-US', { weekday: 'short' }),
    value: item.count
  }));

  // Colors for Pie Chart
  const COLORS = ['#2dd4bf', '#fbbf24', '#34d399', '#818cf8', '#f87171', '#a78bfa'];


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-serif">Admin Dashboard</h1>
        <p className="text-slate-500">Overview of hostel cleaning operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${stat.change.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions
      <h2 className="text-lg font-bold text-slate-900 font-serif mt-8 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.path)}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all text-left group"
          >
            <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
              <action.icon size={20} />
            </div>
            <div>
              <span className="block font-bold text-slate-900">{action.label}</span>
              <span className="text-xs text-slate-500">Click to manage</span>
            </div>
          </button>
        ))}
      </div> */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cleanings per Worker */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 font-serif">Cleanings per Worker</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {/* Note: Backend returns { name: "Name", count: 10 } -> dataKey should be "count" not "value" unless mapped. 
                  Let's map it or change prop. Backend aggregate returns 'count'. 
                  Wait, let's map it in render or change dataKey. 
                  Let's change dataKey to "count" for robustness. */}
              <BarChart data={dashboardData.charts.workerPerformance} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="count" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 font-serif">Task Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.charts.taskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dashboardData.charts.taskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 font-serif">Weekly Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} dy={10} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
