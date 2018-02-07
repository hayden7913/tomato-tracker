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

const updateById =  (byId, oldItemId, updateObject) => {
  const oldItem = byId[oldItemId];
  return {
    ...byId,
    [oldItemId]: Object.assign({}, oldItem, updateObject)
  };
}

// const getOldItem = (byId, oldItemId) => byId[oldItemId];
describe('entities reducer', () => {
  it('test the reducer', () => {

    // console.log('top', sampleEntities.projects);
    //const res = entities(sampleEntities,testAction())//.projects;
    // console.log(sampleEntites, '**************************');
    const res = (entities(sampleEntities, testAction()));
    // const res = updateById(sampleEntities.projects.byId, testAction().shortId, { _id: testAction().databaseId});
    console.log(JSON.stringify(res, null, 2));
  });
});
