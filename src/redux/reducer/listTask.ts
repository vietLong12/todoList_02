import { TTaskProps } from "./../../components/types/index";
import { TActionProps, TTaskProps } from "../../components/types";
import { sortByDate } from "../../utilities";
import {
  ADD_TASK,
  COMPLETED_TASK,
  DELETE_ALL,
  DELETE_TASK,
  DONE_ALL_TASK,
  IMPORTANT_TASK,
  REDO_TASK,
  SORT_BY_DEADLINE,
  SORT_BY_IMPORTANT,
  UPDATE_TASK,
} from "../constant";

const data: TActionProps[] = JSON.parse(localStorage.getItem("data") as string);
const initialState = data ? data : [];

export default function appReducer(state = initialState, action: TActionProps) {
  switch (action.type) {
    case ADD_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      const arr = [...clonedState, action.payload];
      localStorage.setItem("data", JSON.stringify(arr));
      return arr;
    }
    case COMPLETED_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.map((task: TTaskProps) => {
        if (task.id === action.payload) {
          task.isCompleted = !task.isCompleted;
        }
      });
      localStorage.setItem("data", JSON.stringify(clonedState));
      return clonedState;
    }
    case REDO_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.map((task: TTaskProps) => {
        if (task.id === action.payload) {
          task.isCompleted = !task.isCompleted;
        }
      });
      localStorage.setItem("data", JSON.stringify(clonedState));

      return clonedState;
    }
    case IMPORTANT_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.map((task: TTaskProps) => {
        if (task.id === action.payload) {
          task.isImportant = !task.isImportant;
        }
      });
      localStorage.setItem("data", JSON.stringify(clonedState));
      return clonedState;
    }
    case DONE_ALL_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      for (let i = 0; i < clonedState.length; i++) {
        clonedState[i].isCompleted = true;
      }
      localStorage.setItem("data", JSON.stringify(clonedState));
      return clonedState;
    }
    case SORT_BY_DEADLINE: {
      const clonedState = JSON.parse(JSON.stringify(state));
      localStorage.setItem("data", JSON.stringify(clonedState));
      return sortByDate(clonedState);
    }
    case SORT_BY_IMPORTANT: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.sort((a: TTaskProps, b: TTaskProps) => {
        if (a.isImportant && !b.isImportant) return -1;
        if (!a.isImportant && b.isImportant) return 1;
        return 0;
      });
      localStorage.setItem("data", JSON.stringify(clonedState));
      return clonedState;
    }
    case DELETE_ALL: {
      const filteredState = state.filter(
        (task: TTaskProps) => !task.isCompleted
      );
      localStorage.setItem("data", JSON.stringify(state));
      return filteredState;
    }
    case DELETE_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      clonedState.map((task: TTaskProps, index: number) => {
        if (task.id === action.payload) {
          clonedState.splice(index, 1);
        }
      });
      localStorage.setItem("data", JSON.stringify(clonedState));
      return clonedState;
    }
    case UPDATE_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      console.log("Update task::------", action.payload);
      for (let i = 0; i < clonedState.length; i++) {
        if (clonedState[i].id === action.payload.id) {
          clonedState[i].taskName = action.payload.taskName;
          console.log("clonedState[i].taskName: ", clonedState[i].taskName);
        }
        // clonedState.map((task: TTaskProps, index: number) => {
        //   if (task.id === action.payload.id) {
        //     task.taskName = action.payload.taskName;
        //     task.taskTime = action.payload.taskTime;
        //   }
        // });
      }
      localStorage.setItem("data", JSON.stringify(clonedState));
      return clonedState;
    }

    default:
      return state;
  }
}
