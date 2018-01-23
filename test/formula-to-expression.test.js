import formulaToExpression from '../src/formula-to-expression';

test('empty input', () => {
  expect(formulaToExpression()).toBeUndefined();
  expect(formulaToExpression('')).toBeUndefined();
});

describe('literals', () => {
  test('7', () => {
    const actual = formulaToExpression('7');
    expect(actual).toBe(7);
  });

  test('77.323', () => {
    const actual = formulaToExpression('77.323');
    expect(actual).toBe(77.323);
  });

  test('sing', () => {
    const actual = formulaToExpression('"sing"');
    expect(actual).toBe('sing');
  });

  test('true', () => {
    const actual = formulaToExpression('true');
    expect(actual).toBe(true);
  });

  test('false', () => {
    const actual = formulaToExpression('false');
    expect(actual).toBe(false);
  });
});

describe('formulas', () => {
  test('-3', () => {
    const actual = formulaToExpression('-3');
    expect(actual).toEqual(['-', 3]);
  });

  test('-(3 + 4)', () => {
    const actual = formulaToExpression('-(3 + 4)');
    expect(actual).toEqual(['-', ['+', 3, 4]]);
  });

  test('3 + 4', () => {
    const actual = formulaToExpression('3 + 4');
    expect(actual).toEqual(['+', 3, 4]);
  });

  test('(3 + 4) / 7', () => {
    const actual = formulaToExpression('(3 + 4) / 7');
    expect(actual).toEqual(['/', ['+', 3, 4], 7]);
  });

  test('((3 + 4) * 2) / 7', () => {
    const actual = formulaToExpression('((3 + 4) * 2) / 7');
    expect(actual).toEqual(['/', ['*', ['+', 3, 4], 2], 7]);
  });

  test('log2(3)', () => {
    const actual = formulaToExpression('log2(3)');
    expect(actual).toEqual(['log2', 3]);
  });

  test('log2((3 + 4) / 7)', () => {
    const actual = formulaToExpression('log2((3 + 4) / 7)');
    expect(actual).toEqual(['log2', ['/', ['+', 3, 4], 7]]);
  });

  test('min(2, 4, 6)', () => {
    const actual = formulaToExpression('min(2, 4, 6)');
    expect(actual).toEqual(['min', 2, 4, 6]);
  });

  test('max(2, 4, 6)', () => {
    const actual = formulaToExpression('max(2, 4, 6)');
    expect(actual).toEqual(['max', 2, 4, 6]);
  });

  test('max(2, 4, ((3 + 4) / 7))', () => {
    const actual = formulaToExpression('max(2, 4, ((3 + 4) / 7))');
    expect(actual).toEqual(['max', 2, 4, ['/', ['+', 3, 4], 7]]);
  });

  test('max(3, log2(6))', () => {
    const actual = formulaToExpression('max(3, log2(6))');
    expect(actual).toEqual(['max', 3, ['log2', 6]]);
  });

  test(`"there are " & get("population") & " people " & upper("here " & "not there")`, () => {
    const actual = formulaToExpression(
      `"there are " & get("population") & " people " & upper("here " & "not there")`
    );
    expect(actual).toEqual([
      'concat',
      'there are ',
      ['get', 'population'],
      ' people ',
      ['upper', ['concat', 'here ', 'not there']]
    ]);
  });

  test(`concat("there are ", get("population"), " people ", upper(concat("here ", "not there")))`, () => {
    const actual = formulaToExpression(
      `concat("there are ", get("population"), " people ", upper(concat("here ", "not there")))`
    );
    expect(actual).toEqual([
      'concat',
      'there are ',
      ['get', 'population'],
      ' people ',
      ['upper', ['concat', 'here ', 'not there']]
    ]);
  });

  test('3 % 2', () => {
    const actual = formulaToExpression('3 % 2');
    expect(actual).toEqual(['%', 3, 2]);
  });

  test('(3 + 2) % 2', () => {
    const actual = formulaToExpression('(3 + 2) % 2');
    expect(actual).toEqual(['%', ['+', 3, 2], 2]);
  });

  test('3^2', () => {
    const actual = formulaToExpression('3^2');
    expect(actual).toEqual(['^', 3, 2]);
  });

  test('3^2 + 1', () => {
    const actual = formulaToExpression('3^2 + 1');
    expect(actual).toEqual(['+', ['^', 3, 2], 1]);
  });

  test('3^(2 + 1)', () => {
    const actual = formulaToExpression('3^(2 + 1)');
    expect(actual).toEqual(['^', 3, ['+', 2, 1]]);
  });

  test('to-number(get("miles")) & " miles"', () => {
    const actual = formulaToExpression('to-number(get("miles")) & " miles"');
    expect(actual).toEqual([
      'concat',
      ['to-number', ['get', 'miles']],
      ' miles'
    ]);
  });

  test('3 * length(get("len"))', () => {
    const actual = formulaToExpression('3 * length(get("len"))');
    expect(actual).toEqual(['*', 3, ['length', ['get', 'len']]]);
  });

  test('literal([1, 2])', () => {
    const actual = formulaToExpression('literal([1, 2])');
    expect(actual).toEqual(['literal', [1, 2]]);
  });

  test('literal([1, [2, 3]])', () => {
    const actual = formulaToExpression('literal([1, [2, 3]])');
    expect(actual).toEqual(['literal', [1, [2, 3]]]);
  });

  test('literal(["foo", "bar"])', () => {
    const actual = formulaToExpression('literal(["foo", "bar"])');
    expect(actual).toEqual(['literal', ['foo', 'bar']]);
  });

  test('coalesce(literal(["foo", ["bar", "baz"]]))', () => {
    const actual = formulaToExpression(
      'coalesce(literal(["foo", ["bar", "baz"]]))'
    );
    expect(actual).toEqual(['coalesce', ['literal', ['foo', ['bar', 'baz']]]]);
  });

  test('literal({ foo: 1, bar: 2 })', () => {
    expect.hasAssertions();
    try {
      formulaToExpression('literal({ foo: 1, bar: 2 })');
    } catch (error) {
      expect(error.type).toBe('SyntaxError');
      expect(error.index).toBe(8);
      expect(error.description).toBe(
        'Only array arguments are supported for the literal expression'
      );
    }
  });

  test('3 != 4', () => {
    const actual = formulaToExpression('3 != 4');
    expect(actual).toEqual(['!=', 3, 4]);
  });

  test('case(get("foo") <= 4, 6, 2 == 2, 3, 1)', () => {
    const actual = formulaToExpression(
      'case(get("foo") <= 4, 6, 2 == 2, 3, 1)'
    );
    expect(actual).toEqual([
      'case',
      ['<=', ['get', 'foo'], 4],
      6,
      ['==', 2, 2],
      3,
      1
    ]);
  });
});

describe('syntax errors', () => {
  test('3 +', () => {
    const actual = () => {
      formulaToExpression('3 +');
    };
    expect(actual).toThrow('Syntax error');

    expect.hasAssertions();
    try {
      formulaToExpression('3 +');
    } catch (error) {
      expect(error.type).toBe('SyntaxError');
      expect(error.index).toBe(3);
      expect(error.description).toBe('Expected value after +');
    }
  });

  test('e.', () => {
    const actual = () => {
      formulaToExpression('e.');
    };
    expect(actual).toThrow('Syntax error');

    expect.hasAssertions();
    try {
      formulaToExpression('e.');
    } catch (error) {
      expect(error.type).toBe('SyntaxError');
      expect(error.index).toBe(2);
      expect(error.description).toBe('Unexpected input');
    }
  });
});
