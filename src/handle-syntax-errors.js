function handleSyntaxErrors(error) {
  const newError = new Error('Syntax error');
  newError.type = 'SyntaxError';
  newError.index = error.index;
  newError.description = error.description;

  if (/expression/.test(newError.description)) {
    newError.description = newError.description.replace('expression', 'value');
  }

  if (newError.description === 'Unexpected ') {
    newError.description = 'Unexpected input';
  }

  return newError;
}

export default handleSyntaxErrors;
