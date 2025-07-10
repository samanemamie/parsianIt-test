import { cn } from '@/lib'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader } from 'lucide-react'
import type { ReactNode } from 'react'
import * as React from 'react'

const buttonVariants = cva(
  [
    'group relative flex w-auto items-center justify-center gap-2 duration-300 outline-none select-none focus:outline-none disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        default: [
          'rounded-50 bg-gray-300 !text-gray-800',
          'hover:bg-gray-400', //hover
          'focus:bg-info-disable', //focus
          'disabled:bg-gray-200 disabled:!text-gray-400', //disabled
        ],
        outline: [
          'rounded-50 border border-gray-400 bg-transparent !text-gray-800',
          'hover:bg-gray-400', //hover
          'focus:bg-info-disable', //focus
          'disabled:border-gray-200 disabled:!text-gray-400', //disabled
        ],

        none: [],
      },
      color: {
        error: ['bg-error-light text-error'],
        success: ['bg-success-light text-success'],
        info: ['bg-info-light text-info'],
        secondary: ['bg-[#449187]'],
      },
      size: {
        default: 'text-button-sm-mb sm:text-button-sm-ds h-10 px-6',
        sm: 'text-button-sm-mb sm:text-button-sm-ds h-10 px-3',
        md: 'text-button-md-mb sm:text-button-md-ds h-10 px-3',
        lg: 'text-button-lg-mb sm:text-button-lg-ds h-10 px-3',
        full: 'text-button-lg-mb sm:text-button-lg-ds h-10 w-full px-3',
        none: [],
      },
    },
    compoundVariants: [
      { variant: 'default', color: 'secondary', className: '!text-gray-50' },
      { variant: 'default', className: 'transition-none' },
      { variant: 'none', className: 'cursor-pointer p-0' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loader?: ReactNode
  loadingClassNames?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      loadingClassNames,
      loader,
      loading,
      variant,
      size,
      color,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            color,
            className: cn(className, {
              'loading pointer-events-none after:content-[""] hover:after:content-[""] [&>*]:invisible':
                loading,
            }),
          })
        )}
        ref={ref}
        {...props}
      >
        <div className="contents">{children}</div>
        <div className="invisible absolute inset-0 flex items-center justify-center group-[.loading]:!visible">
          {loader ? loader : <Loader className={cn('w-7 !text-gray-800', loadingClassNames)} />}
        </div>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
