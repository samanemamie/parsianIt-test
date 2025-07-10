import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import React from 'react'

export const paragraphVariants = cva('inline-flex items-center gap-2', {
  variants: {
    variant: {
      background: 'text-background',

      primary: 'text-primary',
      primary_light: 'text-primary-light',
      primary_dark: 'text-primary-dark',

      secondary: 'text-secondary',
      secondary_light: 'text-secondary-light',
      secondary_dark: 'text-secondary-dark',

      warning: 'text-warning',
      warning_light: 'text-warning-light',
      warning_dark: 'text-warning-dark',

      danger: 'text-danger',
      danger_light: 'text-danger-light',
      danger_dark: 'text-danger-dark',

      info: 'text-info',
      info_light: 'text-info-light',
      info_disable: 'text-info-disable',

      'gray-50': 'text-gray-50',
      'gray-100': 'text-gray-100',
      'gray-200': 'text-gray-200',
      'gray-300': 'text-gray-300',
      'gray-400': 'text-gray-400',
      'gray-500': 'text-gray-500',
      'gray-600': 'text-gray-600',
      'gray-700': 'text-gray-700',
      'gray-800': 'text-gray-800',
      'gray-900': 'text-gray-900',
    },
    size: {
      'heading-1': 'text-heading-1-mb sm:text-heading-1-ds',
      'heading-2': 'text-heading-2-mb sm:text-heading-2-ds',
      'heading-3': 'text-heading-3-mb sm:text-heading-3-ds',
      'heading-4': 'text-heading-4-mb sm:text-heading-4-ds',
      'heading-5': 'text-heading-5-mb sm:text-heading-5-ds',
      'heading-6': 'text-heading-6-mb sm:text-heading-6-ds',
      'title-lg': 'text-title-lg-mb sm:text-title-lg-ds',
      'title-md': 'text-title-md-mb sm:text-title-md-ds',
      'title-sm': 'text-title-sm-mb sm:text-title-sm-ds',
      'body-lg': 'text-body-lg-mb sm:text-body-lg-ds',
      'body-sm': 'text-body-sm-mb sm:text-body-sm-ds',
      'button-lg': 'text-button-lg-mb sm:text-button-lg-ds',
      'button-md': 'text-button-md-mb sm:text-button-md-ds',
      'button-sm': 'text-button-sm-mb sm:text-button-sm-ds',
      label: 'text-label-mb sm:text-label-ds',
      input: 'text-input-mb sm:text-input-ds',
      caption: 'text-caption-mb sm:text-caption-ds',
    },
  },
})

export interface ParagraphProps
  extends React.ComponentProps<'p'>,
    VariantProps<typeof paragraphVariants> {
  span?: boolean
}

export const Paragraph = ({
  children,
  className,
  size,
  variant,
  span,
  ...props
}: ParagraphProps) => {
  const Comp = span ? 'span' : 'p'

  return (
    <Comp {...props} className={clsx(paragraphVariants({ size, className, variant }))}>
      {children}
    </Comp>
  )
}
