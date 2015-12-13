var _ = require('lodash');
var inputs = require('./inputs/2');
var common = require('./common');


function getWrappingReqsForPackage(l, w, h) {
  var sides = [
    (l*w),
    (w*h),
    (h*l)
  ];

  var min = _.min(sides);
  var doubled = _.map(sides, function(s) { return s * 2 });

  var all = doubled.concat(min);

  return _.sum(all);
}

function parseDims(dimStr) {
  return dimStr.split('x');
}

function getAllPackageReqs(inputArr) {
  return _(inputArr)
    .map(function(input) {
      var parsedInput = parseDims(input);
      return getWrappingReqsForPackage.apply(null, parsedInput);
    })
    .sum()
    .valueOf();
}

function getRibbonLengthForPackage(l, w, h) {
  var sides = _.map(arguments, function(arg) {
    return parseInt(arg, 10);
  });

  sides = sides.sort();
  sides.pop();

  return _.sum(sides) * 2;
}

function getBowLength(l, w, h) {
  return (l * w * h);
}

function getAllRibbonReqs(inputArr) {
  return _(inputArr)
    .map(function(input) {
      var dims = parseDims(input);
      var packageRibbon = getRibbonLengthForPackage.apply(null, dims);
      var bowRibbon = getBowLength.apply(null, dims);
      return packageRibbon + bowRibbon;
    })
    .sum()
    .valueOf();
}

// common.testInputs(getAllRibbonReqs, [['2x4x3']], 34);
// common.testInputs(getAllRibbonReqs, [['1x1x10']], 14);

console.log(getAllRibbonReqs(inputs));
