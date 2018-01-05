# Changelog

## Head

- Fix handling of `^` (exponentiation) and `%` (remainder) expression operators.
- Fix handling of empty input to `formulaToExpression`. It now returns `undefined`.
- Fix handling of hyphenated expression operators.

## 0.2.0

- **[BREAKING]** Export 2 functions: `expressionToFormula` and `formulaToExpression`, so the transformation can go both ways.

## 0.1.0

- Initial release.
