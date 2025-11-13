import * as React from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

interface StepperProps
  extends Omit<
    React.HTMLAttributes<HTMLSpanElement>,
    'className' | 'onChange'
  > {
  className?: string; // applied to outer div
  label?: string;
  value: number;
  onChange: (value: number) => void;
}

const Stepper = React.forwardRef<HTMLSpanElement, StepperProps>(
  ({ className, label, onChange, value, ...props }, ref) => {
    return (
      <div
        className={cn(
          'border-input bg-background flex h-10 min-w-[150px] items-center justify-between gap-1 rounded-md border py-2 text-sm',
          className,
        )}
      >
        <Button
          type='button'
          disabled={value === 0}
          variant='link'
          onClick={() => onChange(value - 1)}
        >
          -
        </Button>
        <span
          className={cn(!value && 'text-muted-foreground truncate')}
          ref={ref}
          {...props}
        >
          {value} {label}
          {value > 1 || value === 0 ? 's' : ''}
        </span>
        <Button
          type='button'
          disabled={value === 100}
          variant='link'
          onClick={() => onChange(value + 1)}
        >
          +
        </Button>
      </div>
    );
  },
);

Stepper.displayName = 'Stepper';

export { Stepper };
