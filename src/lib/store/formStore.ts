import type { FormBuilderSchemaFormProps } from '@/lib'
import { generateRandomId } from '@/lib'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FormField extends FormBuilderSchemaFormProps {
  id: string
}

interface FormStoreState {
  fields: FormField[]
  addField: (field: Omit<FormField, 'id'>) => void
  updateField: (id: string, updates: Partial<FormField>) => void
  removeField: (id: string) => void
  clearFields: () => void
}

export const useFormStore = create<FormStoreState>()(
  persist(
    (set) => ({
      fields: [],
      addField: (field) =>
        set((state) => ({
          fields: [...state.fields, { ...field, id: generateRandomId() }],
        })),
      updateField: (id, updates) =>
        set((state) => ({
          fields: state.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        })),
      removeField: (id) =>
        set((state) => ({
          fields: state.fields.filter((f) => f.id !== id),
        })),
      clearFields: () =>
        set(() => ({
          fields: [],
        })),
    }),
    {
      name: 'form-store',
    }
  )
)
