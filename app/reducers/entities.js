import _ from 'lodash';
import  * as actions from '../actions/indexActions';
import { deletePropImmutable, normalize, shiftElementsUp, shiftElementsDown } from '../helpers/reducerHelpers';

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
    case actions.DELETE_PROJECT_REQUEST: {
      const { projectId } = action;

      const newProjects = {
        ...state.projects,
        byId: deletePropImmutable(state.projects.byId, projectId)
      };

      return {
        ...state,
        projects: newProjects,
      };
    }
    case 'TEST': {
      const { itemId, entity } = action;

      const newEntity = {
        ...state[entity],
        byId: deletePropImmutable(state[entity].byId, itemId),
      };
      return {
        ...state,
        [entity]: newEntity,
      };
    }
    case actions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: normalize(action.projects, 'shortId'),
        tasks: normalize(extractTasks(action.projects), 'shortId'),
        hasFetched: true,
        isFetching: false,
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
    case actions.POST_PROJECT_SUCCESS:
    case actions.EDIT_PROJECT_NAME_REQUEST: {
      const { byId } = state.projects;
      const { itemId, updateData } = action;

      return {
        ...state,
        projects: {
          ...state.projects,
          byId: updateById(byId, itemId, updateData),
        },
      };
    }
    case actions.QUEUE_NEW_PROJECT: {
      return {
        ...state,
        queue: action.projectName
      };
    }
    case actions.TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    case actions.DELETE_TASK_REQUEST: {
      const { taskId } = action;

      const newProjects = {
        ...state.tasks,
        byId: deletePropImmutable(state.tasks.byId, projectId)
      };

      return {
        ...state,
        tasks: newProjects,
      };
    }
    default:
      return state;
  }
}
