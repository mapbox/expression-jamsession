function astToExpression(input) {
  if (input.value) return input.value;
  if (input.name) return input.name;

  let expressionOperator;
  let expressionArguments = [];

  if (input.operator) {
    expressionOperator = input.operator;
  }

  if (input.type === 'BinaryExpression') {
    expressionArguments.push(
      astToExpression(input.left),
      astToExpression(input.right)
    );
  }

  if (input.type === 'CallExpression') {
    expressionOperator = input.callee.name;

    input.arguments.forEach(i => {
      expressionArguments.push(astToExpression(i));
    });
  }

  return [expressionOperator].concat(expressionArguments);
}

export default astToExpression;
