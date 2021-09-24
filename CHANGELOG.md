# Changelog

## 0.5.0

- Enable support for object literals.
- Updates style spec version to `13.21.0` and removes block list predicated on object support.
- Fix handling of the `literal` expression, which now supports any literal value (arrays, objects, strings, etc), in accordance with the style spec.

## 0.4.1

- Fix handling of nested arrays that are *not* expressions (e.g. in `["match", ["get", "rank"], [1, 2], "a", [3, 4], "b", "c"]) by only treated arrays as expressions if they start with a whitelisted expression operator.
- Treat `!` as a prefix operator instead of an infix operator when transforming expressions to formulas, since `!` has only one operand.

## 0.4.0

- **[BREAKING]** Reject unquoted literal strings as passed in as formulas to `formulaToExpression`.

## 0.3.2

- Fix handling of symbolic decision operators, like `<=` and `!`.

## 0.3.1

- Fix handling of the `literal` expression, whose argument can be an array whose items are primitives and arrays of primitives.

## 0.3.0

- Fix handling of `^` (exponentiation) and `%` (remainder) expression operators.
- Fix handling of empty input to `formulaToExpression`. It now returns `undefined`.
- Fix handling of hyphenated expression operators.

## 0.2.0

- **[BREAKING]** Export 2 functions: `expressionToFormula` and `formulaToExpression`, so the transformation can go both ways.

## 0.1.0

- Initial release.
