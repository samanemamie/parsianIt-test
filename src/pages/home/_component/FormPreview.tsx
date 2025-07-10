import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Paragraph,
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SortableDraggable,
} from '@/components'
import { EnhancedInput, EnhancedSelectTrigger } from '@/components/common/hocForm'
import { getValidationProps } from '@/lib'
import { getValidationRules } from '@/lib/utils'
import { motion } from 'framer-motion'
import ConfirmDeleteFieldDialog from './ConfirmDeleteFieldDialog'
import EditFieldDialog from './EditFieldDialog'
import type { Field } from './type'
import { useFormPreview } from './useFormPreview'

export default function FormPreview() {
  const { fields, form, onSubmit, postmutatePending } = useFormPreview()

  if (fields.length === 0)
    return (
      <div className="grid h-full place-items-center">
        <Paragraph>در حال حاظر مقداری وجود ندارد</Paragraph>
      </div>
    )

  const renderField = (field: Field) => {
    const { isRequired, min, max } = getValidationProps(field)

    const validationRules = getValidationRules({ isRequired, min, max })
    return (
      <motion.div
        key={field.id + '-' + field.inputType}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        layout
        className="mb-4"
      >
        <FormField
          key={field.id + '-' + field.inputType}
          control={form.control}
          name={field.id}
          rules={validationRules}
          render={({ field: f }) =>
            field.inputType === 'dropdown' ? (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>{field.inputLabel}</FormLabel>
                  <div className="flex items-center gap-2">
                    <EditFieldDialog field={field} />
                    <ConfirmDeleteFieldDialog fieldId={field.id} />
                  </div>
                </div>
                <FormControl>
                  <Select {...f} onValueChange={f.onChange} value={f.value}>
                    <EnhancedSelectTrigger>
                      <SelectValue placeholder={field.inputPlaceholder || 'انتخاب کنید'} />
                    </EnhancedSelectTrigger>
                    <SelectContent>
                      {field.inputDropdownOptions
                        ?.filter((option): option is string => option !== undefined)
                        .map((option: string, idx: number) => (
                          <SelectItem key={idx} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            ) : (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>{field.inputLabel}</FormLabel>
                  <div className="flex items-center gap-2">
                    <EditFieldDialog field={field} />
                    <ConfirmDeleteFieldDialog fieldId={field.id} />
                  </div>
                </div>
                <FormControl>
                  <EnhancedInput
                    type={field.inputType}
                    placeholder={field.inputPlaceholder}
                    {...f}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }
        />
      </motion.div>
    )
  }

  const draggableFields = fields.map((field) => ({
    id: field.id,
    element: renderField(field),
  }))

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col space-y-10 lg:min-h-[85vh]"
      >
        <div className="max-h-[500px] overflow-x-hidden overflow-y-auto lg:max-h-[70vh]">
          <SortableDraggable data={draggableFields} renderItem={(item) => item.element} />
        </div>

        <div className="mt-auto">
          <Button
            loading={postmutatePending}
            disabled={postmutatePending}
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-a w-full"
          >
            ارسال
          </Button>
        </div>
      </form>
    </Form>
  )
}
