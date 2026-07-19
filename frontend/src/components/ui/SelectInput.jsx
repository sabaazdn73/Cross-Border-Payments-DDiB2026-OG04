import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const SelectInput = forwardRef(function SelectInput({ label, error, id, required, options = [], placeholder, className = '', ...props }, ref) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-ink">
          {label}{required && <span className="text-danger-400 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <select ref={ref} id={id}
          className={`form-input appearance-none pr-10 ${error ? 'error' : ''} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required} {...props}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt} className="bg-surface text-ink">
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" aria-hidden="true" />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger-400 flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
});

export default SelectInput;
