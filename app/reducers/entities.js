import _ from 'lodash';
import  * as actions from '../actions/indexActions';
import { normalize, shiftElementsUp, shiftElementsDown } from '../helpers/reducerHelpers';

const extractTasks = projects => _.flatMap(projects.items, project => project.tasks);

export const defaultState = {
  entries: {},
  groups: {},
  projects: {},
  tasks: {},
  hasFetched: false,
  isFetching: false,
  queue: null
};

export function entities(state = defaultState, action) {
  switch(action.type) {
    case 'FETCH_PROJECTS_SUCCESS':
    console.log(action.projects)
      return {
        ...state,
        projects: normalize(action.projects.items, 'shortId'),
        tasks: normalize(extractTasks(action.projects), 'shortId'),
      };
    default:
      return state;
  }
}
