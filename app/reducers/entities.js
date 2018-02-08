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

      const newById = {
        ...byId,
        [newItemId]: newItem,
      };

      const newEntity = {
        ...state[entity],
        byId: newById,
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
        byId: deletePropImmutable(byId, itemId),
        allIds: allIds.filter(id => id !== itemId),
      };

      return {
        ...state,
        [entity]: newEntity,
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
      console.log(entity);
      console.log(state[entity])
      const newEntity = {
        ...state[entity],
        byId: updateById(state[entity].byId, itemId, updateData),
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
