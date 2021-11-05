import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage_v1 extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = (course) => {
    toast.success("Course Deleted");
    this.props.actions.deleteCourse(course).catch((error) => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage_v1.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

//Determines what state is passed to this component via props
//Be specific. Request only the data your component needs.
//If you refer entire redux store, then component will render each time if any state changes there
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

//lets us declare what actions to pass to our component on props
function mapDispatchToProps(dispatch) {
  return {
    //createCourse: (course) => dispatch(courseActions.createCourse(course)),
    //actions:  bindActionCreators(courseActions, dispatch), //Binds all action methods
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), // single action creator to bindactioncreators
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

//connect automatically passes dispatch if we omit mapDispatchToProps - second parameter
//If we declare mapDispatchToProps, dispatch is no longer injected. Only actions declared in mapDispatchToProps are passed in.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage_v1);
