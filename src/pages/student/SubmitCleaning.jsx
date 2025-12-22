import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Send, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Select,
  Textarea,
  ImageUpload,
  Checkbox,
  LoadingSpinner
} from '../../components/common';
import { cleaningService, workerService } from '../../services';

const schema = z.object({
  workerId: z.string().min(1, 'Please select a worker'),
  feedback: z.string().optional(),
});

const cleaningTypes = [
  { id: 'Sweeping', label: 'Sweeping' },
  { id: 'Room Cleaning', label: 'Room Cleaning' },
  { id: 'Bathroom Cleaning', label: 'Bathroom Cleaning' },
  { id: 'Corridor Cleaning', label: 'Corridor Cleaning' },
];

const SubmitCleaning = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [workersLoading, setWorkersLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setWorkersLoading(true);
      const response = await workerService.getActiveWorkers();
      
      // FIX: The backend already returns only Active workers for this endpoint.
      // We just need to access the array correctly.
      const workerList = Array.isArray(response.data) ? response.data : [];
      
      // Removed the .filter() because the student endpoint doesn't return the 'status' field
      setWorkers(workerList);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load workers');
    } finally {
      setWorkersLoading(false);
    }
  };

  const handleTypeToggle = (typeId) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const onSubmit = async (data) => {
    if (selectedTypes.length === 0) {
      toast.error('Please select at least one cleaning type');
      return;
    }

    setLoading(true);
    try {
      await cleaningService.submitCleaning({
        workerId: data.workerId,
        cleaningTypes: selectedTypes,
        feedback: data.feedback,
        image: image
      });
      
      setSubmitted(true);
      toast.success('Cleaning report submitted successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setSelectedTypes([]);
    setImage(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="p-8 text-center border-slate-700 shadow-lg bg-white">
          <div className="p-4 bg-emerald-100 rounded-full w-fit mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">
            Successfully Submitted!
          </h2>
          <p className="text-slate-600 mb-6">
            Your cleaning report has been recorded. Thank you for helping maintain cleanliness.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleReset} variant="outline" className="border-slate-700 text-slate-700 hover:bg-slate-50">
              Submit Another
            </Button>
            <Button onClick={() => navigate('/student/dashboard')} className="bg-[#800000] hover:bg-[#600000] text-white">
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="pt-2">
        <button onClick={() => navigate('/student/dashboard')} className="text-slate-500 hover:text-[#800000] flex items-center gap-1 mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">
          Submit Cleaning Report
        </h1>
        <p className="text-slate-600">
          Record a cleaning service for your room
        </p>
      </div>

      <Card className="p-6 border-slate-200 shadow-md bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {workersLoading ? (
            <div className="py-4">
              <LoadingSpinner size="small" />
            </div>
          ) : (
            <Select
              label="Select Worker"
              placeholder="Choose a worker"
              options={workers.map((w) => ({ value: w._id, label: w.name }))}
              error={errors.workerId?.message}
              {...register('workerId')}
              className="bg-white border-slate-200 text-slate-900 focus:border-[#800000] focus:ring-[#800000]"
            />
          )}

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Cleaning Types <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cleaningTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => handleTypeToggle(type.id)}
                  className={`
                    p-4 rounded-xl border cursor-pointer transition-all duration-300
                    ${selectedTypes.includes(type.id)
                      ? 'bg-[#800000]/10 border-[#800000] text-[#800000]'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                    }
                  `}
                >
                  <Checkbox
                    label={type.label}
                    checked={selectedTypes.includes(type.id)}
                    onChange={() => { }}
                    className="pointer-events-none"
                  />
                </div>
              ))}
            </div>
            {selectedTypes.length === 0 && (
              <p className="text-xs text-slate-500">
                Select at least one cleaning type
              </p>
            )}
          </div>

          <Textarea
            label="Feedback (Optional)"
            placeholder="Any comments about the cleaning service..."
            rows={3}
            {...register('feedback')}
            className="bg-white border-slate-200 text-slate-900 focus:border-[#800000] focus:ring-[#800000]"
          />

          <ImageUpload
            label="Upload Photo (Optional)"
            value={image}
            onChange={setImage}
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full bg-[#800000] hover:bg-[#600000] text-white font-bold py-3"
            size="large"
            icon={Send}
          >
            Submit Report
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SubmitCleaning;