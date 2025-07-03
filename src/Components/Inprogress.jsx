import React, { useState } from 'react';
import { RiAddLine } from '@remixicon/react';
import "./Kanban.css";

function Inprogress({ color, boardData, setInProgressList ,handleonDrop ,handleDragOver, handleDrag }) {
  const [editId, setEditId] = useState(null);
  const [input, setInput] = useState("");

  function handleEdit(id, currentName) {
    if (editId === id) {
  
      setInProgressList((prev) =>
        prev.map((item) =>
          item.uid === id ? { ...item, name: input } : item
        )
      );
      setEditId(null); 
      setInput("");
    } else {
  
      setEditId(id);
      setInput(currentName);
    }
  }
 

  return (
    <div className='Todo' data-status="On Going"   onDrop={handleonDrop}
           onDragOver={handleDragOver}>
      <div style={{ backgroundColor: color }} className='innerBox'  >
        <h3>
          In Progress <span>{boardData?.length || 0}</span>
        </h3>
      </div>

      {boardData?.map((item) => (
        <div className='FullMaterial' draggable onDragStart={(e)=>handleDrag(e,item)} key={item.uid}
         
        >
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

export default Inprogress;
