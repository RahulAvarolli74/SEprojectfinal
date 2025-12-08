const StatCard = ({ 
  label, 
  value, 
  icon: Icon, 
  color = 'violet',
  change,
  changeType,
  suffix,
}) => {
  const colorClasses = {
    violet: {
      bg: 'bg-violet-500/20',
      text: 'text-violet-400',
    },
    emerald: {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-400',
    },
    blue: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-400',
    },
    amber: {
      bg: 'bg-amber-500/20',
      text: 'text-amber-400',
    },
    red: {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
    },
  };

  return (
    <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">
            {value}
            {suffix && (
              <span className="text-sm font-normal text-slate-500 ml-2">
                {suffix}
              </span>
            )}
          </p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              changeType === 'up' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              <span>{change}</span>
              <span className="text-slate-500">vs last period</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colorClasses[color]?.bg || colorClasses.violet.bg}`}>
            <Icon className={`w-6 h-6 ${colorClasses[color]?.text || colorClasses.violet.text}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
