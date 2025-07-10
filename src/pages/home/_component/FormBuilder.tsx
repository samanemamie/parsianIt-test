import {
  Button,
  Checkbox,
  Form,
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
import { useFormBuilder } from './useFormBuilder'

export default function FormBuilder() {
  const { form, isInputTypeDropdown, isInputValidatorTypeMin, isInputValidatorTypeMax, onSubmit } =
    useFormBuilder()

  return (
    <Form {...form}>
      <form
        className="relative flex flex-col space-y-10 lg:min-h-[85vh]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <FormField
            control={form.control}
            name="inputType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع اینپوت</FormLabel>
                <FormControl>
                  <Select value={field.value ?? ''} onValueChange={field.onChange}>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان اینپوت</FormLabel>
                <FormControl>
                  <EnhancedInput className="max-h-52" placeholder="عنوان" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inputPlaceholder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ریز نوشته اینپوت</FormLabel>
                <FormControl>
                  <EnhancedInput className="max-h-52" placeholder="ریز نوشته" {...field} />
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>گزینه‌های Dropdown</FormLabel>

                <FormControl>
                  <EnhancedInput
                    placeholder="مثلاً: اول, دوم, سوم"
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => {
                      field.onChange(commaGenerator(e))
                    }}
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
                  key={item.id}
                  control={form.control}
                  name="inputValidatorType"
                  render={({ field }) => {
                    return (
                      <FormItem key={item.id} className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            disabled={form.watch('inputType') === 'dropdown' && item.id != 'empty'}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id))
                            }}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>مقدار حداقل (Min)</FormLabel>
                <FormControl>
                  <EnhancedInput
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e === '' ? undefined : Number(e))}
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
            render={({ field }) => (
              <FormItem className="mb-10">
                <FormLabel>مقدار حداکثر (Max)</FormLabel>
                <FormControl>
                  <EnhancedInput
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e === '' ? undefined : Number(e))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="mt-auto pt-8">
          <Button type="submit" className="w-full">
            ثبت
          </Button>
        </div>
      </form>
    </Form>
  )
}
