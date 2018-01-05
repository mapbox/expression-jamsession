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

test(`"there are " & get("population") & " people " & upper("here " & "not there")`, () => {
  const actual = expressionToFormula([
    'concat',
    'there are ',
    ['get', 'population'],
    ' people ',
    ['upper', ['concat', 'here ', 'not there']]
  ]);
  expect(actual).toBe(
    `"there are " & get("population") & " people " & upper("here " & "not there")`
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
