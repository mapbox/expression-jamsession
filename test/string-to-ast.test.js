import stringToAst from '../src/string-to-ast';

describe('stringToAst', () => {
  test('3 + 4', () => {
    const actual = stringToAst('3 + 4');
    const output = {
      type: 'BinaryExpression',
      operator: '+',
      left: {
        type: 'Literal',
        value: 3,
        raw: '3'
      },
      right: {
        type: 'Literal',
        value: 4,
        raw: '4'
      }
    };

    expect(actual).toEqual(output);
  });
});
