import * as actions from './testAction';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish dishes';
    const expectedAction = {
      type: 'ADD_TODO',
      text
    };
    expect(actions.addTodo(text)).toEqual(expectedAction);
  });
});
