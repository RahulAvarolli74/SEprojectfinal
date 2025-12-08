import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  User,
  Search
} from 'lucide-react';
import { 
  Card, 
  Button, 
  Input, 
  Modal, 
  LoadingSpinner 
} from '../../components/common';
import { workerService } from '../../services';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const WorkerManagement = () => {
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      // Mock data
      setWorkers([
        { _id: '1', name: 'Raju Kumar', phone: '9876543210', address: 'Block A', isActive: true, totalJobs: 145, rating: 4.5 },
        { _id: '2', name: 'Shyam Singh', phone: '9876543211', address: 'Block B', isActive: true, totalJobs: 132, rating: 4.2 },
        { _id: '3', name: 'Mohan Das', phone: '9876543212', address: 'Block A', isActive: true, totalJobs: 158, rating: 4.8 },
        { _id: '4', name: 'Suresh Yadav', phone: '9876543213', address: 'Block C', isActive: false, totalJobs: 98, rating: 3.9 },
        { _id: '5', name: 'Ram Prasad', phone: '9876543214', address: 'Block B', isActive: true, totalJobs: 112, rating: 4.3 },
        { _id: '6', name: 'Krishna Murthy', phone: '9876543215', address: 'Block A', isActive: true, totalJobs: 167, rating: 4.7 },
      ]);
    } catch (error) {
      toast.error('Failed to load workers');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (worker = null) => {
    if (worker) {
      setEditingWorker(worker);
      setValue('name', worker.name);
      setValue('phone', worker.phone || '');
      setValue('address', worker.address || '');
    } else {
      setEditingWorker(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWorker(null);
    reset();
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingWorker) {
        // Update worker
        setWorkers((prev) =>
          prev.map((w) =>
            w._id === editingWorker._id ? { ...w, ...data } : w
          )
        );
        toast.success('Worker updated successfully');
      } else {
        // Add new worker
        const newWorker = {
          _id: Date.now().toString(),
          ...data,
          isActive: true,
          totalJobs: 0,
          rating: 0,
        };
        setWorkers((prev) => [...prev, newWorker]);
        toast.success('Worker added successfully');
      }
      closeModal();
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleWorkerStatus = async (worker) => {
    try {
      setWorkers((prev) =>
        prev.map((w) =>
          w._id === worker._id ? { ...w, isActive: !w.isActive } : w
        )
      );
      toast.success(`Worker ${worker.isActive ? 'disabled' : 'enabled'} successfully`);
    } catch (error) {
      toast.error('Failed to update worker status');
    }
  };

  const deleteWorker = async (worker) => {
    if (!confirm('Are you sure you want to delete this worker?')) return;
    
    try {
      setWorkers((prev) => prev.filter((w) => w._id !== worker._id));
      toast.success('Worker deleted successfully');
    } catch (error) {
      toast.error('Failed to delete worker');
    }
  };

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-white mb-2">
            Worker Management
          </h1>
          <p className="text-slate-400">
            Manage cleaning staff and their status
          </p>
        </div>
        <Button icon={Plus} onClick={() => openModal()}>
          Add Worker
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <Input
          placeholder="Search workers..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Card>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker._id} className="p-6" hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${worker.isActive ? 'bg-emerald-500/20' : 'bg-slate-700/50'}`}>
                  <User className={`w-6 h-6 ${worker.isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{worker.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    worker.isActive 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-slate-700/50 text-slate-500'
                  }`}>
                    {worker.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              {worker.phone && (
                <p className="text-slate-400">📞 {worker.phone}</p>
              )}
              {worker.address && (
                <p className="text-slate-400">📍 {worker.address}</p>
              )}
            </div>

            <div className="flex items-center justify-between py-3 border-t border-slate-800/50">
              <div className="text-center">
                <p className="text-lg font-bold text-white">{worker.totalJobs}</p>
                <p className="text-xs text-slate-500">Total Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-amber-400">⭐ {worker.rating || 'N/A'}</p>
                <p className="text-xs text-slate-500">Rating</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                variant="ghost"
                size="small"
                className="flex-1"
                onClick={() => toggleWorkerStatus(worker)}
              >
                {worker.isActive ? (
                  <ToggleRight className="w-4 h-4 mr-1 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-4 h-4 mr-1 text-slate-500" />
                )}
                {worker.isActive ? 'Disable' : 'Enable'}
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={() => openModal(worker)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={() => deleteWorker(worker)}
                className="text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <Card className="p-12 text-center">
          <div className="p-4 bg-slate-800/50 rounded-full w-fit mx-auto mb-4">
            <User className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No Workers Found
          </h3>
          <p className="text-slate-400">
            {workers.length === 0
              ? 'No workers have been added yet.'
              : 'No workers match your search.'}
          </p>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingWorker ? 'Edit Worker' : 'Add New Worker'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            placeholder="Enter worker name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Phone (Optional)"
            placeholder="Enter phone number"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            label="Address (Optional)"
            placeholder="Enter address"
            error={errors.address?.message}
            {...register('address')}
          />
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={submitting}
              className="flex-1"
            >
              {editingWorker ? 'Update' : 'Add'} Worker
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WorkerManagement;
