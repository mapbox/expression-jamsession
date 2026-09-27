import expressionOperators from './expression-operators';

const insertSpaceAfter = /("(?:[^\\"]|\\.)*")|[:,]/g;

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

function infixPrecedence(operator) {
  if (operator === '^') return 4;
  if (operator === '*' || operator === '/' || operator === '%') return 3;
  if (operator === '+' || operator === '-') return 2;
  if (
    operator === '<' ||
    operator === '>' ||
    operator === '<=' ||
    operator === '>=' ||
    operator === '==' ||
    operator === '!='
  ) {
    return 1;
  }
  return 0;
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

  const args = expression.slice(1).map((arg, argIndex, allArgs) => {
    if (typeof arg === 'string') {
      return `"${arg}"`;
    }

    const isArray = Array.isArray(arg);
    if (typeof arg === 'object' && !!arg && !isArray) {
      // Insert spaces after commas/colons for better inline display.
      const pretty = JSON.stringify(arg).replace(
        insertSpaceAfter,
        (match, literal) => literal || match + ' '
      );
      return pretty;
    }
    if (!isArray) {
      return arg;
    }
    const argOperator = arg[0];
    const argFormula = expressionToFormula(arg);
    const parentPrec = infixPrecedence(operator);
    const childPrec = infixPrecedence(argOperator);
    // 8 / 4 / 2 is 1. The right operand of / and - needs parentheses.
    const isRightOperand = argIndex > 0 && argIndex === allArgs.length - 1;
    if (
      // Use parentheses to deal with operator precedence.
      (/^[+-]$/.test(argOperator) && /^[*/%]$/.test(operator)) ||
      operator === '^' ||
      (isRightOperand &&
        parentPrec > 0 &&
        childPrec > 0 &&
        childPrec <= parentPrec)
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
