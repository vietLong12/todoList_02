import React, { useState } from "react";
import s from "./content.module.css";
import ToDoSearch from "../ToDoSearch/ToDoSearch";
import TodoTask from "../TodoTask/TodoTask";
import ToDoDone from "../ToDoDone/ToDoDone";

const Content: React.FC = () => {
  const [isShowUpdate, setShowUpdate] = useState(false);

  return (
    <div className="container mt-lg-5">
      <div className="row">
        <div className="col">
          <ToDoSearch isShowUpdate={isShowUpdate} setShowUpdate={setShowUpdate}/>
        </div>
        <div className="col">
          <TodoTask isShowUpdate={isShowUpdate} setShowUpdate={setShowUpdate}/>
          <ToDoDone />
        </div>
      </div>
    </div>
  );
};

export default Content;
