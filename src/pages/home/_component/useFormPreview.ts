import { createMutationHook, requestWrite, useFormStore } from '@/lib'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { FormPostInterface } from './type'

const postMutation = createMutationHook('post')

export function useFormPreview() {
  const fields = useFormStore((state) => state.fields)
  const clearFields = useFormStore((state) => state.clearFields)
  const defaultValues = Object.fromEntries(fields.map((field) => [field.id, '']))

  const { mutate: postmutate, isPending: postmutatePending } = postMutation(
    requestWrite.Form_Post<FormPostInterface>({
      onSuccess: () => {
        toast.success('فرم شما با موفقیت ارسال شد')
        clearFields()
      },
      onError: () => {},
    })
  )

  const form = useForm({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  })

  const onSubmit = (data: any) => {
    setTimeout(() => {
      postmutate({
        data,
      })
    }, 500)
  }

  return { fields, form, onSubmit, postmutatePending }
}
