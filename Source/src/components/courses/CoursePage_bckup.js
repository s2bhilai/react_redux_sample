import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../redux/actions/courseAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses123: {
        title: "",
      },
    };
  }

  handleChange = (event) => {
    const course = { ...this.state.courses123, title: event.target.value };
    this.setState({ courses123: course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.courses123);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.courses123.title}
        ></input>

        <input type="submit" value="Save" />
        {this.props.courses.map((course) => {
          return <div key={course.title}>{course.title}</div>;
        })}
      </form>
    );
  }
}

CoursesPage.PropTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     createCourse: (course) => {
//       dispatch(courseActions.createCourse(course));
//     },
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
