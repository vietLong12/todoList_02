import React, { useEffect, useRef, useState } from "react";
import s from "./todotask.module.css";
import { AddCircle } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { TTaskProps } from "components/types";
import { addTaskAction, updateTaskAction } from "redux/action";
import { Toast } from "react-bootstrap";
import { timeDefaults, generateRandomId } from "utilities";
import { RootState } from "redux/reducer";

export interface TTodoTaskProps {
  setShowUpdate: (a: boolean) => void;
  isShowUpdate: boolean;
}

const TodoTask: React.FC<TTodoTaskProps> = ({
  setShowUpdate,
  isShowUpdate,
}) => {
  const [showA, setShowA] = useState(false);
  const [valueTextArea, setValueTextArea] = useState("");
  const [valueTime, setValueTime] = useState(timeDefaults());
  const [taskDefaults, setTaskDefaults] = useState<TTaskProps>({
    id: "",
    taskName: "",
    taskInit: timeDefaults(),
    taskTime: "",
    isCompleted: false,
    isImportant: false,
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const dispatch = useDispatch();

  const taskUpdate = useSelector((store: RootState) => store.updateTask);

  const handleOnSubmit = (e) => {
    if (valueTextArea === "") {
      alert("bạn chưa nhập công việc");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    e.target.reset();

    const arrTemp = {
      id: generateRandomId(8),
      taskInit: timeDefaults(),
      taskName: valueTextArea,
      taskTime: valueTime,
      isCompleted: false,
      isImportant: false,
    };
    dispatch(addTaskAction(arrTemp));
    setValueTextArea("");
    setValueTime(timeDefaults());
    setShowA(true);
    setTimeout(() => setShowA(false), 2000);
  };

  const handleUpdateTask = (taskDefaults: TTaskProps) => {
    if (formRef.current) {
      formRef.current.reset();
    }
    taskDefaults.taskName = valueTextArea;
    taskDefaults.taskTime = valueTime;
    dispatch(updateTaskAction(taskDefaults));

    setTaskDefaults({
      id: "",
      taskName: "",
      taskInit: timeDefaults(),
      taskTime: "",
      isCompleted: false,
      isImportant: false,
    });

    setShowUpdate(false);
  };

  useEffect(() => {
    setTaskDefaults(taskUpdate);
  }, [taskUpdate]);

  return (
    <div className={`${s.todoTask}`}>
      {/* Toast */}

      <Toast className={s.toast} show={showA} onClose={() => setShowA(!showA)}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Success!!!</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body>Bạn đã thêm thành công một công việc mới.</Toast.Body>
      </Toast>

      {/*End  Toast */}

      <h1> Todo Tasks</h1>
      <form onSubmit={handleOnSubmit} ref={formRef}>
        <div className="form-group mb-2">
          <label htmlFor="valueTextArea">Công việc</label>
          <textarea
            className="form-control"
            id="valueTextArea"
            rows={3}
            defaultValue={taskDefaults.taskName}
            placeholder="📝 Thêm một công việc mới"
            onChange={(e) => setValueTextArea(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label
            htmlFor="dateTime"
            style={{ backgroundColor: "orange", color: "black" }}
          >
            Deadline
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="dateTime"
            defaultValue={
              taskDefaults.taskTime
                ? taskDefaults.taskTime
                : taskDefaults.taskInit
            }
            onChange={(e) => {
              setValueTime(e.target.value);
            }}
          />
        </div>
        {!isShowUpdate ? (
          <button
            type="submit"
            className="btn btn-primary mt-4"
            style={{ display: "flex" }}
          >
            <AddCircle style={{ marginRight: "6px" }} />
            Thêm công việc
          </button>
        ) : (
          ""
        )}
        {isShowUpdate ? (
          <button
            type="button"
            className="btn btn-primary mt-4"
            style={{ display: "flex" }}
            onClick={() => handleUpdateTask(taskDefaults)}
          >
            <AddCircle style={{ marginRight: "6px" }} />
            Cập nhật
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default TodoTask;
