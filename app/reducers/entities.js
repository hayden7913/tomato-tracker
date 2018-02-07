import _ from 'lodash';
import  * as actions from '../actions/indexActions';
import { normalize, shiftElementsUp, shiftElementsDown } from '../helpers/reducerHelpers';

const extractTasks = projects => _.flatMap(projects, project => project.tasks);

const updateById = (byId, oldItemId, updateObject) => {
  const oldItem = byId[oldItemId];
  return {
    ...byId,
    [oldItemId]: Object.assign({}, oldItem, updateObject)
  };
}

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
    case actions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: normalize(action.projects, 'shortId'),
        tasks: normalize(extractTasks(action.projects), 'shortId'),
        hasFetched: true,
        isFetching: false,
      };
    case actions.TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    case actions.POST_PROJECT_REQUEST:
      return {
        ...state,
        projects: {
          byId: {
            ...state.projects.byId,
            [action.project.shortId]: action.project,
          },
          allIds: [action.project.shortId, ...state.projects.allIds],
        },
      };
    case actions.POST_PROJECT_SUCCESS: {
      const { byId } = state.projects;
      const { databaseId, shortId } = action;

      return {
        ...state,
        projects: updateById(byId, shortId, { _id: databaseId}),
      }
    }
    default:
      return state;
  }
}
