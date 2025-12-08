import React, { useState } from 'react';
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

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock Data mirroring the screenshot
  const stats = [
    { title: 'Total Workers', value: '12', change: '+2 vs last week', icon: Users, color: 'bg-violet-500', iconColor: 'text-violet-500' },
    { title: 'Cleanings Today', value: '45', change: '+12% vs last week', icon: ClipboardCheck, color: 'bg-emerald-500', iconColor: 'text-emerald-500' },
    { title: 'Weekly Submissions', value: '284', change: '+8% vs last week', icon: Calendar, color: 'bg-blue-500', iconColor: 'text-blue-500' },
    { title: 'Open Issues', value: '8', change: '-3 vs last week', icon: AlertTriangle, color: 'bg-amber-500', iconColor: 'text-amber-500' },
  ];

  // const quickActions = [
  //   { label: 'Manage Faculty', icon: Users, path: '/admin/faculty', color: 'bg-blue-50 text-blue-600' },
  //   { label: 'Register User', icon: Users, path: '/admin/users', color: 'bg-emerald-50 text-emerald-600' },
  //   { label: 'Add Event', icon: Calendar, path: '/admin/events', color: 'bg-purple-50 text-purple-600' },
  //   { label: 'Manage Materials', icon: ClipboardCheck, path: '/admin/materials', color: 'bg-amber-50 text-amber-600' },
  // ];

  const cleaningData = [
    { name: 'Raju', value: 45 },
    { name: 'Shyam', value: 38 },
    { name: 'Mohan', value: 52 },
    { name: 'Suresh', value: 41 },
    { name: 'Ram', value: 35 },
    { name: 'Krishna', value: 48 },
  ];

  const taskData = [
    { name: 'Bathroom', value: 30, color: '#2dd4bf' }, // Teal
    { name: 'Corridor', value: 20, color: '#fbbf24' }, // Amber
    { name: 'Room Cleaning', value: 35, color: '#34d399' }, // Emerald
    { name: 'Sweeping', value: 15, color: '#818cf8' }, // Indigo
  ];

  const weeklyTrend = [
    { day: 'Mon', value: 42 },
    { day: 'Tue', value: 38 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 51 },
    { day: 'Fri', value: 48 },
    { day: 'Sat', value: 35 },
    { day: 'Sun', value: 28 },
  ];

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
              <BarChart data={cleaningData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={60} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={32} />
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
                  data={taskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
            <LineChart data={weeklyTrend}>
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
