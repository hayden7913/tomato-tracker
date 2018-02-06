import { flatMap } from 'lodash';
import { entities, defaultState }  from './entities';
import * as actions from '../actions/indexActions';
import { sampleEntities } from '../test-data/test-data-projects';
import { normalize } from '../helpers/reducerHelpers';


const testAction = () => ({
  type: 'POST_PROJECT_REQUEST',
  project: {
    projectName: 'test project',
    shortId: 'B1p7kXwIz',
    tasks: [],
  }
});

describe('entities reducer', () => {
  it('test the reducer', () => {
    // console.log(fetchProjects());
    // console.log(projectsN)
    const res = entities(sampleEntities, testAction()).projects;
    // const res = normalize(extractTasks(fetchProjects().projects), 'shortId');
    // console.log(res);
    console.log(JSON.stringify(res, null, 2));
  });
});
