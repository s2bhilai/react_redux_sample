import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const course = { ...this.state.course, title: e.target.value };
    this.setState({ course: course });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //dispatch an action
    //this.props.dispatch(courseActions.createCourse(this.state.course));
    //this.props.createCourse(this.state.course);
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        ></input>

        <input type="submit" value="Save" />

        {this.props.courses.map((course) => {
          return <div key={course.title}>{course.title}</div>;
        })}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.func.isRequired,
};

//Determines what state is passed to this component via props
//Be specific. Request only the data your component needs.
//If you refer entire redux store, then component will render each time if any state changes there
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

//lets us declare what actions to pass to our component on props
function mapDispatchToProps(dispatch) {
  return {
    //createCourse: (course) => dispatch(courseActions.createCourse(course)),
    actions: bindActionCreators(courseActions, dispatch),
  };
}

//connect automatically passes dispatch if we omit mapDispatchToProps - second parameter
//If we declare mapDispatchToProps, dispatch is no longer injected. Only actions declared in mapDispatchToProps are passed in.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
