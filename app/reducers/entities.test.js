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
describe('delete child item handlder', () => {
  const action = {
    type: 'DELETE_CHILD_ITEM',
    parentEntity: 'projects',
    childEntity: 'tasks',
    parentItemId: 'Bys1v7VLM',
    childItemId: 'BkelVGoLUM',
    childPropKey: 'tasks'
  };

  it('deletes a child item', () => {
    const dataName = 'dci';
    expect( entities(data[dataName + 'FS'], action))
    .toEqual(data[dataName + 'FT']);
  });
});

describe('update tasks handlder', () => {
  const updateTasks = {
    SyxAeDXNLG: {
      shortId: 'SyxAeDXNLG',
      recordedTime: 6004,
      taskName: 'read up on user flows',
      _id: '5a76a6f7277417001f402a29',
      log: null
    },
    abc123: {
      shortId: 'SyxAeDXNLG',
      recordedTime: 6004,
      taskName: 'read up on user flows',
      _id: '5a76a6f7277417001f402a29',
      log: null
    },
  };

  const action = {
    type: 'UPDATE_TASKS',
    projectId: 'Bys1v7VLM',
    updateTasks,
  };

  it('remove old tasks and adds new ones', () => {
    const dataName = 'ats';
    expect( entities(data[dataName + 'FS'], action))
    .toEqual(data[dataName + 'FT']);
  });
});

describe('shift items handlder', () => {
  const action = {
    type: 'SHIFT_ITEMS',
    startIndex: 0,
    endIndex: 1,
    keyPressed: 'ARROW_DOWN',
    entity: 'projects',
  };

  it('reorders allId elements', () => {
    const dataName = 'mv';
    expect( entities(data[dataName + 'SS'], action))
    .toEqual(data[dataName + 'ST']);
  });
});

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
    type: 'REPLACE_ALL',
    entity: 'projects',
  };

  it('repalces byId and allIds', () => {
    const dataName = 'rb';
    expect( entities(data[dataName + 'SS'], action))
    .toEqual(data[dataName + 'ST']);
  });
});

describe('add property handler', () => {
  const newItem = {
    projectName: '**just added**',
    shortId: 'Sks197VLP',
    tasks: [],
  };

  const action = {
    newItem,
    type: 'ADD_ITEM',
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
    type: 'DELETE_ITEM',
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
    type: 'UPDATE_ITEM',
    itemId: 'SyxAeDXNLG',
    entity: 'tasks',
    updateData: { taskName: 'new project name'}
  };

  it('updates an item name via generic entity reducer', () => {
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
//         type: 'UPDATE_ITEM',
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
