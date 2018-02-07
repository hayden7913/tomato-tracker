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


describe('replace items handlder', () => {
  const newItems = {
    aaa123: {
      projectName: 'new proj 1',
      shortId: 'aaa123',
      tasks: [
        'SyxAeDXNLG',
        'BkelVGoLUM',
      ]
    },
    xxx456: {
      projectName: 'new proj 2',
      shortId: 'xxx456',
      tasks: [
        'SyxAeDXNLG',
        'BkelVGoLUM',
      ]
    },
  };

  const action = {
    newItems,
    type: 'BY_ID_REPLACE',
    entity: 'projects',
  };

  it('adds a property to byId ', () => {
    const dataName = 'rb';
    expect( entities(data[dataName + 'SS'], action))
    .toEqual(data[dataName + 'ST']);
  });
});

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
    type: 'BY_ID_UPADTE',
    itemId: 'Bys1v7VLM',
    entity: 'projects',
    updateData: { projectName: 'new project name'}
  };

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
