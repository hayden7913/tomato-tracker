import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link, Switch, Route} from 'react-router-dom';
import Notification  from 'react-web-notification';

import { routeToProjectsPage, routeToTimerPage } from '../helpers/route';
import { changeActiveLink, fetchProjects, handleKeyDown, toggleProjectNagModal } from '../actions/indexActions';

import Nav from '../components/Nav';
import Routes from '../routes';

class App extends Component {
  componentDidMount() {
    const { fetchProjects, handleKeyDown } = this.props;

    document.onkeydown = handleKeyDown;
    fetchProjects();
  }

  render() {
    const { isDesktopNotificationActive, location } = this.props;
    const pathName = location.pathname;
    const isProjectRoute = /projects/.test(pathName);

    return (
      <div>
        <Nav
          activeLink={isProjectRoute ? 'PROJECTS' : 'TIMER'}
          handleTimerLinkClick={routeToTimerPage}
          handleProjectsLinkClck={routeToProjectsPage}
          isProjectRoute={isProjectRoute}
        />
        {Routes}
         {isDesktopNotificationActive
          && <Notification
            timeout={40000}
            title="Time's Up!"
            ignore={false}
            options={{ icon: '/public/images/tomato-timer.png' }}
        />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { projects, timer } = state;
  const { isDesktopNotificationActive } = timer;

  return {
    isDesktopNotificationActive,
    projects: projects.items
  };
};

export default connect(mapStateToProps, {
  changeActiveLink,
  fetchProjects,
  handleKeyDown,
  toggleProjectNagModal
}
)(App);
