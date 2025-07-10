import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Paragraph,
} from '@/components'
import { useFormStore } from '@/lib'
import { LucideTrash } from 'lucide-react'
import { useState } from 'react'
import type { ConfirmDeleteFieldDialogProps } from './type'

export default function ConfirmDeleteFieldDialog({ fieldId }: ConfirmDeleteFieldDialogProps) {
  const [open, setOpen] = useState(false)
  const removeField = useFormStore((s) => s.removeField)

  const handleDelete = () => {
    removeField(fieldId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="none" size="none" className="rounded p-1 hover:bg-gray-200">
          <LucideTrash size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>حذف فیلد</DialogTitle>
        <DialogDescription />
        <DialogDescription />
        <Paragraph variant="gray-900" size="body-lg">
          آیا مطمئن هستید که می‌خواهید این فیلد را حذف کنید؟
        </Paragraph>
        <DialogFooter className="flex w-full flex-col items-center gap-2 md:flex-row">
          <Button size="full" onClick={handleDelete}>
            حذف
          </Button>
          <DialogClose asChild>
            <Button size="full" variant="outline">
              انصراف
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
