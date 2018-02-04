import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export default function Nav(props) {
  const { activeLink, handleTimerLinkClick, handleProjectsLinkClck } = props;

  return(
    <nav>
      <div className="nav-logo-wrapper">
        {/* <img className="nav-logo-image" src="images/black-white-tomato-timer.png" alt="tomato timer logo"/> */}
        <h1 className="nav-logo-text"><span>Tomato</span><span className='nav-logo-text-bold'>Tracker</span></h1>
      </div>
          <Link
            className={`nav-link ${activeLink === 'TIMER' ? 'active-link' : ''}`}
            to="/"
            // onClick={handleTimerLinkClick}
          >
            Timer
          </Link>
          <Link
            className={`nav-link ${activeLink  === 'PROJECTS' ? 'active-link' : ''}`}
            to="/projects"
          >
            Projects
          </Link>
    </nav>
  );
}

Nav.propTypes = {
}
