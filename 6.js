var common = require('./common');
var input = common.readFileIntoArr('./inputs/6.js');
var _ = require('lodash');
var grid;

function setGrid() {
  grid = _.map(_.range(0, 1000), function() {
    return _.map(_.range(0, 1000), function() {
      return 0;
    });
  });
}

setGrid();

var ACTION_TYPES = {
  TURN_ON: {
    verb: 'turn on',
    fn: function(elVal) {
      return elVal + 1;
    }
  },
  TURN_OFF: {
    verb: 'turn off',
    fn: function(elVal) {
      return elVal > 0 ? elVal - 1 : 0;
    }
  },
  TOGGLE: {
    verb: 'toggle',
    fn: function(elVal) {
      return elVal + 2;
    }
  },
};

function getCoordinatePairs(inputStr) {
  var pairs = inputStr.split(' through ');
  return _.map(pairs, function(pair) {
    return _.map(pair.split(','), function(intStr) {
      return parseInt(intStr, 10);
    });
  });
}

function updateGrid(startCoord, endCoord, updateFn) {
  var startX = startCoord[0];
  var startY = startCoord[1];
  var endX = endCoord[0];
  var endY = endCoord[1];

  console.log('startX is: ', startX);
  console.log('startY is: ', startY);
  console.log('endX is: ', endX);
  console.log('endY is: ', endY);

  for (var i = startY; i <= endY; i++) {
    for (var j = 0; j <= grid.length - 1; j++) {
      var isInitialRow = (i === startY);
      var isTerminalRow = (i === endY);

      if (j === 0) { j = startX; }

      if (j > endX)  {
        if (isTerminalRow) {
          return;
        } else {
          break;
        }
      }

      grid[i][j] = updateFn(grid[i][j]);
    }
  }
}

function handleAction(action) {
  var actionType = _.find(ACTION_TYPES, function(type) {
    return _.contains(action, type.verb);
  });

  if (!actionType) {
    return console.error('Unhandled action type for: ', action);
  }

  var verblessString = action.slice(actionType.verb.length + 1);
  var coords = getCoordinatePairs(verblessString);
  console.log(coords);
  var start = coords[0];
  var end = coords[1];


  updateGrid(start, end, actionType.fn);
}

function handleActions(actionsArr) {
  _.each(actionsArr, function(action, i) {
    if (i % 10 === 0) { console.log('Handling action ', i); }
    handleAction(action);
  });

  return _.sum(_.flatten(grid));
}

console.log('%n lights are on.', handleActions(input));

// var testInputs = [
//   { command: 'turn on 0,0 through 999,999', expected: 1000 * 1000 },
//   { command: 'toggle 0,0 through 999,0', expected: 1000 },
//   { command: 'turn on 499,499 through 500,500', expected: 4}
// ];

// _.each(testInputs, function(inputObj) {
//   setGrid();
//   common.testInputs(handleActions, [[inputObj.command]], inputObj.expected);
// });

