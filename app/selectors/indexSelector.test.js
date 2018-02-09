import { createSelector } from 'reselect'
import { xxFS } from '../test-data/selectors-start.js';
import { xxFT  } from '../test-data/selectors-target.js';

const denormalize = object => object.allIds.map(key => object.byId[key]);

const getNormalizedProjects = (state) => state.projects;
const getNormalizedTasks = (state) => state.tasks;
const getSelectedProjectId = (state) => state.selectedProjectId;


export const selectedProjectTasks = createSelector(
  [getNormalizedProjects, getNormalizedTasks, getSelectedProjectId],
  (projects, tasks, selectedProjectId) => (
    projects.byId[selectedProjectId].tasks.map(key => tasks.byId[key])
  )
);

describe('getProjects', () => {
  const testFunc = selectedProjectTasks;
  it('deletes a child item', () => {
    expect(testFunc(xxFS))
    .toEqual(xxFT);
  });
});
