import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Calendar,
  User,
  Home,
  Filter,
  Image as ImageIcon,
  Search,
  Download
} from 'lucide-react';
import {
  Card,
  Button,
  Select,
  Input,
  LoadingSpinner,
  Modal
} from '../../components/common';
import { cleaningService, workerService } from '../../services';

const CleaningLogs = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [filters, setFilters] = useState({
    worker: '',
    room: '',
    startDate: '',
    endDate: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Mock data
      setWorkers([
        { _id: '1', name: 'Raju Kumar' },
        { _id: '2', name: 'Shyam Singh' },
        { _id: '3', name: 'Mohan Das' },
        { _id: '4', name: 'Suresh Yadav' },
      ]);

      setLogs([
        {
          _id: '1',
          date: '2025-11-27T10:30:00Z',
          room: { number: 'A-101' },
          worker: { name: 'Raju Kumar' },
          cleaningTypes: ['Sweeping', 'Room Cleaning'],
          feedback: 'Great job! Very thorough cleaning.',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
        },
        {
          _id: '2',
          date: '2025-11-27T09:15:00Z',
          room: { number: 'B-205' },
          worker: { name: 'Shyam Singh' },
          cleaningTypes: ['Bathroom Cleaning'],
          feedback: 'Good work',
          image: null,
        },
        {
          _id: '3',
          date: '2025-11-26T14:00:00Z',
          room: { number: 'A-103' },
          worker: { name: 'Mohan Das' },
          cleaningTypes: ['Corridor Cleaning', 'Sweeping'],
          feedback: '',
          image: null,
        },
        {
          _id: '4',
          date: '2025-11-26T11:45:00Z',
          room: { number: 'C-301' },
          worker: { name: 'Raju Kumar' },
          cleaningTypes: ['Room Cleaning', 'Bathroom Cleaning'],
          feedback: 'Excellent service!',
          image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',
        },
        {
          _id: '5',
          date: '2025-11-25T08:30:00Z',
          room: { number: 'B-102' },
          worker: { name: 'Suresh Yadav' },
          cleaningTypes: ['Sweeping'],
          feedback: '',
          image: null,
        },
        {
          _id: '6',
          date: '2025-11-25T16:20:00Z',
          room: { number: 'A-201' },
          worker: { name: 'Mohan Das' },
          cleaningTypes: ['Room Cleaning'],
          feedback: 'Nice work, room looks spotless!',
          image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400',
        },
      ]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      worker: '',
      room: '',
      startDate: '',
      endDate: '',
    });
  };

  const filteredLogs = logs.filter((log) => {
    if (filters.worker && log.worker.name !== filters.worker) return false;
    if (filters.room && !log.room.number.toLowerCase().includes(filters.room.toLowerCase())) return false;
    if (filters.startDate && new Date(log.date) < new Date(filters.startDate)) return false;
    if (filters.endDate && new Date(log.date) > new Date(filters.endDate)) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="pt-8 lg:pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">
            Cleaning Logs
          </h1>
          <p className="text-slate-500">
            View all cleaning submissions from students
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            icon={Filter}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          <Button variant="secondary" icon={Download}>
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-6 bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-violet-600 hover:text-violet-700"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              placeholder="All Workers"
              options={workers.map((w) => ({ value: w.name, label: w.name }))}
              value={filters.worker}
              onChange={(e) => handleFilterChange('worker', e.target.value)}
              className="bg-white border-slate-200 text-slate-900"
            />
            <Input
              placeholder="Room Number"
              icon={Home}
              value={filters.room}
              onChange={(e) => handleFilterChange('room', e.target.value)}
              className="bg-white border-slate-200 text-slate-900"
            />
            <Input
              type="date"
              placeholder="Start Date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="bg-white border-slate-200 text-slate-900"
            />
            <Input
              type="date"
              placeholder="End Date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>
        </Card>
      )}

      {/* Logs Table */}
      <Card className="overflow-hidden bg-white border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Date & Time</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Room</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Worker</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Tasks</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Feedback</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Image</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-900 font-medium">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {format(new Date(log.date), 'MMM d, yyyy')}
                    </div>
                    <div className="text-sm text-slate-500">
                      {format(new Date(log.date), 'h:mm a')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-lg border border-violet-100">
                      {log.room.number}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <User className="w-4 h-4 text-slate-400" />
                      {log.worker.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {log.cleaningTypes.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full border border-slate-200"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 max-w-xs truncate">
                      {log.feedback || '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {log.image ? (
                      <button
                        onClick={() => setSelectedImage(log.image)}
                        className="relative w-12 h-12 rounded-lg overflow-hidden group border border-slate-200"
                      >
                        <img
                          src={log.image}
                          alt="Cleaning"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-12 text-center">
            <div className="p-4 bg-slate-50 rounded-full w-fit mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No Logs Found
            </h3>
            <p className="text-slate-500">
              {logs.length === 0
                ? 'No cleaning submissions have been made yet.'
                : 'No logs match your current filters.'}
            </p>
          </div>
        )}
      </Card>

      {/* Image Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        size="large"
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Cleaning"
            className="w-full h-auto rounded-xl"
          />
        )}
      </Modal>
    </div>
  );
};

export default CleaningLogs;
