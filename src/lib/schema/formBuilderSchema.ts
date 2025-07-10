import { z } from 'zod'

export const INPUT_TYPE_ENUM = ['number', 'text', 'dropdown'] as const
export const INPUT_VALIDATOR_TYPPE = [
  {
    id: 'empty',
    label: 'Empty',
  },
  {
    id: 'min',
    label: 'Min',
  },
  {
    id: 'max',
    label: 'Max',
  },
] as const

export const formBuilderSchema = z
  .object({
    inputType: z
      .enum(INPUT_TYPE_ENUM, { message: 'نوع ورودی را انتخاب کنید' })
      .optional()
      .refine((val) => val !== undefined, { message: 'نوع ورودی را انتخاب کنید' }),
    inputLabel: z.string().min(2, { message: 'لطفا لیبل را وارد کنید' }),
    inputPlaceholder: z
      .string()
      .min(2, { message: 'لطفا ریزنوشته را وارد کنید' })
      .optional()
      .or(z.literal('')),
    inputValidatorType: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'نوع اعتبار سنجی را انتخاب کنید',
    }),
    inputMinValue: z
      .number()
      .min(1, { message: 'حداقل باید بیشتر از صفر باشد' })
      .optional()
      .or(z.literal(undefined)),
    inputMaxValue: z
      .number()
      .min(1, { message: 'حداقل باید بیشتر از صفر باشد' })
      .optional()
      .or(z.literal(undefined)),
    inputDropdownOptions: z.array(z.string().optional().or(z.literal(''))),
  })
  .superRefine(
    (
      { inputType, inputDropdownOptions, inputValidatorType, inputMinValue, inputMaxValue },
      ctx
    ) => {
      // اگر dropdown باشد، گزینه‌ها باید وارد شود
      if (
        inputType === 'dropdown' &&
        (!inputDropdownOptions ||
          inputDropdownOptions.length === 0 ||
          inputDropdownOptions.every((s) => !s || s.trim() === ''))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'گزینه‌های Dropdown را باید وارد کنید',
          path: ['inputDropdownOptions'],
        })
      }

      // اگر min انتخاب شده باشد، مقدار Min باید موجود باشد
      if (inputValidatorType.includes('min')) {
        if (inputMinValue === undefined || inputMinValue === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'لطفا مقدار حداقل را وارد کنید',
            path: ['inputMinValue'],
          })
        }
      }

      // اگر max انتخاب شده باشد، مقدار Max باید موجود باشد
      if (inputValidatorType.includes('max')) {
        if (inputMaxValue === undefined || inputMaxValue === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'لطفا مقدار حداکثر را وارد کنید',
            path: ['inputMaxValue'],
          })
        }
      }
    }
  )

export type FormBuilderSchemaFormProps = z.infer<typeof formBuilderSchema>
