import React, { useEffect, useState } from "react";
import s from "./todosearch.module.css";
import {
  AlignLeft,
  ArchiveTick,
  ArrowDown2,
  Edit,
  Star1,
  Task,
} from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { convertDateFormat, fixTime } from "../../utilities";
import { TTaskProps } from "../types";
import {
  completedTaskAction,
  doneAllTask,
  editTaskAction,
  importantTaskAction,
  sortByDeadline,
  sortByImportant,
  updateTaskAction,
} from "../../redux/action";
import { TTodoTaskProps } from "../TodoTask/TodoTask";

interface TProps {
  dataFilter: TTaskProps[];
  setShowUpdate: (a: boolean) => void;
}

export const ListTask: React.FC<TProps> = ({ dataFilter, setShowUpdate }) => {
  const dispatch = useDispatch();

  const handleDoneTask = (index: string) => {
    dispatch(completedTaskAction(index));
  };

  const handleImportant = (id: string) => {
    dispatch(importantTaskAction(id));
  };

  const handleUpdateTask = (task: TTaskProps) => {
    dispatch(editTaskAction(task));
    setShowUpdate(true);
  };

  return (
    <div>
      {dataFilter.map((task: TTaskProps, index) => {
        if (task.isCompleted == false) {
          return (
            <div
              className=" border-1 border-black border p-3 pt-2 mb-3"
              key={index}
            >
              <div className="heading d-flex align-items-center text-start">
                <span className="me-3">{`Ngày thêm công việc: ${convertDateFormat(
                  fixTime(task.taskInit).date
                )} --- ${fixTime(task.taskInit).time}`}</span>
                <div
                  className=""
                  onClick={() => handleImportant(task.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Star1
                    size="22"
                    color="#FF8A65"
                    variant={task.isImportant ? "Bold" : "Linear"}
                  />
                </div>
              </div>
              <div className="body d-flex justify-content-between">
                <div className="body-left">
                  <p className="py-2">
                    <span className="fw-bold fs-5">Công việc: </span>
                    {task.taskName}
                  </p>
                  <p className="text-danger fw-bold">
                    Deadline:{" "}
                    {`${fixTime(task.taskTime).time}'/${convertDateFormat(
                      fixTime(task.taskTime).date
                    )}  `}
                  </p>
                </div>
                <div
                  className="body-right d-flex flex-column justify-content-center"
                  style={{ cursor: "pointer" }}
                >
                  <div className="" onClick={() => handleUpdateTask(task)}>
                    <Edit size="26" color="#FF8A65" />
                  </div>
                  <div
                    className="mt-3"
                    onClick={() => handleDoneTask(task.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <ArchiveTick size="26" color="#FF8A65" />
                  </div>
                </div>
              </div>
            </div>
            
          );
        }
      }
      )}
    </div>
  );
};

const ToDoSearch: React.FC<TTodoTaskProps> = ({ setShowUpdate }) => {
  const listTask = useSelector(
    (store: { listTask: TTaskProps[] }) => store.listTask
  );
  const [isShow, setShow] = useState(false);
  const [dataFilter, setDataFilter] = useState<TTaskProps[]>(listTask);

  const dispatch = useDispatch();

  const handleCompletedAll = () => {
    dispatch(doneAllTask());
  };

  const handleSortWithDeadline = () => {
    dispatch(sortByDeadline());
  };
  const handleSortWithImportant = () => {
    dispatch(sortByImportant());
  };

  const checkTaskDone = () => {
    let isEmty = true;
    listTask.map((task) => {
      if (task.isCompleted == false) {
        isEmty = false;
      }
    });
    return isEmty;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredArray = listTask.filter((item) =>
      item.taskName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataFilter(filteredArray);
  };

  useEffect(() => {
    setDataFilter(listTask);
  }, [listTask]);

  return (
    <>
      <div className={`${s.toDoSearch}`}>
        <div className={s.search}>
          <form>
            <div className="form-group">
              <label htmlFor="search">Tìm kiếm</label>
              <input
                type="text"
                name="search"
                id="search"
                className="form-control"
                placeholder="🔍 Tìm kiếm công việc..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e)
                }
              />
            </div>
          </form>
          <div className={s.containerBtn}>
            <button
              className="btn btn-danger mt-3 d-flex align-items-center"
              onClick={handleCompletedAll}
            >
              <Task size="18" color="white" style={{ marginRight: "4px" }} />
              Hoàn thành tất cả
            </button>
            <div>
              <div className={`${s.title} btn btn-primary mt-3`}>
                <div
                  onClick={() => setShow(!isShow)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 4px",
                  }}
                >
                  <AlignLeft
                    size="20"
                    color="white"
                    style={{ marginRight: "6px" }}
                  />
                  Sắp xếp theo{" "}
                  <ArrowDown2
                    size="16"
                    color="white"
                    style={{ marginLeft: "6px" }}
                  />
                </div>
                {isShow ? (
                  <ul>
                    <li onClick={handleSortWithDeadline}>Hạn hoàn thành</li>
                    <li onClick={handleSortWithImportant}>Quan trọng </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={s.allTask}>
          <div className={s.emty}>
            {checkTaskDone() ? (
              <div className={s.emty}>
                Không có công việc nào cần hoàn thành !!!
              </div>
            ) : (
              <div className={s.emty}>
                <ListTask
                  dataFilter={dataFilter}
                  setShowUpdate={setShowUpdate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoSearch;
