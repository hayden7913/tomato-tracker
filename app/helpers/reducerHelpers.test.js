

describe('addPropImmutable', () => {
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
