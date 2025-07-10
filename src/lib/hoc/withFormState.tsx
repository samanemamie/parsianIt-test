import { useFormField } from '@/components/ui/form/Form'
import * as React from 'react'

type SupportedFormInput = object

export const withFormState = <P extends object>(
  Component: React.FC<P & { color: 'error' | 'default' | string | null | undefined }>
): React.FC<P & SupportedFormInput> => {
  return function WithFormState({ ...props }: SupportedFormInput) {
    const { error } = useFormField()
    return <Component color={error ? 'error' : 'default'} {...(props as P)} />
  }
}
