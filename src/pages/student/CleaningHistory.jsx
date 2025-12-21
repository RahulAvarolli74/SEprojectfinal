import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, User, Filter, Image as ImageIcon, X, Search, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Select,
  Input,
  LoadingSpinner,
  Modal
} from '../../components/common';
import { cleaningService, workerService } from '../../services';

const CleaningHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [filters, setFilters] = useState({
    worker: '',
    cleaningType: '',
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
      setLoading(true);

      // Fetch Workers (for filter)
      const workersData = await workerService.getWorkersWithStats();
      // workersData is ApiRes. data is { activeWorkers: ... } or array?
      // Based on controller, it returns { activeWorkers: [], totalWorkers: ... }
      const fetchedWorkers = workersData.data?.activeWorkers || workersData.data || [];
      setWorkers(fetchedWorkers);

      // Fetch History
      const historyResponse = await cleaningService.getStudentHistory(filters);
      // historyResponse is ApiRes { data: { logs: [] } }
      const fetchedHistory = historyResponse.data?.logs || historyResponse.data || [];
      setHistory(fetchedHistory);

    } catch (error) {
      console.error('Failed to fetch history:', error);
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
      cleaningType: '',
      startDate: '',
      endDate: '',
    });
  };

  const filteredHistory = history.filter((item) => {
    if (filters.worker && item.worker.name !== filters.worker) return false;
    if (filters.cleaningType && !item.cleaningTypes.includes(filters.cleaningType)) return false;
    if (filters.startDate && new Date(item.date) < new Date(filters.startDate)) return false;
    if (filters.endDate && new Date(item.date) > new Date(filters.endDate)) return false;
    return true;
  });

  const cleaningTypeOptions = [
    { value: 'Sweeping', label: 'Sweeping' },
    { value: 'Room Cleaning', label: 'Room Cleaning' },
    { value: 'Bathroom Cleaning', label: 'Bathroom Cleaning' },
    { value: 'Corridor Cleaning', label: 'Corridor Cleaning' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pt-2">
        <button onClick={() => navigate('/student/dashboard')} className="text-slate-500 hover:text-[#800000] flex items-center gap-1 mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">
              Cleaning History
            </h1>
            <p className="text-slate-600">
              View all your cleaning submissions
            </p>
          </div>
          <Button
            variant="outline"
            icon={Filter}
            onClick={() => setShowFilters(!showFilters)}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-6 border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-[#800000] hover:text-red-700"
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
              className="bg-white border-slate-200"
            />
            <Select
              placeholder="All Types"
              options={cleaningTypeOptions}
              value={filters.cleaningType}
              onChange={(e) => handleFilterChange('cleaningType', e.target.value)}
              className="bg-white border-slate-200"
            />
            <Input
              type="date"
              placeholder="Start Date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="bg-white border-slate-200"
            />
            <Input
              type="date"
              placeholder="End Date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="bg-white border-slate-200"
            />
          </div>
        </Card>
      )}

      {/* History List */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item._id} className="p-6 border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white" hover>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Image thumbnail */}
                {item.image && (
                  <button
                    onClick={() => setSelectedImage(item.image)}
                    className="relative w-full sm:w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 group"
                  >
                    <img
                      src={item.image}
                      alt="Cleaning"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                  </button>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.cleaningTypes.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 text-xs font-medium bg-[#800000]/10 text-[#800000] rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(item.date), 'MMM d, yyyy • h:mm a')}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {item.worker.name}
                    </div>
                  </div>

                  {item.feedback && (
                    <p className="text-slate-600 text-sm italic">
                      "{item.feedback}"
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center border-slate-200 bg-white">
          <div className="p-4 bg-slate-100 rounded-full w-fit mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2 font-serif">
            No Records Found
          </h3>
          <p className="text-slate-500">
            {history.length === 0
              ? "You haven't submitted any cleaning reports yet."
              : 'No records match your current filters.'}
          </p>
        </Card>
      )}

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

export default CleaningHistory;
