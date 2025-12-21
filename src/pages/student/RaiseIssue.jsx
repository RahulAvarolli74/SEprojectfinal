import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { AlertTriangle, Send, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Select,
  Textarea,
  ImageUpload
} from '../../components/common';
import { issueService } from '../../services';

const schema = z.object({
  issueType: z.string().min(1, 'Please select an issue type'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

const issueTypes = [
  { value: 'cleaning-quality', label: 'Poor Cleaning Quality' },
  { value: 'worker-behavior', label: 'Worker Behavior' },
  { value: 'missed-cleaning', label: 'Missed Cleaning Schedule' },
  { value: 'equipment', label: 'Equipment/Supplies Issue' },
  { value: 'bathroom', label: 'Bathroom Issue' },
  { value: 'corridor', label: 'Corridor/Common Area Issue' },
  { value: 'other', label: 'Other' },
];

const RaiseIssue = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Backend expects: issueType, description, image (optional)
      // data object from react-hook-form matches this structure.
      await issueService.createIssue(data);
      setSubmitted(true);
      toast.success('Issue reported successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to submit issue');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setImage(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="p-8 text-center border-slate-200 shadow-lg bg-white">
          <div className="p-4 bg-emerald-100 rounded-full w-fit mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">
            Issue Reported!
          </h2>
          <p className="text-slate-600 mb-6">
            Your issue has been submitted successfully. The admin team will review it and take appropriate action.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleReset} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              Report Another Issue
            </Button>
            <Button onClick={() => navigate('/student/my-issues')} className="bg-[#800000] hover:bg-[#600000] text-white">
              View My Issues
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pt-2">
        <button onClick={() => navigate('/student/dashboard')} className="text-slate-500 hover:text-[#800000] flex items-center gap-1 mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">
          Raise an Issue
        </h1>
        <p className="text-slate-600">
          Report a problem with cleaning services
        </p>
      </div>

      {/* Info Banner */}
      <Card className="p-4 border-amber-200 bg-amber-50">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-black text-sm">
              Please provide as much detail as possible to help us resolve your issue quickly.
              You can also upload an image to support your complaint.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-slate-200 shadow-md bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Issue Type */}
          <Select
            label="Issue Type"
            placeholder="Select issue type"
            options={issueTypes}
            error={errors.issueType?.message}
            {...register('issueType')}
            className="bg-white border-slate-200 text-slate-900 focus:border-[#800000] focus:ring-[#800000]"
          />

          {/* Description */}
          <Textarea
            label="Description"
            placeholder="Describe the issue in detail..."
            rows={5}
            error={errors.description?.message}
            {...register('description')}
            className="bg-white border-slate-200 text-slate-900 focus:border-[#800000] focus:ring-[#800000]"
          />

          {/* Image Upload */}
          <ImageUpload
            label="Upload Photo (Optional)"
            value={image}
            onChange={setImage}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            loading={loading}
            className="w-full bg-[#800000] hover:bg-[#600000] text-black font-bold py-3"
            size="large"
            icon={Send}
          >
            Submit Issue
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RaiseIssue;
