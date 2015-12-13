var common = require('./common');
var vowels = 'aeiou'.split('');
var illegalStrings = ['ab', 'cd', 'pq', 'xy'];
var _ = require('lodash');
var input = require('./inputs/5');

function hasNoIllegalStrings(input) {
  return !_.any(illegalStrings, function(str) {
    return _.contains(input, str);
  });
}

common.testInputs(hasNoIllegalStrings, ['abiouweroiukjlkjlk'], false);
common.testInputs(hasNoIllegalStrings, ['iouweroicdukjlkjlk'], false);
common.testInputs(hasNoIllegalStrings, ['uyiuyiuyiuyiuyiu'], true);

function hasOneDoubleLetter(input) {
  return new RegExp(/([a-z])\1/i).test(input);
}

common.testInputs(hasOneDoubleLetter, ['dsuyfijdkshkfh'], false);
common.testInputs(hasOneDoubleLetter, ['ajakasdjlk'], false);
common.testInputs(hasOneDoubleLetter, ['jkahsdjkhuukjh'], true);

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

common.testInputs(hasAtLeastThreeVowels, ['mmmmmmmmdaa'], false);
common.testInputs(hasAtLeastThreeVowels, ['aijhjhjhjhjh'], false);
common.testInputs(hasAtLeastThreeVowels, ['ejhkhokjhkhi'], true);

function matchesRules(input) {
  return _.all([hasOneDoubleLetter, hasNoIllegalStrings, hasAtLeastThreeVowels], function(ruleFn) {
    return ruleFn(input);
  });
}

common.testInputs(matchesRules, ['ugknbfddgicrmopn'], true);
common.testInputs(matchesRules, ['aaa'], true);
common.testInputs(matchesRules, ['jchzalrnumimnmhp'], false);
common.testInputs(matchesRules, ['haegwjzuvuyypxyu'], false);
common.testInputs(matchesRules, ['dvszwmarrgswjxmb'], false);

function sumValidInputs(inputArr) {
  return _.sum(_.map(inputArr, function(input) {
    return matchesRules(input) ? 1 : 0;
  }));
}

console.log(input.length);
console.log(sumValidInputs(input));
