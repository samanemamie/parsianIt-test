import { LargeHeading } from '@/components'
import FormBuilder from './_component/FormBuilder'
import FormPreview from './_component/FormPreview'

export default function HomePages() {
  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 bg-gray-50 p-10 lg:h-dvh lg:grid-cols-2">
      <div className="h-full w-full space-y-6 rounded-lg border border-gray-300 bg-white p-4">
        <LargeHeading as="h1" className="text-center">
          ساخت فرم
        </LargeHeading>
        <FormBuilder />
      </div>

      <div className="h-full w-full space-y-2 rounded-lg border border-gray-300 bg-gray-100 p-4 text-center">
        <LargeHeading as="h1" className="text-center">
          نمایش فرم
        </LargeHeading>
        <FormPreview />
      </div>
    </main>
  )
}
