var _ = require('lodash');

function testInputs(fn, inputs, expected) {
  var res = fn.apply(null, inputs);
  if (!_.isEqual(res, expected)) {
    console.trace();
    console.log('Inputs were: ', inputs);
    throw new Error('Expected value [' + expected + '] doesn\'t match returned value [' + res + ']');
  }

  console.log('SUCCESS!');
}

module.exports = {
  testInputs: testInputs
};
