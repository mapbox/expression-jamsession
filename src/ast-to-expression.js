function astToExpression(input) {
  if (input.value) return input.value;
  if (input.type === 'BinaryExpression') {
    const left = astToExpression(input.left);
    const right = astToExpression(input.right);

    return [input.operator, left, right];
  }
}

export default astToExpression;
