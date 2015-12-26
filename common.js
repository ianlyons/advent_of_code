var _ = require('lodash');
var fs = require('fs');

function testInputs(fn, inputs, expected) {
  var res = fn.apply(null, inputs);
  if (!_.isEqual(res, expected)) {
    console.trace();
    console.log('Inputs were: ', inputs);
    throw new Error('Expected value [' + expected + '] doesn\'t match returned value [' + res + ']');
  }

  console.log('SUCCESS!');
}

function readFileIntoArr(path) {
  var file = fs.readFileSync(path, {encoding: 'utf-8'});
  return _.compact(file.split('\n'));
}

module.exports = {
  testInputs: testInputs,
  readFileIntoArr: readFileIntoArr
};
