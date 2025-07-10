import { cn } from '@/lib'
import { cva, type VariantProps } from 'class-variance-authority'

const headingVariants = cva('font-romeliosans', {
  variants: {
    variant: {
      primary: 'text-primary',
      'primary-50': 'text-primary-50',
      'primary-100': 'text-primary-100',
      'primary-200': 'text-primary-200',
      'primary-300': 'text-primary-300',
      'primary-400': 'text-primary-400',
      'primary-500': 'text-primary-500',
      'primary-600': 'text-primary-600',
      'primary-700': 'text-primary-700',
      'primary-800': 'text-primary-800',
      'primary-900': 'text-primary-900',

      secondary: 'text-primary',
      'secondary-50': 'text-primary-50',
      'secondary-100': 'text-primary-100',
      'secondary-200': 'text-primary-200',
      'secondary-300': 'text-primary-300',
      'secondary-400': 'text-primary-400',
      'secondary-500': 'text-primary-500',
      'secondary-600': 'text-primary-600',
      'secondary-700': 'text-primary-700',
      'secondary-800': 'text-primary-800',
      'secondary-900': 'text-primary-900',

      'border-100': 'text-border-100',
      'border-200': 'text-border-200',
      'border-300': 'text-border-300',

      'body-50': 'text-body-50',
      'body-100': 'text-body-100',
      'body-200': 'text-body-200',
      'body-300': 'text-body-300',
      'body-400': 'text-body-400',

      'background-50': 'text-background-50',
      'background-100': 'text-background-100',
      'background-200': 'text-background-200',
      'background-300': 'text-background-300',
      'background-400': 'text-background-400',

      'icon-500': 'text-icon-500',
      'icon-600': 'text-icon-600',
      'icon-700': 'text-icon-700',
      'icon-800': 'text-icon-800',

      'neutral-100': 'text-neutral-100',
      'neutral-300': 'text-neutral-300',
      'neutral-500': 'text-neutral-500',
      'neutral-900': 'text-neutral-900',

      success: 'text-success',
      'success-light': 'text-success-light',
      'success-dark': 'text-success-dark',

      error: 'text-error',
      'error-light': 'text-error-light',
      'error-dark': 'text-error-dark',

      warning: 'text-warning',
      'warning-light': 'text-warning-light',
      'warning-dark': 'text-warning-dark',

      info: 'text-info',
      'info-light': 'text-info-light',
      'info-dark': 'text-info-dark',
    },
  },
})

interface LargeHeadingItemProps {
  h1?: string
  h2?: string
  h3?: string
  h4?: string
  h5?: string
  h6?: string
  span?: string
}

export interface LargeHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: keyof LargeHeadingItemProps
}

export const LargeHeading = ({
  className,
  as: Component = 'h1',
  children,
  variant,
  ...props
}: LargeHeadingProps) => {
  return (
    <Component
      {...props}
      className={cn(headingVariants({ variant, className }), {
        'text-size-heading-1-mb sm:text-size-heading-1-ds': Component === 'h1',
        'text-size-heading-2-mb sm:text-size-heading-2-ds': Component === 'h2',
        'text-size-heading-3-mb sm:text-size-heading-3-ds': Component === 'h3',
        'text-size-heading-4-mb sm:text-size-heading-4-ds':
          Component === 'h4' || Component === 'span',
        'text-size-heading-5-mb sm:text-size-heading-5-ds': Component === 'h5',
        'text-size-heading-6-mb sm:text-size-heading-6-ds': Component === 'h6',
      })}
    >
      {children}
    </Component>
  )
}
