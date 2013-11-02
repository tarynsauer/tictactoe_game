// Board Class--------------------------------------
  Board = function (playerOne, playerTwo) {
    this.filledSpaces = { '1A': null, '2A': null, '3A': null,
                          '1B': null, '2B': null, '3B': null,
                          '1C': null, '2C': null, '3C': null };
    this.squares = $( '.board' );
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playerOneMarker = playerOne.marker;
    this.playerTwoMarker = playerTwo.marker;
    this.lines = [ new Line('1A', '2A', '3A'),
                   new Line('1B', '2B', '3B'),
                   new Line('1C', '2C', '3C'),
                   new Line('1A', '1B', '1C'),
                   new Line('2A', '2B', '2C'),
                   new Line('3A', '3B', '3C'),
                   new Line('1A', '2B', '3C'),
                   new Line('1C', '2B', '3A'), ]
  };

  // Interface methods-------------------------------------

  Board.prototype.activeCell = function(cellId) {
    return $('#' + cellId).hasClass('board');
  };

  Board.prototype.placeMarkerOnBoard = function(marker, cellId) {
    $( '#' + cellId ).html(marker);
    $( '#' + cellId ).removeClass('board');
  };

  Board.prototype.deactivateBoard = function() {
    this.squares.removeClass('board');
  };

  // ---------------------------------------------------------

  Board.prototype.addMarker = function(marker, cellId){
    if (this.activeCell(cellId)) {
      this.placeMarkerOnBoard(marker, cellId);
      this.filledSpaces[cellId] = marker;
      this.checkBoardStatus(marker);
      return true;
    } else {
      return false;
    }
  };

  Board.prototype.checkBoardStatus = function(marker){
    var self = this;
    _.each(self.lines, function (line) {
      self.winnerCheck(marker, line);
    });
    self.checkForTie();
  };

  Board.prototype.winnerCheck = function(marker, line) {
    var self = this;
    var line = _.pick(self.filledSpaces, line.c1, line.c2, line.c3);
    var lineValues = _.values(line);
    var equal = self.equalityCheck(lineValues, [marker, marker, marker]);
    if (equal) {
      game.showWinMessage(marker);
      self.deactivateBoard();
    }
  };

  Board.prototype.checkForTie = function(){
    var self = this;
    var totalMarks = _.values(self.filledSpaces);
    totalMarks = _.compact(totalMarks);
    if (totalMarks.length === 9) {
      game.showTieMessage();
      self.deactivateBoard();
    }
  };

  Board.prototype.equalityCheck = function(array1, array2){
    var equalityBoolean = _.isEqual(array1, array2);
    return equalityBoolean;
  };

  Board.prototype.getOpenCells = function(){
    var openCells = [];
    var currentCells = this.filledSpaces;
    _.each(currentCells, function (cellValue, cellID) {
      if (cellValue === null) {
        openCells.push(cellID);
      }
    });
    return openCells;
  };