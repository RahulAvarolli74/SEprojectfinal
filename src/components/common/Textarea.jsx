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
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-3 
          bg-white
          border border-slate-200
          rounded-xl 
          text-slate-900 
          placeholder-slate-400
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#800000]/20
          focus:border-[#800000]
          transition-all 
          duration-300
          resize-none
          ${error ? 'border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
