var parenMap = {
  '(': 1,
  ')': -1
};

var getFloor = function(parenList) {
  console.log(parenList.length);
  var count = 0;
  var positions = {
    basement: null,
  };

  for(var i = 0; i < parenList.length; i++) {
    var p = parenList[i];
    count += parenMap[p];
    if (count === -1) {
      return i + 1;
    }
  }

  return count;
}

module.exports = {
  getFloor: getFloor
};
