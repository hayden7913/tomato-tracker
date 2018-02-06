import { flatMap } from 'lodash';
import entities, { defaultState }  from './entities';
import * as actions from '../actions/indexActions';
import { projectsN } from '../test-data/test-data-projects';
import { normalize } from '../helpers/reducerHelpers';

const extractTasks = projects => flatMap(projects.items, project => project.tasks);

const fetchProjects = () => ({
  type: actions.FETCH_PROJECTS_SUCCESS,
  projects: projectsN,
})


describe('entities reducer', () => {
  it('should handle ADD_TODO', () => {
    // console.log(fetchProjects());
    // console.log(projectsN)
    const res = entities(defaultState, fetchProjects())
    // const res = normalize(extractTasks(fetchProjects().projects), 'shortId');
    // console.log(res);
    console.log(JSON.stringify(res, null, 2));
  });
});
