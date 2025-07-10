import { LucideCircleX } from 'lucide-react'
import { Toaster } from 'sonner'

export default function ToasterComponent() {
  return (
    <Toaster
      dir="rtl"
      position="top-center"
      toastOptions={{
        classNames: {
          success:
            '!border-[1.5px] text-right !border-success !bg-success_light !text-size-body-lg-mb sm:!text-size-body-lg-ds !text-success_dark',
          error:
            '!border-[1.5px]   !border-error !bg-error_light !text-size-body-lg-mb !text-error_dark sm:!text-size-body-lg-ds',
        },
      }}
      icons={{
        success: <LucideCircleX className="text-success size-6" />,
        error: <LucideCircleX className="text-error size-6" />,
      }}
      richColors
    />
  )
}
