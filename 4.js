var md5 = require('md5');
var common = require('./common');
var _ = require('lodash');
var MAX = 100000000;

function getHashNumber(input) {
  for(var j = 0; j < MAX; j++) {
    var toHash = input + j;
    var hashed = md5(toHash);

    if (hashed.substring(0,6) == '000000') {
      return j;
    }
  }
}

// common.testInputs(getHashNumber, ['abcdef'], 609043);
// common.testInputs(getHashNumber, ['pqrstuv'], 1048970);
console.log(getHashNumber('yzbqklnj'));
