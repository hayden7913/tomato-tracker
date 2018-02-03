import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddProjectPage from './containers/AddProjectPage';
import EditProjectPage  from './containers/EditProjectPage';
import ProjectsPage from './containers/ProjectsPage';
import TimeTrackerPage from './containers/TimeTrackerPage';

export default (
  <Switch>
    <Route component={TimeTrackerPage}/>
    <Route path="/projects" component={ProjectsPage}/>
    <Route path="/projects/new" component={AddProjectPage}/>
    <Route path="/projects/:projectId" component={EditProjectPage}/>
  </Switch>
);
