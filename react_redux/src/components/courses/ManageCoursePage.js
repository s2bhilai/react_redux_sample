import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
//import { bindActionCreators } from "redux";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history, //Any component loaded via <Route/> get history passed in as props from react router
  ...props //Assign any props that haven't destructured on the left to variable props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [error, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      //copy the course passed in to props to state anytime a new course is passed in
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      //   this.props.actions.loadAuthors().catch((error) => {
      //     alert("Loading authors failed" + error);
      //   });
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => {
      return {
        ...prevCourse,
        [name]: name === "authorId" ? parseInt(value, 10) : value,
      };
    });
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("course saved");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        errors={error}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      ></CourseForm>
    </>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  //actions: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

//Determines what state is passed to this component via props
//Be specific. Request only the data your component needs.
//If you refer entire redux store, then component will render each time if any state changes there
//ownProps - lets us acess the component's props. We can use this to read the URL
//data injected on props by React Router
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

//lets us declare what actions to pass to our component on props
// function mapDispatchToProps(dispatch) {
//   return {
//     //createCourse: (course) => dispatch(courseActions.createCourse(course)),
//     //actions:  bindActionCreators(courseActions, dispatch), //Binds all action methods
//     // single action creator to bindactioncreators
//     actions: {
//       loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
//       loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
//     },
//   };
// }
//OR
//If we declare mapdispatchtoprops as an object instead, each property will automatically
// be bound to dispatch
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};

//connect automatically passes dispatch if we omit mapDispatchToProps - second parameter
//If we declare mapDispatchToProps, dispatch is no longer injected.
//Only actions declared in mapDispatchToProps are passed in.
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
