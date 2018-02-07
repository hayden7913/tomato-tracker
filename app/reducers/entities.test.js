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
  const newItem = {
    projectName: '**just added**',
    shortId: 'Sks197VLP',
    tasks: [],
  };

  const action = {
    newItem,
    type: 'BY_ID_ADD',
    entity: 'projects',
    itemIdKey: 'shortId',
  };

  it('adds a property to byId ', () => {
    const dataName = 'ba';
    expect( entities(data[dataName + 'SS'], action))
    .toEqual(data[dataName + 'ST']);
  });
});

describe('entities reducer', () => {
  const action = {
    type: 'BY_ID_DELETE',
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
  const action = {
    type: 'UPDATE_BY_ID',
    itemId: 'Bys1v7VLM',
    entity: 'projects',
    updateData: { projectName: 'new project name'}
  };
  // console.log(data[dataName + 'FS'])
  it('updates a project name via generic entity reducer', () => {
    const dataName = 'epr';
    expect(
      entities(data[dataName + 'FS'], action)
    ).toEqual(data[dataName + 'FT']);
  });
});

// describe('entities reducer', () => {
//   it('updates a project name', () => {
//     const dataName = 'epr';
//     expect(
//       entities(data[dataName + 'FS'], {
//         type: 'EDIT_PROJECT_NAME_REQUEST',
//         itemId: 'Bys1v7VLM',
//         updateData: { projectName: 'new project name'}
//       })
//     ).toEqual(data[dataName + 'FT']);
//   });
// });

// describe('function test', () => {
//   it('test the function', () => {
//     expect(entities(dataStart, testAction).toEqual(dataTarget))
//   });
// }); it('should handle ADD_TODO', () => {

// describe('entities reducer', () => {
//   const action = {
//     type: 'ALL_IDS_ADD',
//     entity: 'projects',
//     itemId: 'xyz456',
//   };
//
//   it('adds an id to allIds', () => {
//     const dataName = 'aa';
//     expect(entities(data[dataName + 'SS'], action))
//     .toEqual(data[dataName + 'ST']);
//   });
// });
