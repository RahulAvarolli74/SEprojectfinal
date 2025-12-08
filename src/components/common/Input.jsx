import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-500" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 
            ${Icon ? 'pl-10' : ''} 
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
            ${error ? 'border-red-500/50 focus:ring-red-500/50' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
