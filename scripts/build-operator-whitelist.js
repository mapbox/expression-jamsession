#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const styleSpec = require('@mapbox/mapbox-gl-style-spec');

// Block these until object notation is supported.
// See https://github.com/mapbox/expression-jamsession/issues/25
const blacklist = new Set([
  'is-supported-script',
  'resolved-locale',
  'collator'
]);

const expressions = Object.keys(styleSpec.v8.expression_name.values).filter(
  x => !blacklist.has(x)
);

const fileContent = `// DO NOT MODIFY DIRECTLY!
// This file is generated by scripts/build-operator-whitelist.js
// from the Mapbox GL Style Spec.

const operators = new Set();

${expressions.map(x => `operators.add('${x}');`).join('\n')}

export default operators;
`;

fs.writeFileSync(
  path.join(__dirname, '../src/expression-operators.js'),
  fileContent
);
