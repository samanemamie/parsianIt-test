// import { formBuilderSchema, type FormBuilderSchemaFormProps, useFormStore } from '@/lib'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'

// export default function useEditFieldDialog(field: FormBuilderSchemaFormProps & { id: string }) {
//   const [open, setOpen] = useState(false)
//   const updateField = useFormStore((s) => s.updateField)

//   const form = useForm<FormBuilderSchemaFormProps>({
//     resolver: zodResolver(formBuilderSchema),
//     defaultValues: {
//       inputType: field.inputType,
//       inputLabel: field.inputLabel,
//       inputPlaceholder: field.inputPlaceholder,
//       inputValidatorType: field.inputValidatorType,
//       inputMinValue: field.inputMinValue,
//       inputMaxValue: field.inputMaxValue,
//       inputDropdownOptions: field.inputDropdownOptions,
//     },
//     mode: 'onBlur',
//   })

//   const isInputTypeDropdown = form.watch('inputType') === 'dropdown'
//   const isInputValidatorTypeMin = form.watch('inputValidatorType')?.includes('min')
//   const isInputValidatorTypeMax = form.watch('inputValidatorType')?.includes('max')

//   useEffect(() => {
//     if (isInputTypeDropdown) {
//       if (form.getValues('inputMinValue') !== undefined) {
//         form.setValue('inputMinValue', undefined)
//       }
//       if (form.getValues('inputMaxValue') !== undefined) {
//         form.setValue('inputMaxValue', undefined)
//       }
//       if (form.getValues('inputValidatorType')?.length > 0) {
//         form.setValue('inputValidatorType', [])
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isInputTypeDropdown])

//   const onSubmit = (data: FormBuilderSchemaFormProps) => {
//     updateField(field.id, data)
//     setOpen(false)
//   }

//   return {
//     open,
//     setOpen,
//     form,
//     isInputTypeDropdown,
//     isInputValidatorTypeMin,
//     isInputValidatorTypeMax,
//     onSubmit,
//   }
// }

import { formBuilderSchema, type FormBuilderSchemaFormProps, useFormStore } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function useEditFieldDialog(field: FormBuilderSchemaFormProps & { id: string }) {
  const [open, setOpen] = useState(false)
  const updateField = useFormStore((s) => s.updateField)
  const [formKey, setFormKey] = useState(0)

  const form = useForm<FormBuilderSchemaFormProps>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      inputType: field.inputType,
      inputLabel: field.inputLabel,
      inputPlaceholder: field.inputPlaceholder,
      inputValidatorType: field.inputValidatorType,
      inputMinValue: field.inputMinValue,
      inputMaxValue: field.inputMaxValue,
      inputDropdownOptions: field.inputDropdownOptions,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  })

  const isInputTypeDropdown = form.watch('inputType') === 'dropdown'
  const isInputValidatorTypeMin = form.watch('inputValidatorType')?.includes('min')
  const isInputValidatorTypeMax = form.watch('inputValidatorType')?.includes('max')

  useEffect(() => {
    if (open) {
      form.clearErrors()
      form.reset({
        inputType: field.inputType,
        inputLabel: field.inputLabel,
        inputPlaceholder: field.inputPlaceholder,
        inputValidatorType: field.inputValidatorType,
        inputMinValue: field.inputMinValue,
        inputMaxValue: field.inputMaxValue,
        inputDropdownOptions: field.inputDropdownOptions,
      })
      setFormKey((prev) => prev + 1)
    }
  }, [open, field, form])

  useEffect(() => {
    if (isInputTypeDropdown) {
      if (form.getValues('inputMinValue') !== undefined) {
        form.setValue('inputMinValue', undefined, { shouldValidate: false, shouldDirty: false })
      }
      if (form.getValues('inputMaxValue') !== undefined) {
        form.setValue('inputMaxValue', undefined, { shouldValidate: false, shouldDirty: false })
      }
      if (form.getValues('inputValidatorType')?.length > 0) {
        form.setValue('inputValidatorType', [], { shouldValidate: false, shouldDirty: false })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputTypeDropdown])

  const onSubmit = (data: FormBuilderSchemaFormProps) => {
    updateField(field.id, data)
    setOpen(false)
  }

  return {
    open,
    setOpen,
    form,
    isInputTypeDropdown,
    isInputValidatorTypeMin,
    isInputValidatorTypeMax,
    onSubmit,
    formKey,
    setFormKey,
  }
}
