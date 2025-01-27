import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { ButtonProps, buttonVariants } from '@/components/ui/button';

import { cn } from 'src/lib/utils';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('flex w-fit justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('cursor-pointer', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  disabled?: boolean;
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  disabled,
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    onClick={(e) => disabled && e.preventDefault()}
    className={cn(
      buttonVariants({
        variant: 'ghost',
        size,
        className: cn('h-8 w-8 text-greyishBlack bg-salt rounded-xl', {
          'bg-primary text-white': isActive,
          'opacity-60': disabled,
          'text-[10px]':
            typeof props?.children === 'number' && props?.children > 999,
        }),
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  disabled,
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    disabled={disabled}
    aria-label='Go to previous page'
    className={className}
    {...props}
  >
    <ChevronLeft className='h-4 w-4 text-greyishBlack' />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  disabled,
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    disabled={disabled}
    aria-label='Go to next page'
    className={className}
    {...props}
  >
    <ChevronRight className='h-4 w-4 text-greyishBlack' />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <div className='h-8 w-8 rounded-[5px] bg-simplyViolet text-sm flex items-end justify-center '>
      <MoreHorizontal className='h-4 w-4 text-greyishBlack' />
    </div>
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
