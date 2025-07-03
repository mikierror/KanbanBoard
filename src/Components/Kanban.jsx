import { useState } from "react";
import Todo from "./Todo";
import Inprogress from "./Inprogress";
import Finish from "./Finish";

export function Kanban() {
  const [input, setinput] = useState("");
  const [boardName, setboardName] = useState("To Do");
  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);
  const [dragTask, setdragTask] = useState();
  const BOARDS = {
    TODO: "To Do",
    ONGOING: "On Going",
    FINISHED: "Finished"
  };

  function handleSubmit(e) {
    e.preventDefault();

    let id = Date.now();
    let newTask = {
      uid: id,
      name: input.trim()
    };

    if (boardName === BOARDS.TODO) {
      setTodoList(prev => [...prev, newTask]);
    } else if (boardName === BOARDS.ONGOING) {
      setInProgressList(prev => [...prev, newTask]);
    } else if (boardName === BOARDS.FINISHED) {
      setFinishedList(prev => [...prev, newTask]);
    }

    setinput("");
  }
  function handleDragOver(e) {
    e.preventDefault()

  }

  function handleDrag(id, item) {
    setdragTask(item)

  }

  function handleonDrop(e) {
    e.preventDefault();
    const status = e.target.getAttribute("data-status");

    if (!dragTask) return;


    setTodoList(prev => prev.filter(task => task.uid !== dragTask.uid));
    setInProgressList(prev => prev.filter(task => task.uid !== dragTask.uid));
    setFinishedList(prev => prev.filter(task => task.uid !== dragTask.uid));

    if (status === BOARDS.TODO) {
      setTodoList(prev => [...prev, dragTask]);
    } else if (status === BOARDS.ONGOING) {
      setInProgressList(prev => [...prev, dragTask]);
    } else if (status === BOARDS.FINISHED) {
      setFinishedList(prev => [...prev, dragTask]);
    }


    setdragTask(null);
  }

  return (
    <div className='Main'>
      <div className="FullBoard">
        <h1>Kanban Board – Task Management App</h1>
        <div>
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            type="text"
            placeholder='Enter Task...'
          />
          <select className="BoardName" onChange={(e) => setboardName(e.target.value)}>
            <option value={BOARDS.TODO}>{BOARDS.TODO}</option>
            <option value={BOARDS.ONGOING}>{BOARDS.ONGOING}</option>
            <option value={BOARDS.FINISHED}>{BOARDS.FINISHED}</option>
          </select>
          <button onClick={handleSubmit}>Add</button>
        </div>
        <div className='Container'>
          <Todo color={"#00CE64"} handleDrag={handleDrag} boardData={todoList} setTodoList={setTodoList} handleDragOver={handleDragOver} handleonDrop={handleonDrop} />
          <Inprogress
            handleDrag={handleDrag}
            color={"#62C8FD"}
            boardData={inProgressList}
            setInProgressList={setInProgressList}
            handleonDrop={handleonDrop}
            handleDragOver={handleDragOver}
          />
          <Finish color={"#3D8DFE"} handleDrag={handleDrag} boardData={finishedList} handleDragOver={handleDragOver} setFinishedList={setFinishedList} handleonDrop={handleonDrop} />
        </div>
      </div>
    </div>
  );
}
