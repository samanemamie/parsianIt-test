import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components'
import { EnhancedInput, EnhancedSelectTrigger } from '@/components/common/hocForm'
import { commaGenerator, INPUT_TYPE_ENUM, INPUT_VALIDATOR_TYPPE } from '@/lib'
import { LucidePencil } from 'lucide-react'
import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import type { EditFieldDialogProps } from './type'
import useEditFieldDialog from './useEditFieldDialog'

export default function EditFieldDialog({ field }: EditFieldDialogProps) {
  const {
    open,
    setOpen,
    form,
    isInputTypeDropdown,
    isInputValidatorTypeMin,
    isInputValidatorTypeMax,
    onSubmit,
    formKey,
  } = useEditFieldDialog(field)
  const [formKeyState, setFormKeyState] = useState(formKey)

  const setFormKey = (newKey: number) => {
    setFormKeyState(newKey)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="rounded p-1 hover:bg-gray-100">
          <LucidePencil size={18} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>ویرایش فیلد</DialogTitle>
        <DialogDescription />
        <FormProvider {...form}>
          <form
            key={formKeyState}
            className="space-y-10"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit(onSubmit)(e)
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <FormField
                control={form.control}
                name="inputType"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>نوع اینپوت</FormLabel>
                    <FormControl>
                      <Select
                        value={formField.value}
                        onValueChange={(value) => {
                          formField.onChange(value)

                          requestAnimationFrame(() => {
                            setFormKey(formKeyState + 1)
                          })
                        }}
                      >
                        <EnhancedSelectTrigger>
                          <SelectValue placeholder="انتخاب کنید" />
                        </EnhancedSelectTrigger>
                        <SelectContent>
                          {INPUT_TYPE_ENUM.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inputLabel"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>عنوان اینپوت</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        key={`label-${formKeyState}`}
                        className="max-h-52"
                        placeholder="عنوان"
                        {...formField}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inputPlaceholder"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>ریز نوشته اینپوت</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        key={`placeholder-${formKeyState}`}
                        className="max-h-52"
                        placeholder="ریز نوشته"
                        {...formField}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isInputTypeDropdown && (
              <FormField
                control={form.control}
                name="inputDropdownOptions"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>گزینه‌های Dropdown</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        key={`dropdown-${formKeyState}`}
                        placeholder="مثلاً: اول, دوم, سوم"
                        value={formField.value?.join(', ') || ''}
                        onChange={(e) => {
                          formField.onChange(commaGenerator(e))
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </FormControl>
                    <FormDescription>با زدن اسپیس گزینه ا را جدا کنید</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="inputValidatorType"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">نوع اعتبار سنجی</FormLabel>
                    <FormDescription>لطفا نوع اعتبار سنجی را انتخاب کنید.</FormDescription>
                  </div>
                  {INPUT_VALIDATOR_TYPPE.map((item) => (
                    <FormField
                      key={`${item.id}-${formKeyState}`}
                      control={form.control}
                      name="inputValidatorType"
                      render={({ field: formField }) => {
                        return (
                          <FormItem key={item.id} className="flex flex-row items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={formField.value?.includes(item.id)}
                                disabled={isInputTypeDropdown && item.id !== 'empty'}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? formField.onChange([...(formField.value || []), item.id])
                                    : formField.onChange(
                                        formField.value?.filter((value) => value !== item.id) || []
                                      )
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            {isInputValidatorTypeMin && !isInputTypeDropdown && (
              <FormField
                control={form.control}
                name="inputMinValue"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>مقدار حداقل (Min)</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        key={`min-${formKeyState}`}
                        type="number"
                        value={formField.value ?? ''}
                        onChange={(e) => {
                          const value = e
                          formField.onChange(value === '' ? undefined : Number(value))
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {isInputValidatorTypeMax && !isInputTypeDropdown && (
              <FormField
                control={form.control}
                name="inputMaxValue"
                render={({ field: formField }) => (
                  <FormItem className="mb-10">
                    <FormLabel>مقدار حداکثر (Max)</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        key={`max-${formKeyState}`}
                        type="number"
                        value={formField.value ?? ''}
                        onChange={(e) => {
                          const value = e
                          formField.onChange(value === '' ? undefined : Number(value))
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter className="flex w-full flex-col items-center gap-2 md:flex-row">
              <Button size="full" type="submit">
                ذخیره
              </Button>
              <DialogClose asChild>
                <Button size="full" type="button" variant="outline">
                  انصراف
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
