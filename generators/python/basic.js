Blockly.Python['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order;
  if (code == Infinity) {
    code = 'float("inf")';
    order = Blockly.Python.ORDER_FUNCTION_CALL;
  } else if (code == -Infinity) {
    code = '-float("inf")';
    order = Blockly.Python.ORDER_UNARY_SIGN;
  } else {
    order = code < 0 ? Blockly.Python.ORDER_UNARY_SIGN :
            Blockly.Python.ORDER_ATOMIC;
  }
  return [code, order];
};

Blockly.Python['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.Python.ORDER_ADDITIVE],
    'MINUS': [' - ', Blockly.Python.ORDER_ADDITIVE],
    'MULTIPLY': [' * ', Blockly.Python.ORDER_MULTIPLICATIVE],
    'DIVIDE': [' / ', Blockly.Python.ORDER_MULTIPLICATIVE],
    'POWER': [' ** ', Blockly.Python.ORDER_EXPONENTIATION]
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Python.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Python.valueToCode(block, 'B', order) || '0';
  var code = argument0 + operator + argument1;
  return [code, order];
  // In case of 'DIVIDE', division between integers returns different results
  // in Python 2 and 3. However, is not an issue since Blockly does not
  // guarantee identical results in all languages.  To do otherwise would
  // require every operator to be wrapped in a function call.  This would kill
  // legibility of the generated code.
};

