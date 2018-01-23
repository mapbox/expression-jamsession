import jsep from 'jsep';
import handleSyntaxErrors from './handle-syntax-errors';

// GL expressions use ^ for exponentiation, while JS uses **.
// 15 is precedence of ** operator in JS.
jsep.addBinaryOp('^', 15);

function handleLiteralArgument(arg) {
  switch (arg.type) {
    case 'ArrayExpression':
      return arg.elements.map(item => {
        if (item.type === 'Literal') return item.value;
        return handleLiteralArgument(item);
      });
    default:
      throw new Error('Invalid syntax');
  }
}

function astToExpression(input) {
  if (input.value !== undefined) return input.value;
  if (input.name !== undefined) return input.name;

  let expressionOperator;
  let expressionArguments = [];

  if (input.type === 'UnaryExpression') {
    expressionOperator = input.operator;
    expressionArguments.push(astToExpression(input.argument));
  }

  if (input.type === 'BinaryExpression') {
    expressionOperator = input.operator === '&' ? 'concat' : input.operator;

    // Collapse concat arguments, in case the & operator was used to join
    // more than two successive strings.
    const addBinaryArgument = arg => {
      if (
        expressionOperator === 'concat' &&
        Array.isArray(arg) &&
        arg[0] === 'concat'
      ) {
        expressionArguments = expressionArguments.concat(arg.slice(1));
      } else {
        expressionArguments.push(arg);
      }
    };
    addBinaryArgument(astToExpression(input.left));
    addBinaryArgument(astToExpression(input.right));
  }

  if (input.type === 'CallExpression') {
    expressionOperator = input.callee.name;

    if (expressionOperator === 'literal') {
      expressionArguments = expressionArguments.concat(
        input.arguments.map(handleLiteralArgument)
      );
    } else {
      input.arguments.forEach(i => {
        expressionArguments.push(astToExpression(i));
      });
    }
  }

  // Change undescores in expression operators to hyphens, reversing the
  // transformation below.
  if (/[a-z]+_[a-z]+/.test(expressionOperator)) {
    expressionOperator = expressionOperator.replace(
      /([a-z]+)_([a-z]+)/,
      '$1-$2'
    );
  }

  return [expressionOperator].concat(expressionArguments);
}

function formulaToExpression(input) {
  if (input === '' || input === undefined) {
    return;
  }

  if (typeof input !== 'string') {
    throw new Error('input must be a string');
  }

  // Change hyphens in expression operators to underscores. This allows JS
  // parsing to work, but then needs to be reversed above.
  input = input.replace(/([a-z]+)-([a-z]+)\(/, '$1_$2(');

  let ast;
  try {
    ast = jsep(input);
  } catch (syntaxError) {
    throw handleSyntaxErrors(syntaxError, input);
  }

  const expression = astToExpression(ast);
  return expression;
}

export default formulaToExpression;
