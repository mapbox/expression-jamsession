export default function expressionToFormula(expression) {
  const operator = expression[0];

  const args = expression.slice(1).map(arg => {
    if (typeof arg === 'string') {
      return `"${arg}"`;
    }
    if (!Array.isArray(arg)) {
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

  if (
    operator === '+' ||
    operator === '*' ||
    operator === '-' ||
    operator === '/' ||
    operator === '%'
  ) {
    return `${args.join(` ${operator} `)}`;
  }

  if (operator === 'concat') {
    return args.join(' & ');
  }

  return `${operator}(${args.join(', ')})`;
}
