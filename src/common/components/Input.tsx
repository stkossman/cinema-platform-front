import { type InputHTMLAttributes, forwardRef } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className='space-y-2'>
        {label && (
          <label className='text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] ml-1'>
            {label}
          </label>
        )}
        <input
          className={cn(
            'flex h-12 w-full rounded-xl border border-white/10 bg-[var(--bg-main)] px-4 py-2 text-sm text-white shadow-sm transition-all duration-200',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-[var(--text-muted)]/50',
            'focus-visible:border-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error &&
              'border-[var(--color-error)] focus-visible:ring-[var(--color-error)] text-[var(--color-error)] placeholder:text-[var(--color-error)]/50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className='text-xs font-medium text-[var(--color-error)] ml-1 animate-in slide-in-from-top-1'>
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
export default Input
