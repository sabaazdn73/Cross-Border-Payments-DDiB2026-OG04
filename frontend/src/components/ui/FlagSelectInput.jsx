import * as Select from '@radix-ui/react-select';
import { forwardRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import 'flag-icons/css/flag-icons.min.css';

/**
 * A country/currency select that shows a REAL flag icon (SVG, via the
 * flag-icons library) rather than a flag emoji. Emoji flags depend on
 * the operating system shipping a font with those glyphs — Windows
 * and some Android builds don't, and render the two-letter country
 * code as plain text instead of a flag. An SVG-based icon renders
 * identically everywhere, which is what "the same experience for
 * everyone" actually requires here, not just on the devices we
 * happened to test on.
 *
 * Built on Radix's unstyled Select primitive rather than the native
 * <select> specifically because a native <option> can only contain
 * plain text — it structurally cannot show an icon. Radix renders
 * its own list, so each row can carry both the flag and the label.
 *
 * Wire this up via react-hook-form's <Controller>, not register(),
 * since Radix Select is a controlled (value/onChange) component.
 */
const FlagSelectInput = forwardRef(function FlagSelectInput(
  { label, error, id, required, options = [], placeholder, value, onChange, onBlur, className = '' },
  ref
) {
  const selected = options.find((o) => o.value === value);

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-ink">
          {label}{required && <span className="text-danger-400 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          ref={ref}
          id={id}
          onBlur={onBlur}
          className={`form-input w-full flex items-center justify-between text-left ${error ? 'error' : ''} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
        >
          <span className="flex items-center gap-2 truncate">
            {selected?.flagCode && (
              <span className={`fi fi-${selected.flagCode.toLowerCase()} rounded-sm shrink-0`} aria-hidden="true" />
            )}
            <Select.Value placeholder={placeholder}>{selected?.label}</Select.Value>
          </span>
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-ink-muted" aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="z-50 overflow-hidden rounded-xl bg-surface border border-hairline shadow-glass"
            position="popper"
            sideOffset={6}
          >
            <Select.Viewport className="p-1 max-h-72">
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink cursor-pointer outline-none data-[highlighted]:bg-brand-500/10 data-[state=checked]:bg-brand-500/5"
                >
                  {opt.flagCode && (
                    <span className={`fi fi-${opt.flagCode.toLowerCase()} rounded-sm shrink-0`} aria-hidden="true" />
                  )}
                  <Select.ItemText>{opt.label}</Select.ItemText>
                  <Select.ItemIndicator className="ml-auto">
                    <Check className="w-3.5 h-3.5 text-brand-500" aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger-400 flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
});

export default FlagSelectInput;
