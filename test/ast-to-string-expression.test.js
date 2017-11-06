import astToStringExpression from '../src/ast-to-string-expression';

describe('astToExpression', () => {
  test('quack', () => {
    const actual = astToStringExpression('quack');
    expect(actual).toBe('quack');
  });

  test(`there are get('population') people here`, () => {
    const actual = astToStringExpression(
      `there are get('population') people here`
    );
    expect(actual).toEqual([
      'concat',
      'there are ',
      ['to-string', ['get', 'population']],
      ' people here'
    ]);
  });

  test(`there are get('population') people in this get('state')`, () => {
    const actual = astToStringExpression(
      `there are get('population') people in this get('state')`
    );
    expect(actual).toEqual([
      'concat',
      'there are ',
      ['to-string', ['get', 'population']],
      ' people in this ',
      ['to-string', ['get', 'state']]
    ]);
  });
});
