import { forwardRef } from 'react';

const FormInput = forwardRef(function FormInput({ label, error, id, required, hint, className = '', ...props }, ref) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-white/80">
          {label}{required && <span className="text-danger-400 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <input ref={ref} id={id} className={`form-input ${error ? 'error' : ''} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        required={required} {...props} />
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-white/40">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger-400 flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
});

export default FormInput;
