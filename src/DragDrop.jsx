import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React_Tailwind_img from "../public/image/react_tailwind.jpg"

const elements = [
  { id: "text", label: "Text", type: "text", content: "write something" },
  { id: "image", label: "Image", type: "image", content: React_Tailwind_img },
  { id: "button", label: "Button", type: "button", content: "Click Me" }
];

// Make the Draggable Elemnt
const DraggableElement = ({ element }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    item: element,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }))

  return (
    <div ref={drag} className={`p-2 border rounded bg-white shadow-md cursor-pointer ${isDragging ? "opacity-50" : ""}`}>
      {element.label}
    </div>
  )
}

// Drop Aerea

const DropArea = ({ onDrop, elements }) => {
  const [, drop] = useDrop(() => ({
    accept: "element",
    drop: (item) => onDrop(item),
  }))

  return (
    <div ref={drop} className="min-h-[300px] p-4 border-dashed border-2 rounded-lg bg-gray-100 flex flex-col gap-2">
      {elements.length === 0 ? <p className="text-gray-500 text-center">Drag elements here</p> : null}
      {elements.map((el, index) => (
        <EditableElement key={index} element={el} />
      ))}
    </div>
  )
}


// Editable component
const EditableElement = ({ element }) => {
  const [content, setContent] = useState(element.content);

  return (
    <div className="p-2 my-2 border rounded bg-white shadow-sm">
      {element.type === "text" && <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="border p-1 w-full" />}
      {element.type === "image" && <img src={content} alt="Uploaded" className="max-w-full h-auto rounded" />}
      {element.type === "button" && <button className="bg-blue-500 text-white px-4 py-2 rounded">{content}</button>}
    </div>
  )
}


// Main conmponent
export const  DragDropBuilder=()=>{
  const [droppedElements, setDroppedElements] = useState([]);

  const handleDrop = (item) => {
    setDroppedElements([...droppedElements, { ...item, id: Date.now() }])
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 p-4">
        <div className="w-1/4 border p-4 bg-white shadow-md rounded">
          <h3 className="font-bold mb-2">Elements</h3>
          {elements.map((el) => (
            <DraggableElement key={el.id} element={el} />
          ))}
        </div>
        <div className="w-3/4 border p-4 bg-white shadow-md rounded">
          <h3 className="font-bold mb-2">Your Website</h3>
          <DropArea onDrop={handleDrop} elements={droppedElements} />
        </div>
      </div>
    </DndProvider>
  );
}
