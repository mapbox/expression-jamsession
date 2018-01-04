import jsep from 'jsep';
import handleSyntaxErrors from './handle-syntax-errors';
import astToExpression from './ast-to-expression';

function createExpression(input) {
  let ast;
  try {
    ast = jsep(input);
  } catch (syntaxError) {
    throw handleSyntaxErrors(syntaxError);
  }

  const expression = astToExpression(ast);
  return expression;
}

export default createExpression;
