import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { MessageSquare, Image as ImageIcon, Calendar, MessageCircle, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  LoadingSpinner,
  StatusBadge,
  Modal
} from '../../components/common';
import { issueService } from '../../services';

const issueTypeLabels = {
  'cleaning-quality': 'Poor Cleaning Quality',
  'worker-behavior': 'Worker Behavior',
  'missed-cleaning': 'Missed Cleaning Schedule',
  'equipment': 'Equipment/Supplies Issue',
  'bathroom': 'Bathroom Issue',
  'corridor': 'Corridor/Common Area Issue',
  'other': 'Other',
};

const MyIssues = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      // Mock data for demonstration
      setIssues([
        {
          _id: '1',
          issueType: 'cleaning-quality',
          description: 'The bathroom was not cleaned properly. There were still stains on the floor and the toilet was not sanitized.',
          status: 'in-progress',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
          adminComment: 'We are looking into this issue. A supervisor will inspect your bathroom today.',
          createdAt: '2025-11-26T10:30:00Z',
        },
        {
          _id: '2',
          issueType: 'missed-cleaning',
          description: 'The scheduled cleaning on Monday was completely missed. No worker came to clean my room.',
          status: 'open',
          image: null,
          adminComment: null,
          createdAt: '2025-11-25T14:15:00Z',
        },
        {
          _id: '3',
          issueType: 'equipment',
          description: 'The cleaning supplies used have a very strong chemical smell that causes headaches.',
          status: 'resolved',
          image: null,
          adminComment: 'We have switched to eco-friendly cleaning products. Please let us know if the issue persists.',
          createdAt: '2025-11-20T09:00:00Z',
        },
        {
          _id: '4',
          issueType: 'worker-behavior',
          description: 'The cleaning worker was very rude and did not listen to my requests.',
          status: 'closed',
          image: null,
          adminComment: 'We have addressed this with the worker. Thank you for bringing this to our attention.',
          createdAt: '2025-11-15T11:45:00Z',
        },
      ]);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">
          My Issues
        </h1>
        <p className="text-slate-600">
          Track and manage your reported issues
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Open', count: issues.filter(i => i.status === 'open').length, color: 'red' },
          { label: 'In Progress', count: issues.filter(i => i.status === 'in-progress').length, color: 'yellow' },
          { label: 'Resolved', count: issues.filter(i => i.status === 'resolved').length, color: 'emerald' },
          { label: 'Closed', count: issues.filter(i => i.status === 'closed').length, color: 'slate' },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 text-center border-slate-200 bg-white">
            <p className={`text-2xl font-bold text-${stat.color}-500`}>{stat.count}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Issues List */}
      {issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map((issue) => (
            <Card key={issue._id} className="p-6 border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 text-xs font-medium bg-[#800000]/10 text-[#800000] rounded-full border border-[#800000]/10">
                        {issueTypeLabels[issue.issueType] || issue.issueType}
                      </span>
                      <StatusBadge status={issue.status} />
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(issue.createdAt), 'MMM d, yyyy • h:mm a')}
                    </div>
                  </div>

                  {issue.image && (
                    <button
                      onClick={() => setSelectedImage(issue.image)}
                      className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group"
                    >
                      <img
                        src={issue.image}
                        alt="Issue"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-white" />
                      </div>
                    </button>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-700">
                  {issue.description}
                </p>

                {/* Admin Comment */}
                {issue.adminComment && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-[#800000]" />
                      <span className="text-sm font-medium text-[#800000] font-serif">Admin Response</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {issue.adminComment}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center border-slate-200 bg-white">
          <div className="p-4 bg-slate-100 rounded-full w-fit mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2 font-serif">
            No Issues Yet
          </h3>
          <p className="text-slate-500">
            You haven't reported any issues. If you face any problems with cleaning services, feel free to raise an issue.
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
            alt="Issue"
            className="w-full h-auto rounded-xl"
          />
        )}
      </Modal>
    </div>
  );
};

export default MyIssues;
