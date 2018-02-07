import { flatMap } from 'lodash';
import prettyPrint from '../helpers/prettyPrint';
import { entities, defaultState }  from './entities';
import * as actions from '../actions/indexActions';
import * as data from '../test-data/start-index';
import { normalize } from '../helpers/reducerHelpers';
// **
// **
// **
// **
// **
// **
// **
describe('entities reducer', () => {
  const action = {
    type: 'DELETE_PROJECT_REQUEST',
    projectId: 'Bys1v7VLM',
  };

  it('deletes a task', () => {
    const dataName = 'dpr';
    expect( entities(data[dataName + 'SS'], action))
    .toEqual(data[dataName + 'ST']);
  });
});

describe('entities reducer', () => {
  const action = {
    type: 'TEST',
    itemId: 'Bys1v7VLM',
    entity: 'projects',
  };

  it('deletes from a specified entity ', () => {
    const dataName = 'dpr';
    expect( entities(data[dataName + 'SS'], action))
    .toEqual(data[dataName + 'ST']);
  });
});

describe('entities reducer', () => {
  const action = {
    type: 'DELETE_PROJECT_REQUEST',
    projectId: 'Bys1v7VLM',
  };

  it('deletes a project', () => {
    const dataName = 'dpr';
    expect( entities(data[dataName + 'SS'], action))
    .toEqual(data[dataName + 'ST']);
  });
});


describe('entities reducer', () => {
  it('updates a project name', () => {
    const dataName = 'epr';
    expect(
      entities(data[dataName + 'FS'], {
        type: 'EDIT_PROJECT_NAME_REQUEST',
        itemId: 'Bys1v7VLM',
        updateData: { projectName: 'new project name'}
      })
    ).toEqual(data[dataName + 'FT']);
  });
});

// describe('function test', () => {
//   it('test the function', () => {
//     expect(entities(dataStart, testAction).toEqual(dataTarget))
//   });
// }); it('should handle ADD_TODO', () => {
