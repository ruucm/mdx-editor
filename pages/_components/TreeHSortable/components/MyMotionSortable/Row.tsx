import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import React, { useState } from "react"
import { Wrapper } from "./components"
import { Item } from "./Item"

export function Row({ initialItems = ["1", "2"] }) {
  const [items, setItems] = useState(initialItems)
  const [activeId, setActiveId] = useState(null)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <Wrapper center>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext strategy={rectSortingStrategy} items={items}>
          {/* <GridContainer columns={5}> */}
          {items.map((id) => (
            <Item key={id} id={id} />
          ))}
          {/* </GridContainer> */}
        </SortableContext>
      </DndContext>
    </Wrapper>
  )

  function handleDragStart({ active }) {
    setActiveId(active.id)
  }

  function handleDragEnd({ over }: DragEndEvent) {
    setItems((items) =>
      arrayMove(items, items.indexOf(activeId), items.indexOf(over.id))
    )
    setActiveId(null)
  }
}
