import stringToAst from '../src/string-to-ast';
import astToExpression from '../src/ast-to-expression';

describe('astToExpression', () => {
  test('3', () => {
    const actual = astToExpression(stringToAst('3'));
    expect(actual).toBe(3);
  });

  test('3 + 4', () => {
    const actual = astToExpression(stringToAst('3 + 4'));
    expect(actual).toEqual(['+', 3, 4]);
  });

  test('(3 + 4) / 7', () => {
    const actual = astToExpression(stringToAst('(3 + 4) / 7'));
    expect(actual).toEqual(['/', ['+', 3, 4], 7]);
  });

  test('((3 + 4) * 2) / 7', () => {
    const actual = astToExpression(stringToAst('((3 + 4) * 2) / 7'));
    expect(actual).toEqual(['/', ['*', ['+', 3, 4], 2], 7]);
  });
});
