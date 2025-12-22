import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { KeyRound, Save, Building2 } from 'lucide-react';
import {
  Card,
  Button,
  Input,
  LoadingSpinner
} from '../../components/common';
import { roomService } from '../../services';

const schema = z.object({
  room_no: z.string().min(1, 'Room number is required').transform(val => val.toUpperCase()),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const CreateRoom = () => {
  const [loading, setLoading] = useState(false);

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
      await roomService.createRoom(data);
      toast.success(`Room ${data.room_no} created successfully!`);
      reset();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Failed to create room';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">
            Create Student Room
          </h1>
          <p className="text-slate-500">
            Generate login credentials for a new room
          </p>
        </div>
      </div>

      <Card className="p-8 bg-white border-slate-200 shadow-md">
        <div className="mb-8 flex items-center justify-center">
          <div className="p-4 bg-violet-50 rounded-full">
            <Building2 className="w-12 h-12 text-violet-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Input
              label="Room Number"
              placeholder="e.g. 101A"
              icon={Building2}
              error={errors.room_no?.message}
              {...register('room_no')}
              className="bg-white border-slate-200 text-slate-900 uppercase"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Set a password"
              icon={KeyRound}
              error={errors.password?.message}
              {...register('password')}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              loading={loading}
              className="w-full bg-[#800000] hover:bg-[#600000] text-white py-3 font-bold"
              size="large"
              icon={Save}
            >
              Create Room
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateRoom;