export default function Logo({ className = '', isDark = false, showDot = true }) {
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const dotColor = isDark ? 'text-neutral-400' : 'text-neutral-900';

  return (
    <span
      className={`font-heading font-extrabold tracking-tight select-none inline-flex items-baseline ${textColor} ${className}`}
      style={{ letterSpacing: '-0.04em' }}
    >
      <span>maztaa</span>
      {showDot && <span className={dotColor}>.</span>}
    </span>
  );
}

export function LogoIcon({ className = 'w-7 h-7', isDark = false }) {
  const bg = isDark ? 'bg-white text-black' : 'bg-black text-white';
  return (
    <div className={`${className} rounded-lg flex items-center justify-center font-heading font-extrabold text-sm ${bg}`}>
      m.
    </div>
  );
}
