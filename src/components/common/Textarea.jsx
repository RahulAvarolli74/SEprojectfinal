import { forwardRef } from 'react';

const Textarea = forwardRef(({ 
  label, 
  error, 
  className = '',
  rows = 4,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-3 
          bg-slate-800/50 
          border border-slate-700/50 
          rounded-xl 
          text-white 
          placeholder-slate-500
          focus:outline-none 
          focus:ring-2 
          focus:ring-violet-500/50 
          focus:border-violet-500/50
          transition-all 
          duration-300
          resize-none
          ${error ? 'border-red-500/50 focus:ring-red-500/50' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
