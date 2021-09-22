import expressionToFormula from '../src/expression-to-formula';

test('3 + 4', () => {
  const actual = expressionToFormula(['+', 3, 4]);
  expect(actual).toBe('3 + 4');
});

test('(3 + 4) / 7', () => {
  const actual = expressionToFormula(['/', ['+', 3, 4], 7]);
  expect(actual).toBe('(3 + 4) / 7');
});

test('(3 + 4) * 2 / 7', () => {
  const actual = expressionToFormula(['/', ['*', ['+', 3, 4], 2], 7]);
  expect(actual).toBe('(3 + 4) * 2 / 7');
});

test('log2(3)', () => {
  const actual = expressionToFormula(['log2', 3]);
  expect(actual).toBe('log2(3)');
});

test('log2((3 + 4) / 7)', () => {
  const actual = expressionToFormula(['log2', ['/', ['+', 3, 4], 7]]);
  expect(actual).toBe('log2((3 + 4) / 7)');
});

test('min(2, 4, 6)', () => {
  const actual = expressionToFormula(['min', 2, 4, 6]);
  expect(actual).toBe('min(2, 4, 6)');
});

test('max(2, 4, 6)', () => {
  const actual = expressionToFormula(['max', 2, 4, 6]);
  expect(actual).toBe('max(2, 4, 6)');
});

test('max(2, 4, (3 + 4) / 7)', () => {
  const actual = expressionToFormula(['max', 2, 4, ['/', ['+', 3, 4], 7]]);
  expect(actual).toBe('max(2, 4, (3 + 4) / 7)');
});

test('max(3, log2(6))', () => {
  const actual = expressionToFormula(['max', 3, ['log2', 6]]);
  expect(actual).toBe('max(3, log2(6))');
});

test(`"there are " & get("population") & " people " & upcase("here " & "not there")`, () => {
  const actual = expressionToFormula([
    'concat',
    'there are ',
    ['get', 'population'],
    ' people ',
    ['upcase', ['concat', 'here ', 'not there']]
  ]);
  expect(actual).toBe(
    `"there are " & get("population") & " people " & upcase("here " & "not there")`
  );
});

test('3 % 2', () => {
  const actual = expressionToFormula(['%', 3, 2]);
  expect(actual).toBe('3 % 2');
});

test('(3 + 2) % 2', () => {
  const actual = expressionToFormula(['%', ['+', 3, 2], 2]);
  expect(actual).toBe('(3 + 2) % 2');
});

test('3^2', () => {
  const actual = expressionToFormula(['^', 3, 2]);
  expect(actual).toBe('3^2');
});

test('3^2 + 3', () => {
  const actual = expressionToFormula(['+', ['^', 3, 2], 1]);
  expect(actual).toBe('3^2 + 1');
});

test('3^(2 + 1)', () => {
  const actual = expressionToFormula(['^', 3, ['+', 2, 1]]);
  expect(actual).toBe('3^(2 + 1)');
});

test('to-number(get("miles")) & " miles"', () => {
  const actual = expressionToFormula([
    'concat',
    ['to-number', ['get', 'miles']],
    ' miles'
  ]);
  expect(actual).toBe('to-number(get("miles")) & " miles"');
});

test('3 * length(get("len"))', () => {
  const actual = expressionToFormula(['*', 3, ['length', ['get', 'len']]]);
  expect(actual).toBe('3 * length(get("len"))');
});

test('literal([1, 2])', () => {
  const actual = expressionToFormula(['literal', [1, 2]]);
  expect(actual).toBe('literal([1, 2])');
});

test('literal([1, [2, 3]])', () => {
  const actual = expressionToFormula(['literal', [1, [2, 3]]]);
  expect(actual).toBe('literal([1, [2, 3]])');
});

test('literal(["foo", "bar"])', () => {
  const actual = expressionToFormula(['literal', ['foo', 'bar']]);
  expect(actual).toBe('literal(["foo", "bar"])');
});

test('coalesce(literal(["foo", ["bar", "baz"]]))', () => {
  const actual = expressionToFormula([
    'coalesce',
    ['literal', ['foo', ['bar', 'baz']]]
  ]);
  expect(actual).toBe('coalesce(literal(["foo", ["bar", "baz"]]))');
});

test('literal({ foo: 1, bar: 2 })', () => {
  const actual = expressionToFormula(['literal', { foo: 1, bar: 2 }]);
  expect(actual).toBe('literal({"foo":1,"bar":2})');
});

test('literal({ "boolean": true, "string": "false" })', () => {
  const actual = expressionToFormula([
    'literal', {'boolean': true, 'string': 'false'}
  ]);
  expect(actual).toBe('literal({"boolean":true,"string":"false"})');
});

test('literal("hsl(") & literal("235") & literal(", 75%, 50%)")', () => {
  const actual = expressionToFormula([
    'concat',
    ['literal', 'hsl('],
    ['literal', '235'],
    ['literal', ',75%,50%)']
  ]);
  expect(actual).toBe('literal("hsl(") & literal("235") & literal(",75%,50%)")');
});

test('literal("国立競技場")', () => {
  const actual = expressionToFormula(["literal", "国立競技場"]);
  expect(actual).toBe('literal("国立競技場")');
});

test('3 != 4', () => {
  const actual = expressionToFormula(['!=', 3, 4]);
  expect(actual).toEqual('3 != 4');
});

test('3 * 4 + 1 != 4 - 3 / 2', () => {
  const actual = expressionToFormula([
    '!=',
    ['+', ['*', 3, 4], 1],
    ['-', 4, ['/', 3, 2]]
  ]);
  expect(actual).toBe('3 * 4 + 1 != 4 - 3 / 2');
});

test('(3 != 4) == true', () => {
  const actual = expressionToFormula(['==', ['!=', 3, 4], true]);
  expect(actual).toBe('3 != 4 == true');
});

test('!(get("x"))', () => {
  const actual = expressionToFormula(['!', ['get', 'x']]);
  expect(actual).toBe('!(get("x"))');
});

test('case(get("foo") <= 4, 6, 2 == 2, 3, 1)', () => {
  const actual = expressionToFormula([
    'case',
    ['<=', ['get', 'foo'], 4],
    6,
    ['==', 2, 2],
    3,
    1
  ]);
  expect(actual).toEqual('case(get("foo") <= 4, 6, 2 == 2, 3, 1)');
});

test('match(get("scalerank"), [1, 2], 13, [3, 4], 11, 9)', () => {
  const actual = expressionToFormula([
    'match',
    ['get', 'scalerank'],
    [1, 2],
    13,
    [3, 4],
    11,
    9
  ]);
  expect(actual).toEqual('match(get("scalerank"), [1, 2], 13, [3, 4], 11, 9)');
});

test('["what", "is", "this", [1, 2]]', () => {
  const actual = expressionToFormula(['what', 'is', 'this', [1, 2]]);
  expect(actual).toEqual('["what", "is", "this", [1, 2]]');
});
