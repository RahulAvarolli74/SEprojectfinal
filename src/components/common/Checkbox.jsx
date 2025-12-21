import { Check } from 'lucide-react';

const Checkbox = ({
  label,
  checked,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div className={`
          w-5 h-5 
          rounded-md 
          border-2 
          transition-all duration-300
          flex items-center justify-center
          ${checked
            ? 'bg-violet-600 border-violet-600'
            : 'bg-white border-slate-300 group-hover:border-violet-500/50'
          }
        `}>
          {checked && (
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          )}
        </div>
      </div>
      {label && (
        <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
