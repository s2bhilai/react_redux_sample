import * as types from "../actions/actionTypes";
import initialState from "./initialState";

//Note: We are handling the same action type in
//multiple reducer. for ex: LOAD_COURSE_SUCCESS
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
