import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
}

export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSE_SUCCESS, courses: courses };
}

export function CreateCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course: course };
}

export function UpdateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course: course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course: course };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(UpdateCourseSuccess(savedCourse))
          : dispatch(CreateCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    //Doing optimistic delete, so not dispatching begin/end api call
    //actions, since we are not showing loading status for this
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
