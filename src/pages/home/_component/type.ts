import type { FormBuilderSchemaFormProps } from '@/lib'

export interface ConfirmDeleteFieldDialogProps {
  fieldId: string
}

export interface EditFieldDialogProps {
  field: FormBuilderSchemaFormProps & { id: string }
}

export interface Field extends FormBuilderSchemaFormProps {
  id: string
}

export type FormPostInterface = FormBuilderSchemaFormProps
