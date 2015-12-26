var common = require('./common');
var _ = require('lodash');
var input = require('./inputs/5');

var vowels = 'aeiou'.split('');
var illegalStrings = ['ab', 'cd', 'pq', 'xy'];


// DAY ONE

function hasNoIllegalStrings(input) {
  return !_.any(illegalStrings, function(str) {
    return _.contains(input, str);
  });
}

// common.testInputs(hasNoIllegalStrings, ['abiouweroiukjlkjlk'], false);
// common.testInputs(hasNoIllegalStrings, ['iouweroicdukjlkjlk'], false);
// common.testInputs(hasNoIllegalStrings, ['uyiuyiuyiuyiuyiu'], true);

function hasOneDoubleLetter(input) {
  var doubleCharRegExp = new RegExp(/([a-z])\1/i);
  return doubleCharRegExp.test(input);
}

// common.testInputs(hasOneDoubleLetter, ['dsuyfijdkshkfh'], false);
// common.testInputs(hasOneDoubleLetter, ['ajakasdjlk'], false);
// common.testInputs(hasOneDoubleLetter, ['jkahsdjkhuukjh'], true);

function hasAtLeastThreeVowels(input) {
  var count = 0;
  function moreThanThree() {
    return count >= 3;
  }

  _.each(input, function(ch) {
    if (_.contains(vowels, ch)) {
      count++;
      if (moreThanThree()) {
        return false; //break each loop early
      }
    }
  });

  return moreThanThree();
}

// common.testInputs(hasAtLeastThreeVowels, ['mmmmmmmmdaa'], false);
// common.testInputs(hasAtLeastThreeVowels, ['aijhjhjhjhjh'], false);
// common.testInputs(hasAtLeastThreeVowels, ['ejhkhokjhkhi'], true);

function matchesDay1Rules(input) {
  return _.all([hasOneDoubleLetter, hasNoIllegalStrings, hasAtLeastThreeVowels], function(ruleFn) {
    return ruleFn(input);
  });
}

// common.testInputs(matchesDay1Rules, ['ugknbfddgicrmopn'], true);
// common.testInputs(matchesDay1Rules, ['aaa'], true);
// common.testInputs(matchesDay1Rules, ['jchzalrnumimnmhp'], false);
// common.testInputs(matchesDay1Rules, ['haegwjzuvuyypxyu'], false);
// common.testInputs(matchesDay1Rules, ['dvszwmarrgswjxmb'], false);

// DAY 2

function hasMultipleTwoLetterPairs(input) {
  var wasFound = false;
  _.each(input, function(ch, i) {
    var nextIdx = i+2;
    var twoLetterPair = input.substring(i, nextIdx);
    var restOfString = input.substring(nextIdx);
    wasFound = _.contains(restOfString, twoLetterPair);
    if (wasFound) return false; // break loop early
  });

  return wasFound;
}

// common.testInputs(hasMultipleTwoLetterPairs, ['xyxy'], true);
// common.testInputs(hasMultipleTwoLetterPairs, ['aabcdefgaa'], true);
// common.testInputs(hasMultipleTwoLetterPairs, ['aaa'], false);

function hasRepeatingLetterWithLetterInTheMiddle(input) {
  return _.any(input, function(ch, i) {
    return (ch == input[i + 2]);
  });
}

function matchesDay2Rules(input) {
  return _.all([hasMultipleTwoLetterPairs, hasRepeatingLetterWithLetterInTheMiddle], function(ruleFn) {
    // if (!ruleFn(input)) {
    //   console.log('Broken rule was: ', ruleFn);
    // }
    return ruleFn(input);
  });
}

// common.testInputs(matchesDay2Rules, ['qjhvhtzxzqqjkmpb'], true);
// common.testInputs(matchesDay2Rules, ['xxyxx'], true);
// common.testInputs(matchesDay2Rules, ['uurcxstgmygtbstg'], false);
// common.testInputs(matchesDay2Rules, ['ieodomkazucvgmuy'], false);


function sumValidInputs(inputArr) {
  return _.sum(_.map(inputArr, function(input) {
    return matchesDay2Rules(input) ? 1 : 0;
  }));
}

console.log(sumValidInputs(input));

