import validateExpression from '../src/validate-expression';

describe('validateExpression', () => {
  test('1+', () => {
    const actual = () => {
      validateExpression('1+');
    };
    expect(actual).toThrow('Invalid syntax');
  });

  test('e.', () => {
    const actual = () => {
      validateExpression('e.');
    };

    expect(actual).toThrow('Invalid syntax');
  });
});
