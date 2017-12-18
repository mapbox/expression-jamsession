import jsep from 'jsep';
import handleSyntaxErrors from './handle-syntax-errors';

function stringToAst(input) {
  try {
    return jsep(input);
  } catch (e) {
    throw handleSyntaxErrors(e);
  }
}

export default stringToAst;
