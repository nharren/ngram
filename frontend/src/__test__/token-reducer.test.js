import tokenReducer from '../reducers/token-reducer.js';

describe('Token Reducer', function() {
  it('TOKEN_SET should return a token.', function() {
    let testAction = {
      type: 'TOKEN_SET',
      payload: 'kasdf;kasdfj;asdfj;s'
    };

    let result = tokenReducer(null, testAction);

    expect(result).toEqual(testAction.payload);
  });

  it('TOKEN_DELETE should delete a token.', function() {
    let testAction = {
      type: 'TOKEN_DELETE'
    };

    let result = tokenReducer(null, testAction);

    expect(result).toEqual(null);
  })
});