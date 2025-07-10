import type React from 'react'

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import type { SortableProps } from './type'

export function SortableDraggable<T extends { id: string | number }>({
  data,
  renderItem,
}: {
  data: T[]
  renderItem: (item: T) => React.ReactNode
}) {
  const [items, setItems] = useState(data)
  const [activeId, setActiveId] = useState<string | number | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  )

  useEffect(() => {
    setItems(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const activeItem = activeId ? items.find((item) => item.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)}>
        {items.map((item) => (
          <SortableDraggableCard key={item.id} id={item.id}>
            {renderItem(item)}
          </SortableDraggableCard>
        ))}
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          <SortableDraggableCard id={activeItem.id}>{renderItem(activeItem)}</SortableDraggableCard>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

function SortableDraggableCard({ id, children }: SortableProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
  }

  // Touch drag state for mobile
  const [isTouchDragging, setIsTouchDragging] = useState(false)

  const handleTouchStart = () => {
    setIsTouchDragging(true)
    document.body.style.overflow = 'hidden'
  }
  const handleTouchEnd = () => {
    setIsTouchDragging(false)
    document.body.style.overflow = ''
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isTouchDragging) {
      e.preventDefault()
    }
  }

  return (
    <div className="flex w-full items-center" ref={setNodeRef} style={style} {...attributes}>
      <span
        {...listeners}
        className="flex-none"
        style={{
          cursor: 'grab',
          marginInlineEnd: 8,
          userSelect: 'none',
          touchAction: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        ☰
      </span>
      <div className="w-full"> {children}</div>
    </div>
  )
}
