# expression-jamsession

[![Build Status](https://travis-ci.com/mapbox/expression-jamsession.svg?token=SEyDg5xudiyx521kB7Cy&branch=master)](https://travis-ci.com/mapbox/expression-jamsession)

Write [Mapbox GL expressions](https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions) in a more familiar, handwritable, spreadsheet-like, programming-like syntax.
This library translates these handwritten formulas into valid spec-compliant Mapbox GL expressions that you can use in a Mapbox style.


## Features

- Arithmetic operators (`+ - * /`) and parentheses work like in high school math, e.g. `((3 + 4) * 2) / 7`.
- Expressions are represented like function invocations in programming, e.g. `get("population")`, `log2(get("population"))`.
- `&` operator concatenates strings, as in spreadsheet programs.

```js
// Input
2 + 2

// Output
["+", 2, 2]
```

```js
// Input
max(3, log2(6))

// Output
["max", 3, ["log2", 6]]
```

```js
// Input
((3 + get("num")) * 2) / 7

// Output
["/", ["*", ["+", 3, get("num")], 2], 7]
```

```js
// Input
"name: " & get("name")

// Output
["concat", ["name ", ["get", "name"]]]
```

## Caveats

- You can use this library to create expressions that are syntactically acceptable but invalid as Mapbox GL expressions, e.g. `notARealExpression(true)` outputs `["notARealExpression", true]`.

## Usage

Pass in a string formula and get an expression.

```js
import createExpression from '@mapbox/expression-jamsession';

createExpression('3 + 4'); // ["+", 3, 4]
```
