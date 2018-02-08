import _ from 'lodash';
import  * as actions from '../actions/indexActions';
import { filterProps, normalize, shiftElementsUp, shiftElementsDown } from '../helpers/reducerHelpers';
import  prettyPrint from '../helpers/prettyPrint';

const extractTasks = projects => _.flatMap(projects, project => project.tasks);

const updateProp = (byId, itemId, updateObject) => {
  const item = byId[itemId];

  return {
    ...byId,
    [itemId]: Object.assign({}, item, updateObject)
  };
};

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
    case actions.ADD_ITEM: {
      const { entity, newItem, itemIdKey } = action;
      const { byId, allIds } = state[entity];
      const newItemId = newItem[itemIdKey];

      const newEntity = {
        ...state[entity],
        byId: {
          ...byId,
          [newItemId]: newItem,
        },
        allIds: [newItemId, ...allIds],
      };

      return {
        ...state,
        [entity]: newEntity,
      };
    }
    case actions.DELETE_ITEM: {
      const { itemId, entity } = action;
      const { byId, allIds } = state[entity];

      const newEntity = {
        ...state[entity],
        byId: filterProps(byId,  (key) => key !== itemId),
        allIds: allIds.filter(id => id !== itemId),
      };

      return {
        ...state,
        [entity]: newEntity,
      };
    }
    case actions.DELETE_CHILD_ITEM: {
      const { parentEntity, childEntity, parentItemId, childItemId, childPropKey } = action;
      const prevChildEntity = state[childEntity];
      const prevParentEntity = state[parentEntity];

      const newChildEntity = {
        ...prevChildEntity,
        byId: filterProps(prevChildEntity.byId,  (key) => key !== childItemId),
        allIds: prevChildEntity.allIds.filter(id => id !== childItemId),
      };

      const newParentEntity = {
        ...prevParentEntity,
        byId: updateProp(prevParentEntity.byId, parentItemId, {
          [childPropKey]: prevParentEntity.byId[parentItemId][childPropKey].filter(id => id !== childItemId)
        })
      };

      return {
        ...state,
        [childEntity]: newChildEntity,
        [parentEntity]: newParentEntity,
      };
    }
    case actions.REPLACE_ALL: {
      const { entity, newItems } = action;

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
    case actions.SHIFT_ITEMS: {
      const { entity, keyPressed, startIndex, endIndex } = action;
      const { allIds } = state[entity];
      let newAllIds;

      if (keyPressed === 'ARROW_DOWN') {
        newAllIds  = shiftElementsDown(allIds, startIndex, endIndex);
      }

      if (keyPressed === 'ARROW_UP') {
        newAllIds =  shiftElementsUp(allIds, startIndex, endIndex);
      }

      const newEntity = {
        ...state[entity],
        allIds: newAllIds,
      };

      return {
        ...state,
        [entity]: newEntity,
      };
    }

    case actions.UPDATE_ITEM: {
      const { itemId, entity,  updateData } = action;

      const newEntity = {
        ...state[entity],
        byId: updateProp(state[entity].byId, itemId, updateData),
      };

      return {
        ...state,
        [entity]: newEntity,
      };
    }
    // delte tasks that belong to given projectId
    case actions.UPDATE_TASKS: {
      const { projectId, updateTasks } = action;
      const tasksToDelete = state.projects.byId[projectId].tasks;

      const tasksById = {
        ...filterProps(state.tasks.byId, key => !tasksToDelete.includes(key)),
        ...updateTasks,
      }

      const newTasks = {
        byId: tasksById,
        allIds: Object.keys(tasksById),
      }

      const newProjects = {
        ...state.projects,
        byId: updateProp(state.projects.byId, projectId, { tasks: newTasks.allIds }),
      }

      // return newProjects
      return {
        ...state,
        projects: newProjects,
        tasks: newTasks,
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
    default:
      return state;
  }
}
