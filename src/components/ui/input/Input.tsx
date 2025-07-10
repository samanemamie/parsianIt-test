import { Paragraph } from '@/components'
import { cn } from '@/lib'
import { cva, type VariantProps } from 'class-variance-authority'
import { LucideEye, LucideEyeOff } from 'lucide-react'
import React, { type ReactElement, useEffect, useId, useState } from 'react'

export const inputVariants = cva(
  [
    'box-border overflow-hidden',
    'group rounded-50 flex outline-none', //temporary
    'relative w-auto bg-white',
    '!text-input-mb lg:!text-input-ds border-2 text-gray-900 placeholder-gray-300 [&>input]:text-gray-900', //override
    '[&>input]:placeholder-gray-300',
  ],
  {
    variants: {
      color: {
        error: ['border-red-500'],
        success: [
          'success border-success',
          'focus-within:border-success text-gray-600', //override
        ],
        default: [
          'text-gray-600 shadow-black/5',
          'border-gray-200 focus-within:border-gray-400', //override
          'disabled:[&>input]:opacity-50 disabled:[&>input]:select-none',
        ],
      },
      variant: {
        default: ['focus-within:border-2'],
        value_center: ['[&>input]:!text-primary [&>input]:text-title-md-ds [&>input]:text-center'],
      },
      size: {
        default: ['text-input h-[46px]'],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      color: 'default',
    },
  }
)

type TInputProps = {
  visiblePassword?: 'prefix' | 'suffix'
  prefixIcon?: ReactElement
  suffixIcon?: ReactElement
  mask?: string
  debouncing?: boolean
  value?: string | number
  onChange: (value: string | number) => void
} & Omit<React.ComponentProps<'input'>, 'onChange'> &
  VariantProps<typeof inputVariants>

export default function Input({
  type: Type,
  className,
  prefixIcon,
  suffixIcon,
  visiblePassword,
  color,
  id,
  value: initialValue = '',
  onChange,
  debouncing = false,
  variant,
  disabled,
  ...props
}: TInputProps) {
  const _id = useId()
  id = id || _id
  const [isVisible, setIsVisible] = useState(false)
  const [type] = useState(() => Type)
  const inputClassNames = inputVariants({ color, variant })
  const [value, setValue] = useState<string | number>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const PasswordToggle = (
    <IconBox onClick={() => setIsVisible((p) => !p)} role="button">
      {isVisible ? <LucideEyeOff /> : <LucideEye />}
    </IconBox>
  )
  const PrefixIcon =
    visiblePassword === 'prefix'
      ? PasswordToggle
      : prefixIcon && <IconBox htmlFor={id}>{prefixIcon}</IconBox>

  const SuffixIcon =
    visiblePassword === 'suffix'
      ? PasswordToggle
      : suffixIcon && <IconBox htmlFor={id}>{suffixIcon}</IconBox>

  return (
    <div
      className={cn(
        inputClassNames,
        className,
        { disabled: disabled },
        { prefix: !!PrefixIcon, suffix: !!SuffixIcon }
      )}
    >
      {PrefixIcon}
      <input
        disabled={disabled}
        id={id}
        type={isVisible ? (type === 'password' ? 'text' : type) : type}
        className={cn([
          'w-full border-none px-3 outline-none',
          'bg-transparent',
          {
            'ps-0': !!PrefixIcon,
            'pe-0': !!SuffixIcon,
          },
          {
            'z-10 w-full py-0.5 opacity-0': type == 'color',
          },
        ])}
        {...props}
        onChange={(e) => {
          setValue(e.target.value)
          onChange?.(e.target.value)
        }}
        value={value}
      />
      {SuffixIcon}

      {type == 'color' && <ColorBox value={value as string} />}
    </div>
  )
}

function IconBox({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      {...props}
      className={cn(
        'flex h-full w-12 flex-shrink-0 items-center justify-center text-gray-700',
        className
      )}
    />
  )
}

function ColorBox({ className, value, ...props }: React.ComponentProps<'div'> & { value: string }) {
  const defultColor = '#000000'

  const [currentColor, setCurrentColor] = useState(defultColor)

  useEffect(() => {
    if (value) {
      setCurrentColor(value)
    }
  }, [value])

  return (
    <div
      {...props}
      className={cn(
        'absolute inset-0 start-2 flex w-full items-center justify-start gap-2',
        className
      )}
    >
      <div className={cn('size-8 py-0.5')} style={{ backgroundColor: currentColor }} />
      <Paragraph dir="ltr">{value ? value : defultColor}</Paragraph>
    </div>
  )
}
