import { TActionProps, TTaskProps } from "../../components/types";
import { EDIT_TASK, UPDATE_TASK } from "../constant";

export default function appReducer(state = {}, action: TActionProps) {
  switch (action.type) {
    case EDIT_TASK: {
      const clonedState = JSON.parse(JSON.stringify(state));
      console.log("clonedState: ", action.payload);
      return action.payload;
    }


    default:
      return state;
  }
}
