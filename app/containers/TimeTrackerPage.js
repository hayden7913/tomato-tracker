import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { getProjects, getSelectedProject, getSelectedProjectTasks } from '../selectors/indexSelector';

import {
  deleteTask,
  decrementTimer,
  changeActiveContextMenu,
  fetchProjects,
  setSelectedProject,
  setTempTasks,
  toggleAddTasksForm,
  toggleConfig,
  toggleSelected,
  toggleEditTaskForm,
  toggleOnboardMode,
  toggleTimer
} from '../actions/indexActions';

import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {
  componentDidUpdate() {
    console.log('fetching')
    fetchProjects();
  }

  shouldComponentUpdate(nextProps) {
    const { isModalActive, selectedProjectId } = this.props;

    if (this.props.selectedProjectId && (nextProps.selectedProjectId !== this.props.selectedProjectId) && isModalActive) {
      return false;
    }

    return true;
  }

  render() {
    const {
      hasFetched,
      selectedProject,
      selectedTasks,
    } = this.props;

    // if (!hasFetched) {
    if (false) {
      return <div className="loader">Loading...</div>;
    }
    return (
        <TimeTracker
          selectedProject={selectedProject || null}
          tasks={selectedTasks || []}
          {...this.props}
        />
    );
  }
}

const mapStateToProps = state => {
  const {  entities, modal, projects, timer, selectedProjectId } = state;
  const { hasFetched, isFetching } = projects;
  const { isModalActive, isModalClosing, isOnboardingActive } = modal;
  const { isTimerActive } = timer;

  return {
    hasFetched,
    isFetching,
    isModalActive,
    isModalClosing,
    isOnboardingActive,
    isTimerActive,
    selectedProjectId,
    selectedProject: getSelectedProject(state),
    selectedTask: getSelectedProjectTasks(state),
    projects: getProjects(state),
  };
};

export default connect(mapStateToProps, {
  changeActiveContextMenu,
  decrementTimer,
  deleteTask,
  fetchProjects,
  setSelectedProject,
  setTempTasks,
  toggleAddTasksForm,
  toggleConfig,
  toggleEditTaskForm,
  toggleOnboardMode,
  toggleSelected,
  toggleTimer,
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
};
