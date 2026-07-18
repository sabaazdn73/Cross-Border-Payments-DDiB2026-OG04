export default function SecondaryButton({ children, onClick, type = 'button', disabled = false, className = '', size = 'md', ...props }) {
  const sizeClasses = { sm: 'text-sm py-2 px-4', md: 'text-sm py-3 px-6', lg: 'text-base py-4 px-8' };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`btn-secondary ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
