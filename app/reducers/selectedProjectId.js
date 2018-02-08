import * as actions from '../actions/indexActions';

export function selectedProjectId(state = null, action) {
  switch(action.type) {
    case actions.SET_SELECTED_PROJECT:
      return action.projectId;
    case actions.ADD_ITEM:
      return action.entity === 'projects' ? action.newItem[action.itemIdKey] : state;
    case actions.FETCH_PROJECTS_SUCCESS:
      return !action.projects.length ? state : action.projects[0].shortId;
    default:
      return state;
  }
}
