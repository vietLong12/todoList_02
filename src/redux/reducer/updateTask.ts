import { TActionProps } from "../../components/types";
import { EDIT_TASK } from "../constant";

export default function appReducer(state = {}, action: TActionProps) {
  switch (action.type) {
    case EDIT_TASK: {
      //@ts-ignore
      const clonedState = JSON.parse(JSON.stringify(state));
      return action.payload;
    }

    default:
      return state;
  }
}
