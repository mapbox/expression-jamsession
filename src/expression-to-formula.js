import expressionOperators from './expression-operators';

function stringifyLiteralArray(arr) {
  const items = arr.map(item => {
    if (Array.isArray(item)) return stringifyLiteralArray(item);
    return JSON.stringify(item);
  });
  return `[${items.join(', ')}]`;
}

function isInfixOperator(operator) {
  if (operator === '!') return false;
  return /^[^a-zA-Z]/.test(operator);
}

export default function expressionToFormula(expression) {
  if (!Array.isArray(expression)) {
    throw new Error('Input must be an array');
  }

  const operator = expression[0];

  if (!expressionOperators.has(operator)) {
    return stringifyLiteralArray(expression);
  }

  if (operator === 'literal') {
    const arg = expression[1];
    if (Array.isArray(arg)) {
      return `${operator}(${stringifyLiteralArray(arg)})`;
    }
  }

  const args = expression.slice(1).map(arg => {
    if (typeof arg === 'string') {
      return `"${arg}"`;
    }

    const isArray = Array.isArray(arg);
    if (typeof arg === 'object' && !!arg && !isArray) {
      return JSON.stringify(arg);
    }
    if (!isArray) {
      return arg;
    }
    const argOperator = arg[0];
    const argFormula = expressionToFormula(arg);
    if (
      // Use parentheses to deal with operator precedence.
      (/^[+-]$/.test(argOperator) && /^[*/%]$/.test(operator)) ||
      operator === '^'
    ) {
      return `(${argFormula})`;
    }
    return argFormula;
  });

  if (operator === '^') {
    return `${args.join(operator)}`;
  }

  if (isInfixOperator(operator)) {
    return `${args.join(` ${operator} `)}`;
  }

  if (operator === 'concat') {
    return args.join(' & ');
  }

  return `${operator}(${args.join(', ')})`;
}
