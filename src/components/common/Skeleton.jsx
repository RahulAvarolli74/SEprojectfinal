const Skeleton = ({ className = '', variant = 'text' }) => {
  const baseClasses = 'animate-pulse bg-slate-800/50 rounded';
  
  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full rounded-xl',
    button: 'h-10 w-24 rounded-lg',
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export const CardSkeleton = () => (
  <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton variant="title" className="w-1/3" />
      <Skeleton variant="avatar" className="w-12 h-12" />
    </div>
    <Skeleton className="w-1/2" />
    <Skeleton className="w-3/4" />
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton className="flex-1" />
        <Skeleton className="flex-1" />
        <Skeleton className="flex-1" />
        <Skeleton className="w-20" />
      </div>
    ))}
  </div>
);

export default Skeleton;
