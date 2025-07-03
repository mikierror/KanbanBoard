import React, { useState } from 'react';
import { RiAddLine } from '@remixicon/react';
import "./Kanban.css";

function Finish({ color, boardData,setFinishedList , handleonDrop,handleDragOver,handleDrag}) {

   const [input,setinput]=useState("")
   const [check,setcheck]=useState(null)

  function handleSubmit(id,currentName){
       if(id==check){
      setFinishedList(prev => prev.map((item) => item.uid === id ? { ...item, name: input } : item))

        setinput("")
        setcheck(null)
       }
       else{
        setcheck(id)
        setinput(currentName)
       }
  }


  return (
    <div className='Todo' data-status="Finished"   onDrop={handleonDrop}
           onDragOver={handleDragOver}>
      <div style={{ backgroundColor: color }} className='innerBox'>
        <h3>
          Finish<span>{boardData?.length || 0}</span>
        </h3>
      </div>

      {boardData?.map((item) => (
        <div className='FullMaterial' draggable onDragStart={(e)=>handleDrag(e,item)} key={item.uid}>
          {
             item.uid == check ?<input
              className='TodoInput'
              value={input}
              onChange={(e) => setinput(e.target.value)}
            />:<h4>{item.name}</h4>
          }
          <RiAddLine  onClick={()=>handleSubmit(item.uid,item.name)} size={17} />
        </div>
      ))}
    </div>
  );
}

export default Finish;
