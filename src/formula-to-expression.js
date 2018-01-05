import jsep from 'jsep';
import handleSyntaxErrors from './handle-syntax-errors';

function astToExpression(input) {
  if (input.value !== undefined) return input.value;
  if (input.name !== undefined) return input.name;

  let expressionOperator;
  let expressionArguments = [];

  if (input.operator) {
    expressionOperator = input.operator === '&' ? 'concat' : input.operator;
  }

  if (input.type === 'UnaryExpression') {
    expressionArguments.push(astToExpression(input.argument));
  }

  if (input.type === 'BinaryExpression') {
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

    input.arguments.forEach(i => {
      expressionArguments.push(astToExpression(i));
    });
  }

  return [expressionOperator].concat(expressionArguments);
}

function formulaToExpression(input) {
  let ast;
  try {
    ast = jsep(input);
  } catch (syntaxError) {
    throw handleSyntaxErrors(syntaxError);
  }

  const expression = astToExpression(ast);
  return expression;
}

export default formulaToExpression;
