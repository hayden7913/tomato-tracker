import { flatMap } from 'lodash';
import { entities, defaultState }  from './entities';
import * as actions from '../actions/indexActions';
import { sampleEntities } from '../test-data/test-data-projects';
import { normalize } from '../helpers/reducerHelpers';


const testAction = () => ({
  type: 'POST_PROJECT_SUCCESS',
  shortId: 'Bys1v7VLM',
  databaseId: '5a76a6eb277417001f402a28'
});

describe('entities reducer', () => {
  it('test the reducer', () => {
    const res = entities(sampleEntities, testAction())//.projects;
    console.log(JSON.stringify(res, null, 2));
  });
});
