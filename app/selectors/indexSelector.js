import { createSelector } from 'reselect'

const denormalize = object => Object.keys(object).map(key => object[key]);

const getNormalizedProjects = (state) => state.entities.projects;
const getNormalizedTasks = (state) => state.entities.tasks;
const getSelectedProjectId = (state) => state.selectedProjectId;

export const getProjects = createSelector(
  getNormalizedProjects,
  projects => projects ? denormalize(projects) : [],
);

export const getTasks = createSelector(
  getNormalizedTasks,
  tasks => denormalize(tasks),
);

export const getSelectedProject = createSelector(
  [getNormalizedProjects, getSelectedProjectId],
  (projects, selectedProjectId) => selectedProjectId ? projects.byId[selectedProjectId] : projects[0],
);

export const getSelectedProjectTasks = createSelector(
  [getNormalizedProjects, getNormalizedTasks, getSelectedProjectId],
  (projects, tasks, selectedProjectId) => {
    return selectedProjectId
    ? projects.byId[selectedProjectId].tasks.map(key => tasks.byId[key])
    : [];
    // : projects.byId[projects.allIds[0]].tasks.map(key => tasks.byId[key])
  }
);
