const Card = ({ 
  children, 
  className = '', 
  hover = false,
  glow = false,
  ...props 
}) => {
  return (
    <div
      className={`
        relative 
        bg-slate-900/50 
        backdrop-blur-xl 
        border border-slate-800/50 
        rounded-2xl 
        overflow-hidden
        ${hover ? 'hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300' : ''}
        ${glow ? 'shadow-lg shadow-violet-500/10' : ''}
        ${className}
      `}
      {...props}
    >
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-purple-500/10 pointer-events-none" />
      )}
      <div className="relative">{children}</div>
    </div>
  );
};

export default Card;
