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
      setLoading(true);
      const response = await workerService.getWorkers();
      
      // FIX: Access response.data directly (it is the array), handled empty case
      const fetchedWorkers = Array.isArray(response.data) ? response.data : [];
      
      setWorkers(fetchedWorkers);
    } catch (error) {
      console.error(error);
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
        await workerService.updateWorker(editingWorker._id, data);

        setWorkers((prev) =>
          prev.map((w) =>
            w._id === editingWorker._id ? { ...w, ...data } : w
          )
        );
        toast.success('Worker updated successfully');
      } else {
        // Add new worker
        const response = await workerService.createWorker(data);
        // FIX: Ensure we use the returned data correctly
        const newWorker = response.data || { ...data, _id: Date.now().toString(), isActive: true, totalJobs: 0, rating: 0 };

        setWorkers((prev) => [...prev, newWorker]);
        toast.success('Worker added successfully');
      }
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleWorkerStatus = async (worker) => {
    try {
      await workerService.toggleWorkerStatus(worker._id);

      // We toggle the local status optimistically or based on response
      // Backend uses "Active"/"Inactive", frontend might use boolean or string.
      // Based on model, status is String "Active"/"Inactive".
      // Frontend UI seems to expect boolean isActive in some places or check status string.
      // Let's update the string status.
      setWorkers((prev) =>
        prev.map((w) =>
          w._id === worker._id ? { ...w, status: w.status === 'Active' ? 'Inactive' : 'Active' } : w
        )
      );
      toast.success(`Worker status updated`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update worker status');
    }
  };

  const deleteWorker = async (worker) => {
    if (!confirm('Are you sure you want to delete this worker?')) return;

    try {
      await workerService.deleteWorker(worker._id);
      setWorkers((prev) => prev.filter((w) => w._id !== worker._id));
      toast.success('Worker deleted successfully');
    } catch (error) {
      console.error(error);
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Worker Management
          </h1>
          <p className="text-slate-500">
            Manage cleaning staff and their status
          </p>
        </div>
        <Button icon={Plus} onClick={() => openModal()}>
          Add Worker
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4 bg-white border-slate-200 shadow-sm">
        <Input
          placeholder="Search workers..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white border-slate-200 text-slate-900"
        />
      </Card>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker._id} className="p-6 bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow" hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${worker.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  <User className={`w-6 h-6 ${worker.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{worker.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${worker.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                    {worker.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              {worker.phone && (
                <p className="text-slate-500">📞 {worker.phone}</p>
              )}
              {worker.assigned_block && (
                <p className="text-slate-500">📍 {worker.assigned_block}</p>
              )}
            </div>

            <div className="flex items-center justify-between py-3 border-t border-slate-100">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">{worker.totalJobs || 0}</p>
                <p className="text-xs text-slate-500">Total Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-amber-500">⭐ {worker.rating ? parseFloat(worker.rating).toFixed(1) : 'N/A'}</p>
                <p className="text-xs text-slate-500">Rating</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                variant="ghost"
                size="small"
                className="flex-1 text-slate-600 hover:bg-slate-50"
                onClick={() => toggleWorkerStatus(worker)}
              >
                {worker.status === 'Active' ? (
                  <ToggleRight className="w-4 h-4 mr-1 text-emerald-500" />
                ) : (
                  <ToggleLeft className="w-4 h-4 mr-1 text-slate-400" />
                )}
                {worker.status === 'Active' ? 'Disable' : 'Enable'}
              </Button>
              <Button
                variant="ghost"
                size="small"
                className="text-slate-600 hover:bg-slate-50"
                onClick={() => openModal(worker)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={() => deleteWorker(worker)}
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <Card className="p-12 text-center bg-white border-slate-200 shadow-sm">
          <div className="p-4 bg-slate-50 rounded-full w-fit mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Workers Found
          </h3>
          <p className="text-slate-500">
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
            label="Phone"
            placeholder="Enter phone number"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            label="Assigned Block"
            placeholder="e.g. Block A"
            error={errors.address?.message}
            {...register('address')} // Using address field for block based on schema map
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