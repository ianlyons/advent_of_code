var input = require('./inputs/3');
var common = require('./common');
var _ = require('lodash');

var hash = {};

function elementWiseAdd(curr, transform) {
  return _.map(curr, function(n, i) {
    return n += transform[i];
  });
}

// common.testInputs(elementWiseAdd, [[0, 0], [-1, 0]], [-1, 0]);
// common.testInputs(elementWiseAdd, [[0, 5], [-2, 0]], [-2, 5]);

function makeKey(loc) {
  return loc.join(',');
}

function setCurrInHash(curr) {
  hash[makeKey(curr)] = true;
}

function getAllLocations(inputArr) {
  var currS = [0, 0];
  var currR = [0, 0];
  var transforms = {
    '^': [0, -1],
    'v': [0, 1],
    '>': [1, 0],
    '<': [-1, 0]
  };

  setCurrInHash(currS);

  _.each(inputArr, function(input, i) {
    if (i % 2 === 0) {
      currS = elementWiseAdd(currS, transforms[input]);
      setCurrInHash(currS);
    } else {
      currR = elementWiseAdd(currR, transforms[input]);
      setCurrInHash(currR);
    }
  });

  return _.keys(hash).length;
}

var splitInput = input.split('');
// var test1 = '^v^v^v^v^v'.split('');
// common.testInputs(getAllLocations, [test1], 11);

console.log(getAllLocations(splitInput));
