import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddProjectPage from './containers/AddProjectPage';
import EditProjectPage  from './containers/EditProjectPage';
import ProjectsPage from './containers/ProjectsPage';
import TimeTrackerPage from './containers/TimeTrackerPage';

export default (
  <div>
    <Switch>
      <Route exact path="/" component={TimeTrackerPage}/>
      <Route exact path="/projects" component={ProjectsPage}/>
      <Route exact path="/projects/new" component={AddProjectPage}/>
      <Route path="/projects/:projectId" component={EditProjectPage}/>
      {/* <Route path="/*" component={TimeTrackerPage}/> */}
    </Switch>
  </div>
);
