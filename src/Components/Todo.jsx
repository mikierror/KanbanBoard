import React, { useState } from 'react';
import { RiAddLine } from '@remixicon/react';
import "./Kanban.css";

function Todo({ color, boardData, setTodoList ,handleDragOver , handleonDrop,handleDrag}) {
  const [editId, setEditId] = useState(null);
  const [input, setInput] = useState("");

  function handleEdit(id, currentName) {
    if (editId === id) {
   
      setTodoList((prev) =>
        prev.map((item) =>
          item.uid === id ? { ...item, name: input } : item
        )
      );
      setEditId(null); 
      setInput("");
    }
    else {
     
      setEditId(id);
      setInput(currentName);
    } 
  }



  return (
    <div className='Todo' data-status="To Do" onDrop={handleonDrop}
           onDragOver={handleDragOver}>
      <div style={{ backgroundColor: color }} className='innerBox'>
        <h3>
          To Do <span>{boardData?.length || 0}</span>
        </h3>
      </div>

      {boardData?.map((item) => (
        <div className='FullMaterial' key={item.uid} draggable onDragStart={(e)=>handleDrag(e,item)}>
          {editId === item.uid ? (
            <input
              className='TodoInput'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <h4>{item.name}</h4>
          )}

          <RiAddLine
            size={17}
            onClick={() => handleEdit(item.uid, item.name)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      ))}
    </div>
  );
}

export default Todo;
