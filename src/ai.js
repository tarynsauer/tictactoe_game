// AI Class---------------------------------------
  AI = function () {
  };

  AI.prototype.getHighScoreCell = function(scoresArray){
    var cellScores = scoresArray.sort(function(a, b) {
      return a[0] - b[0];
    });
    if (cellScores.length > 0) {
      var highestScore = cellScores.pop();
      return highestScore[1];
    }
  };

  AI.prototype.getBestMove = function(openCellsArray, player){
    var cellScores = [];
    var self = this;
    _.each(openCellsArray, function (cellID, index) {
      var score = self.calcScore(cellID, player);
      cellScores.push([score, cellID]);
    });
    return self.getHighScoreCell(cellScores);
  };

  AI.prototype.lineValuesArray = function(line, boardSpaces){
    var lineValues = _.pick(boardSpaces, line.c1, line.c2, line.c3);
    var lineArray = _.values(lineValues);
    return lineArray.sort();
  };

  AI.prototype.lineScore = function(boardSpaces, player, line){
    var score = 0;
    var marker = player.marker;
    var otherMarker = player.opponent.marker;
    var sortedArray = this.lineValuesArray(line, boardSpaces);
    var result1 = board.equalityCheck(sortedArray, [marker, marker, marker]);
    var result2 = board.equalityCheck(sortedArray, [marker, marker, null]);
    var result3 = board.equalityCheck(sortedArray, [marker, null, null]);
    var result4 = board.equalityCheck(sortedArray, [otherMarker, otherMarker, null]);
    var result5 = board.equalityCheck(sortedArray, [otherMarker, null, null]);

    if (result1) {
      score += 100;
    } else if (result2) {
      score += 10;
    } else if (result3) {
      score += 1;
    } else if (result4) {
      score -= 10;
    }else if (result5) {
      score -= 1;
    }
    return score;
  };

  AI.prototype.calcScore = function(cellID, player){
    var self = this;
    var score = 0;
    var currentBoard = board.filledSpaces;
    var boardCopy = $.extend(true, {}, currentBoard);
    boardCopy[cellID] = player.marker;
    _.each(board.lines, function (line) {
      score += self.lineScore(boardCopy, player, line)
    });
    return score;
  };