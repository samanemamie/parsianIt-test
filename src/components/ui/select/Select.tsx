import { cn } from '@/lib/utils'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cva, type VariantProps } from 'class-variance-authority'
import { LucideCheck, LucideChevronDown, LucideChevronUp } from 'lucide-react'
import * as React from 'react'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const selectTrigger = cva(
  [
    'group text-input-mb lg:text-input-ds relative w-full overflow-hidden bg-white outline-none',
    'flex items-center justify-between placeholder:text-gray-100 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    'border', //override
  ],
  {
    variants: {
      variant: {
        default: ['rounded-50 border-2 data-[placeholder]:text-gray-300'],
      },
      color: {
        error: 'border-red-500',
        success: 'border-success',
        default: 'border-gray-200',
        none: 'border-transparent',
      },
      size: {
        lg: 'h-[46px] px-3',
      },
    },
    defaultVariants: {
      color: 'default',
      size: 'lg',
      variant: 'default',
    },
  }
)

const SelectTrigger = ({
  color,
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & VariantProps<typeof selectTrigger>) => {
  const selectTriggerClassNames = selectTrigger({ color })
  return (
    <SelectPrimitive.Trigger className={cn(selectTriggerClassNames, className)} {...props}>
      <SelectPrimitive.Icon asChild>
        <LucideChevronDown className="size-[22px] duration-200 group-data-[state=open]:-rotate-180" />
      </SelectPrimitive.Icon>
      {children}
    </SelectPrimitive.Trigger>
  )
}

const SelectScrollUpButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => (
  <SelectPrimitive.ScrollUpButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <LucideChevronUp className="size-4" />
  </SelectPrimitive.ScrollUpButton>
)

const SelectScrollDownButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => (
  <SelectPrimitive.ScrollDownButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <LucideChevronDown className="size-4" />
  </SelectPrimitive.ScrollDownButton>
)

const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-50 relative z-50 max-h-96 min-w-[8rem] overflow-hidden border bg-gray-50 text-gray-800',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        //overrides
        '!rounded-100 w-[calc(100%-0.25rem)] border-2 border-gray-200 px-0 py-0 shadow-none',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          //override
          'p-0'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)

const SelectLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label
    className={cn('py-1.5 pr-2 pl-8 text-sm font-semibold', className)}
    {...props}
  />
)

const SelectItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    className={cn(
      'w-ful relative flex cursor-default items-center justify-end rounded-sm py-1.5 pe-4 text-sm outline-none select-none focus:bg-gray-300 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      //overrides
      'text-desk-input h-10',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <LucideCheck className="size-5" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)

const SelectSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
)

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
