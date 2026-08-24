import { ChevronRight } from 'lucide-react';

export default function Button({
  children,
  href,
  onClick,
  className = '',
  id,
  type = 'button',
  variant = 'primary', // 'primary', 'ghost', 'dark'
  showArrow = true,
  disabled = false,
}) {
  const content = (
    <>
      <span className="font-heading font-semibold tracking-tight text-[15px]">{children}</span>
      {showArrow && (
        <div
          className={[
            'w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0',
            variant === 'dark' ? 'bg-white text-black' : 'bg-[#111317] text-white',
          ].join(' ')}
        >
          <ChevronRight size={15} strokeWidth={2.5} className="text-[#a5b4fc]" />
        </div>
      )}
    </>
  );

  const baseClasses = [
    'btn-micro1 group rounded-xl',
    variant === 'dark'
      ? 'bg-[#111317] text-white border-black hover:bg-neutral-800'
      : 'bg-white text-[#111317] border-black/[0.08] hover:bg-[#e9eef6]',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ].join(' ');

  if (href) {
    return (
      <a href={href} className={baseClasses} id={id}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses} id={id} disabled={disabled}>
      {content}
    </button>
  );
}
