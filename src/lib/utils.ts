import type { AxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

//TODO:add shadow | rounded | font-weight | font-size

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: ['shadow-menu', 'shadow-button'],
      rounded: ['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-40'],
      'font-size': [
        {
          text: ['text-body-sm', 'text-button-md'],
        },
      ],
    },
  },
})

export function generateRandomId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`
}

export const commaGenerator = (e: string | number): string[] => {
  const value = typeof e === 'string' ? e : ''
  return value
    .replace(/\s+/g, ',')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getErrorMessage = (error: AxiosError<any>): ErrorMessageInterface[] => {
  if (error.response?.data && 'messages' in error.response?.data)
    return error.response?.data['messages'] as ErrorMessageInterface[]
  return []
}

export function getValidationRules({
  isRequired,
  min,
  max,
}: {
  isRequired?: boolean
  min?: number
  max?: number
}) {
  return {
    required: isRequired ? 'اینپوت خالی است' : false,
    min:
      min !== undefined
        ? {
            value: min,
            message: `کمترین مقدار: ${min}`,
          }
        : undefined,
    max:
      max !== undefined
        ? {
            value: max,
            message: `بیشترین مقدار: ${max}`,
          }
        : undefined,
  }
}

export function getValidationProps(field: {
  inputValidatorType?: string[]
  inputMinValue?: number
  inputMaxValue?: number
  inputLabel: string
}) {
  return {
    isRequired: field.inputValidatorType?.includes('empty'),
    min: field.inputValidatorType?.includes('min') ? field.inputMinValue : undefined,
    max: field.inputValidatorType?.includes('max') ? field.inputMaxValue : undefined,
    name: field.inputLabel,
  }
}

export type Mapped<T extends string | number | symbol, U = string> = {
  [Props in T]: U
}

export const searchTrimer = (searchTerm: string) => {
  return searchTerm.trim().toLowerCase()
}

interface ErrorMessageInterface {
  flag: 'error' | 'warning' | 'info'
  message: string
}
