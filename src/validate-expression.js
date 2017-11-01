import stringToAst from '../src/string-to-ast';
import astToExpression from '../src/ast-to-expression';

let errors = [];

function validateExpression(input) {
  try {
    astToExpression(stringToAst(input));
  } catch (e) {
    let description = e.description;

    if (description.includes('expression')) {
      description.replace('expression', 'a number or expression');
    }

    if (description === 'Unexpected ') {
      description = 'Unexpected input ';
    }

    errors.push({
      index: e.index,
      description: description
    });
  }

  if (errors.length !== 0) {
    const error = new Error('Invalid syntax');
    error.type = 'InvalidSyntax';
    error.errors = errors;
    throw error;
  }
}

export default validateExpression;
