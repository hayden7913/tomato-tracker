const  dprSS = {
  hasFetched: true,
  isFetching: false,
  projects: {
    byId: {
      Bys1v7VLM: {
        projectName: 'tt upgrade planning / design',
        shortId: 'Bys1v7VLM',
        tasks: [
          'SyxAeDXNLG',
          'BkelVGoLUM',
        ]
      },
    },
      '123': {
        projectName: 'tt upgrade planning / design',
        shortId: 'Bys1v7VLM',
        tasks: [
          'SyxAeDXNLG',
          'BkelVGoLUM',
        ]
      },
    },
      'abc': {
        projectName: 'tt upgrade planning / design',
        shortId: 'Bys1v7VLM',
        tasks: [
          'SyxAeDXNLG',
          'BkelVGoLUM',
        ]
      },
    },
    allIds: ['Bys1v7VLM'],
  }
};

export const  dprST = {
  hasFetched: true,
  isFetching: false,
  projects: {
    byId: {
    },
    allIds: [],
  }
};

describe('prop filter function', () => {
  function filterProps(object, callback) {
    return Object.keys(object).reduce((result, key) => {
      if (callback(key)) {
        result[key] = object[key];
      }
      return result;
    }, {});
}

  it('filters props from an object', () => {
    const dataName = 'dpr';
    expect( entities(data[dataName + 'SS'], action))
    .toEqual(data[dataName + 'ST']);
  });
});
