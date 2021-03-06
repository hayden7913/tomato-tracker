import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';

import store from '../store/configureStore';

import {
  decrementTimer,
  handleTimerComplete,
  incrementTaskTime,
  resetTimer,
  setIntervalId,
  setStartTime,
  toggleTimer,
} from '../actions/indexActions';

import TimeDisplay from '../components/TimeDisplay';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: props.startCount,
      intervalId: null
    };
  }

  componentWillMount() {
    const { intervalId, isTimerActive } = this.props;

    if (isTimerActive === false) {
      clearInterval(intervalId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.isTimerActive !== nextProps.isTimerActive) && nextProps.isTimerActive) {
      const { selectedTaskId, setActiveTask, setIntervalId } = this.props;
      const intervalId = setInterval(this.timer.bind(this), 1000);

      setIntervalId(intervalId);

      setActiveTask(selectedTaskId);
    }

    if ((this.props.isTimerActive !== nextProps.isTimerActive) && !nextProps.isTimerActive) {
      const { intervalId } = this.props;

      clearInterval(intervalId);
    }
  }

  doesSelectedTaskExist() {
    const { selectedTaskId, tasks } = this.props;
    const taskIds = tasks.map(task => task.shortId);

    return taskIds.includes(selectedTaskId);
  }

  timer() {
    const {
      alarmSoundSrc,
      decrementTimer,
      handleTimerComplete,
      incrementTaskTime,
      remainingTime,
      resetTimer,
      selectedProject,
      selectedTaskId,
      setActiveTask,
      toggleTimer
    } = this.props;

    const { intervalId } = this.props;

    decrementTimer();

    if (selectedProject) {
      const activeTask = selectedProject.tasks.find(task => task.shortId === selectedTaskId);

      incrementTaskTime(selectedProject, activeTask);
    }

    if (remainingTime < 1) {
      const audio = new Audio(alarmSoundSrc);
      audio.play();
      setTimeout(() => audio.play(), 1000);

      clearInterval(intervalId);
      handleTimerComplete();
      setActiveTask(null);
    }
  }

  handleTimerStart = () => {
    const { setActiveAndSelectedTask, selectedTaskId, tasks, toggleTimer } = this.props;
    let selectedTask;

    if (tasks.length > 0) {
      selectedTask = tasks.find(task => task.shortId === selectedTaskId);
    }

    if (tasks.length > 0 && !selectedTask) {
      const firstTaskId = tasks[0].shortId;

      return setActiveAndSelectedTask(firstTaskId, toggleTimer);
    }

    toggleTimer();
  }

  handlePlayStopClick = () => {
    const { isTimerActive, toggleTimer } = this.props;

    if (isTimerActive)  {
      return toggleTimer();
    }

    this.handleTimerStart();
  }

  handleSetStartTime = (selectedTaskId) => (newTime) => {
    const { isTimerActive, setStartTime, toggleTimer } = this.props;

    setStartTime(newTime, false);

    if (isTimerActive)  {
      return toggleTimer();
    }

    this.handleTimerStart();
  }

  render() {
    const {
      isTimerActive,
      remainingTime,
      startTime,
      selectedTaskId,
      task,
    } = this.props;

    return (
      <div>
        <TimeDisplay
          isTimerActive={isTimerActive}
          isTimerControlActive
          setStartTime={this.handleSetStartTime(selectedTaskId)}
          startCount={startTime}
          time={remainingTime}
          title={task}
          handleButtonClick={this.handlePlayStopClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { config, selectedProjectId, projects, timer } = state;
  const { alarmSoundSrc } = config;
  const { intervalId, isTimerActive, remainingTime, startTime } = timer;
  const selectedProject = projects.items.find(project => project.shortId === selectedProjectId);

  return {
    alarmSoundSrc,
    intervalId,
    isTimerActive,
    remainingTime,
    selectedProject,
    startTime,
    projects: projects.items
  };
};

export default connect(mapStateToProps, {
  decrementTimer,
  handleTimerComplete,
  incrementTaskTime,
  resetTimer,
  setIntervalId,
  setStartTime,
  toggleTimer
})(Timer);
