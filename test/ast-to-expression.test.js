import stringToAst from '../src/string-to-ast';
import astToExpression from '../src/ast-to-expression';

describe('astToExpression', () => {
  test('quack', () => {
    const actual = astToExpression(stringToAst('quack'));
    expect(actual).toBe('quack');
  });

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

  test('log2(3)', () => {
    const actual = astToExpression(stringToAst('log(3)'));
    expect(actual).toEqual(['log', 3]);
  });

  test('log2((3 + 4) / 7)', () => {
    const actual = astToExpression(stringToAst('log((3 + 4) / 7)'));
    expect(actual).toEqual(['log', ['/', ['+', 3, 4], 7]]);
  });

  test('min(2, 4, 6)', () => {
    const actual = astToExpression(stringToAst('min(2, 4, 6)'));
    expect(actual).toEqual(['min', 2, 4, 6]);
  });

  test('max(2, 4, 6)', () => {
    const actual = astToExpression(stringToAst('max(2, 4, 6)'));
    expect(actual).toEqual(['max', 2, 4, 6]);
  });

  test('max(2, 4, ((3 + 4) / 7))', () => {
    const actual = astToExpression(stringToAst('max(2, 4, ((3 + 4) / 7))'));
    expect(actual).toEqual(['max', 2, 4, ['/', ['+', 3, 4], 7]]);
  });

  test('max(3, log2(6))', () => {
    const actual = astToExpression(stringToAst('max(3, log2(6))'));
    expect(actual).toEqual(['max', 3, ['log2', 6]]);
  });
});
