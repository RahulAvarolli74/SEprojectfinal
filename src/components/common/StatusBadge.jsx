const StatusBadge = ({ status }) => {
  const statusConfig = {
    open: {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/30',
      label: 'Open',
    },
    'in-progress': {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-400',
      border: 'border-yellow-500/30',
      label: 'In Progress',
    },
    resolved: {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      label: 'Resolved',
    },
    closed: {
      bg: 'bg-slate-500/20',
      text: 'text-slate-400',
      border: 'border-slate-500/30',
      label: 'Closed',
    },
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.open;

  return (
    <span className={`
      inline-flex items-center 
      px-2.5 py-1 
      text-xs font-medium 
      rounded-full 
      border
      ${config.bg} 
      ${config.text}
      ${config.border}
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.text.replace('text-', 'bg-')} mr-1.5`} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
