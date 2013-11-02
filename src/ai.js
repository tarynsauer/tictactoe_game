// AI Class---------------------------------------
  AI = function () {
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

  AI.prototype.calcScore = function(cellID, player){
    var self = this;
    var score = 0;
    var currentBoard = board.filledSpaces;
    var boardCopy = $.extend(true, {}, currentBoard);
    boardCopy[cellID] = player.marker;
    _.each(board.lines, function(line) {
      score += self.lineScore(boardCopy, player, line)
    });
    return score;
  };

  AI.prototype.lineScore = function(boardSpaces, player, line){
    var score = 0;
    var marker = player.marker;
    var otherMarker = player.opponent.marker;
    var lineOptionScores = [[[marker, marker, marker], 100],
                             [[marker, marker, null], 10],
                             [[marker, null, null], 1],
                             [[otherMarker, otherMarker, null], -10],
                             [[otherMarker, null, null], -1]];
    var sortedArray = this.lineValuesArray(line, boardSpaces);
    _.each(lineOptionScores, function(line) {
       if (board.equalityCheck(sortedArray, line[0])) {
         score += line[1];
       }
    });
    return score;
  };

  AI.prototype.lineValuesArray = function(line, boardSpaces){
    var lineValues = _.pick(boardSpaces, line.c1, line.c2, line.c3);
    var lineArray = _.values(lineValues);
    return lineArray.sort();
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