import { formBuilderSchema, useFormStore, type FormBuilderSchemaFormProps } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function useFormBuilder() {
  const addField = useFormStore((state) => state.addField)

  const form = useForm<FormBuilderSchemaFormProps>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      inputLabel: '',
      inputPlaceholder: '',
      inputType: undefined,
      inputValidatorType: [],
      inputMinValue: undefined,
      inputMaxValue: undefined,
      inputDropdownOptions: [],
    },
    mode: 'onBlur',
  })

  const isInputTypeDropdown = form.watch('inputType') === 'dropdown'
  const isInputValidatorTypeMin = form.watch('inputValidatorType')?.includes('min')
  const isInputValidatorTypeMax = form.watch('inputValidatorType')?.includes('max')

  useEffect(() => {
    if (isInputTypeDropdown) {
      if (form.getValues('inputMinValue') !== undefined) {
        form.setValue('inputMinValue', undefined)
      }
      if (form.getValues('inputMaxValue') !== undefined) {
        form.setValue('inputMaxValue', undefined)
      }
      if (form.getValues('inputValidatorType')?.length > 0) {
        form.setValue('inputValidatorType', [])
      }
    }
  }, [isInputTypeDropdown])

  const onSubmit = (data: FormBuilderSchemaFormProps) => {
    addField(data)
    form.reset({
      inputLabel: '',
      inputPlaceholder: '',
      inputType: undefined,
      inputValidatorType: [],
      inputMinValue: undefined,
      inputMaxValue: undefined,
      inputDropdownOptions: [],
    })
  }

  return {
    form,
    isInputTypeDropdown,
    isInputValidatorTypeMin,
    isInputValidatorTypeMax,
    onSubmit,
  }
}
