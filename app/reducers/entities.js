import _ from 'lodash';

import  * as actions from '../actions/indexActions';
import { deletePropImmutable, normalize, shiftElementsUp, shiftElementsDown } from '../helpers/reducerHelpers';

const extractTasks = projects => _.flatMap(projects, project => project.tasks);

const updateById = (byId, itemId, updateObject) => {
  const item = byId[itemId];

  return {
    ...byId,
    [itemId]: Object.assign({}, item, updateObject)
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
    case 'ALL_IDS_MOVE': {
      const { entity, itemId } = action;
      // create newallIds
      // add new id with spread,

      const newById = {
        ...state[entity].byId,
        [newItemId]: newItem,
      };

      const newEntity = {
        ...state[entity],
        byId: newById
      }
      // return newEntity
      return {
        ...state,
        [entity]: newEntity,
      };
    }
    case 'BY_ID_ADD': {
      const { entity, newItem, itemIdKey } = action;
      const { byId, allIds } = state[entity];
      const newItemId = newItem[itemIdKey];

      const newById = {
        ...byId,
        [newItemId]: newItem,
      };

      const newEntity = {
        ...state[entity],
        byId: newById,
        allIds: [newItemId, ...allIds],
      }
      // return newEntity
      return {
        ...state,
        [entity]: newEntity,
      };
    }
    case 'BY_ID_DELETE': {
      const { itemId, entity } = action;
      const { byId, allIds } = state[entity];

      const newEntity = {
        ...state[entity],
        byId: deletePropImmutable(byId, itemId),
        allIds: allIds.filter(id => id !== itemId),
      };
      // return allIds.filter(id => id !== itemId);

      return {
        ...state,
        [entity]: newEntity,
      };
    }
    case 'BY_ID_REPLACE': {
      const { entity, newItems } = action;
      const { byId, allIds } = state[entity];

      const newEntity = {
        ...state[entity],
        byId: newItems,
        allIds: Object.keys(newItems),
      };

      return {
        ...state,
        [entity]: newEntity,
      };
    }
    case 'BY_ID_UPADTE':
    case actions.POST_PROJECT_SUCCESS:
    case actions.EDIT_PROJECT_NAME_REQUEST: {
      const { itemId, entity,  updateData } = action;

      const newEntity = {
        ...state[entity],
        byId: updateById(state[entity].byId, itemId, updateData),
      };

      return {
        ...state,
        [entity]: newEntity,
      };
    }
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
