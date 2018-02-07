import { flatMap } from 'lodash';
import prettyPrint from '../helpers/prettyPrint';
import { entities, defaultState }  from './entities';
import * as actions from '../actions/indexActions';
import * as data from '../test-data/start-index';
// import { dataTarget, simpleTarget } from '../test-data/data-target';
import { normalize } from '../helpers/reducerHelpers';

console.log(data);
const testAction = () => ({
  type: 'POST_PROJECT_SUCCESS',
  shortId: 'Bys1v7VLM',
  databaseId: '5a76a6eb277417001f402a28'
});


describe('entities reducer', () => {
  const action = {
    type: 'EDIT_PROJECT_NAME_REQUEST',
    itemId: 'Bys1v7VLM',
    updateData: { projectName: 'new project name'}
  }
  it('test the reducer', () => {
    const dataName = 'dpr';
    expect( entities(data[dataName + 'SS'], action))
    .toEqual(data[dataName + 'ST']);
  });
});

describe('entities reducer', () => {
  it('test the reducer', () => {
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
//
// describe('entities reducer', () => {
//   it('test the reducer', () => {
//     expect(
//       entities(inputState, {
//         type: 'EDIT_PROJECT_NAME_REQUEST',
//         itemId: 'Bys1v7VLM',
//         updateData: { projectName: 'new project name'}
//       })
//     ).toEqual(expectedState);
//   // ).toEqual(null);
//     // expect(entities(dataStart, testAction).toEqual(dataTarget))
//   });
// });

// describe('function test', () => {
//   it('test the function', () => {
//     expect(entities(dataStart, testAction).toEqual(dataTarget))
//   });
// }); it('should handle ADD_TODO', () => {
