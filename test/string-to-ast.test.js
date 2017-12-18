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

  test('3 +', () => {
    const actual = () => {
      stringToAst('3 +');
    };
    expect(actual).toThrow('Syntax error');

    expect.hasAssertions();
    try {
      stringToAst('3 +');
    } catch (error) {
      expect(error.type).toBe('SyntaxError');
      expect(error.index).toBe(3);
      expect(error.description).toBe('Expected value after +');
    }
  });

  test('e.', () => {
    const actual = () => {
      stringToAst('e.');
    };
    expect(actual).toThrow('Syntax error');

    expect.hasAssertions();
    try {
      stringToAst('e.');
    } catch (error) {
      expect(error.type).toBe('SyntaxError');
      expect(error.index).toBe(2);
      expect(error.description).toBe('Unexpected input ');
    }
  });
});
