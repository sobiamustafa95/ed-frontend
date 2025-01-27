import { cn } from '@/lib/utils';

interface ITypography {
  children: React.ReactNode;
  className?: string;
  variant?: 'sm' | 'md' | 'p' | 'xl' | 'title' | 'heading' | 'subheading';
}

export const Typography = ({
  variant = 'md',
  className,
  children,
}: ITypography) => (
  <span
    className={cn(
      'text-primaryBlack',
      {
        'text-xs font-normal': variant === 'sm',
        'text-sm font-normal': variant === 'md',
        'text-sm xl:text-base font-normal leading-[27px]': variant === 'p',
        'text-xl font-bold leading-[44px]': variant === 'xl',
        'text-[22px] font-semibold leading-8': variant === 'subheading',
        'text-xl xl:text-[28px] font-semibold leading-10':
          variant === 'heading',
        'text-2xl xl:text-3xl 2xl:text-[32px] font-semibold leading-tight':
          variant === 'title',
      },
      className,
    )}
  >
    {children}
  </span>
);
