import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import {
  AlertTriangle,
  Calendar,
  Home,
  Filter,
  Image as ImageIcon,
  Search,
  MessageCircle,
  Eye
} from 'lucide-react';
import {
  Card,
  Button,
  Select,
  Input,
  Textarea,
  LoadingSpinner,
  Modal,
  StatusBadge
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

const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const IssueManagement = () => {
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    room: '',
    startDate: '',
    endDate: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await issueService.getAllIssues(filters);
      // response is ApiRes. data might be { issues: [] } or just []
      // Checking issue.controller.js -> getAllIssues
      // It returns new ApiRes(200, issues, "...")
      // So response.data IS the array of issues.
      const fetchedIssues = response.data || [];
      setIssues(fetchedIssues);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      room: '',
      startDate: '',
      endDate: '',
    });
  };

  const openIssueModal = (issue) => {
    setSelectedIssue(issue);
    setNewStatus(issue.status);
    setComment(issue.adminComment || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedIssue(null);
    setIsModalOpen(false);
    setComment('');
    setNewStatus('');
  };

  const handleUpdateIssue = async () => {
    if (!selectedIssue) return;

    setSubmitting(true);
    try {
      await issueService.resolveIssue(selectedIssue._id, newStatus, comment);

      // Update local state to reflect change
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === selectedIssue._id
            ? { ...issue, status: newStatus, adminComment: comment }
            : issue
        )
      );
      toast.success('Issue updated successfully');
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update issue');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    if (filters.status && issue.status !== filters.status) return false;
    if (filters.room && !issue.room.number.toLowerCase().includes(filters.room.toLowerCase())) return false;
    if (filters.startDate && new Date(issue.createdAt) < new Date(filters.startDate)) return false;
    if (filters.endDate && new Date(issue.createdAt) > new Date(filters.endDate)) return false;
    return true;
  });

  const stats = [
    { label: 'Open', count: issues.filter(i => i.status === 'open').length, color: 'text-red-400' },
    { label: 'In Progress', count: issues.filter(i => i.status === 'in-progress').length, color: 'text-yellow-400' },
    { label: 'Resolved', count: issues.filter(i => i.status === 'resolved').length, color: 'text-emerald-400' },
    { label: 'Closed', count: issues.filter(i => i.status === 'closed').length, color: 'text-slate-400' },
  ];

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
            Issue Management
          </h1>
          <p className="text-slate-500">
            Review and manage student-reported issues
          </p>
        </div>
        <Button
          variant="secondary"
          icon={Filter}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 text-center bg-white border-slate-200 shadow-sm">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </Card>
        ))}
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
              placeholder="All Statuses"
              options={statusOptions}
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
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

      {/* Issues List */}
      {filteredIssues.length > 0 ? (
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <Card key={issue._id} className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow" hover>
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Issue Image */}
                {issue.image && (
                  <div className="w-full lg:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                    <img
                      src={issue.image}
                      alt="Issue"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-lg border border-violet-100">
                      Room {issue.room.number}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-sm rounded-lg border border-slate-200">
                      {issueTypeLabels[issue.issueType] || issue.issueType}
                    </span>
                    <StatusBadge status={issue.status} />
                  </div>

                  <p className="text-slate-700 mb-2 line-clamp-2">
                    {issue.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(issue.createdAt), 'MMM d, yyyy • h:mm a')}
                  </div>

                  {issue.adminComment && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-emerald-600 mb-1">
                        <MessageCircle className="w-4 h-4" />
                        Admin Comment
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {issue.adminComment}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action */}
                <div className="flex lg:flex-col gap-2">
                  <Button
                    variant="secondary"
                    size="small"
                    icon={Eye}
                    onClick={() => openIssueModal(issue)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-white border-slate-200 shadow-sm">
          <div className="p-4 bg-slate-50 rounded-full w-fit mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Issues Found
          </h3>
          <p className="text-slate-400">
            {issues.length === 0
              ? 'No issues have been reported yet.'
              : 'No issues match your current filters.'}
          </p>
        </Card>
      )}

      {/* Issue Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Issue Details"
        size="large"
      >
        {selectedIssue && (
          <div className="space-y-6">
            {/* Issue Info */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-lg border border-violet-100">
                Room {selectedIssue.room.number}
              </span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-sm rounded-lg border border-slate-200">
                {issueTypeLabels[selectedIssue.issueType] || selectedIssue.issueType}
              </span>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <p className="text-slate-600 p-4 bg-slate-50 rounded-xl border border-slate-100">
                {selectedIssue.description}
              </p>
            </div>

            {/* Image */}
            {selectedIssue.image && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Attached Image
                </label>
                <img
                  src={selectedIssue.image}
                  alt="Issue"
                  className="w-full max-h-64 object-cover rounded-xl"
                />
              </div>
            )}

            {/* Status Update */}
            <Select
              label="Status"
              options={statusOptions}
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />

            {/* Admin Comment */}
            <Textarea
              label="Admin Comment"
              placeholder="Add a comment or response..."
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Actions */}
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
                onClick={handleUpdateIssue}
                loading={submitting}
                className="flex-1"
              >
                Update Issue
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default IssueManagement;
