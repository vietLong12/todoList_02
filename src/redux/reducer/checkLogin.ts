import { IS_LOGIN } from "../constant";

export default function appReducer(state = false, action: any) {
  switch (action.type) {
    case IS_LOGIN: {
      return true;
    }
    default:
      return state;
  }
}
