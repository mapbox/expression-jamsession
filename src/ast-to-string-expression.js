function returnGetExpression(input) {
  let formattedInput = input;
  formattedInput = formattedInput.replace(/'/g, '');
  formattedInput = formattedInput.replace(/"/g, '');

  return ['to-string', ['get', formattedInput]];
}

function astToStringExpression(input) {
  let expressionOperator;
  let expressionArguments = [];

  if (input.indexOf('get') === -1) {
    return input;
  } else {
    expressionOperator = 'concat';
    let splitInput = input.split('get(');
    const splitFirstArg = splitInput.shift();

    expressionArguments.push(splitFirstArg);
    splitInput.forEach(function(i) {
      const splitRemainingArgs = i.split(')');

      expressionArguments.push(returnGetExpression(splitRemainingArgs[0]));
      if (splitRemainingArgs[1])
        expressionArguments.push(splitRemainingArgs[1]);
    });

    return [expressionOperator].concat(expressionArguments);
  }
}

export default astToStringExpression;
