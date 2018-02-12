function handleSyntaxErrors(error, input = '') {
  const newError = new Error('Syntax error');
  newError.type = 'SyntaxError';
  newError.index = error.index;
  newError.description = error.description || error.message;

  if (/expression/.test(newError.description)) {
    newError.description = newError.description.replace('expression', 'value');
  }

  if (newError.description === 'Unexpected ') {
    newError.description = 'Unexpected input';
  }

  if (/literal\(\s*{/.test(input)) {
    newError.description =
      'Only array arguments are supported for the literal expression';
  }

  return newError;
}

export default handleSyntaxErrors;
