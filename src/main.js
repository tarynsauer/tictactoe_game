$( document ).ready(function() {
// Player -------------------------------------
  Player = function (marker, playerType) {
    this.marker = marker;
    this.turn = 0;
    this.playerType = playerType;
  };

// Board -------------------------------------
  Board = function (playerOne, playerTwo) {
    this.filledSpaces = { "1A": null, "2A": null, "3A": null,
                          "1B": null, "2B": null, "3B": null,
                          "1C": null, "2C": null, "3C": null };
    this.squares = $( ".board" );
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playerOneMarker = playerOne.marker;
    this.playerTwoMarker = playerTwo.marker;
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

  Board.prototype.getHighScoreCell = function(scoresArray){
    var cellScores = scoresArray.sort(function(a, b) {
      return a[0] > b[0];
    });

    if (cellScores.length > 0) {
      var highestScore = cellScores.pop();
      return highestScore[1];
    }
  };

  Board.prototype.getBestMove = function(openCellsArray, player){
    var cellScores = [];
    var self = this;
    _.each(openCellsArray, function (cellID, index) {
      var score = self.calcScore(cellID, player);
      cellScores.push([score, cellID]);
    });

    return self.getHighScoreCell(cellScores);
  };


  Board.prototype.calcScore = function(cellID, player){
    var score = 0;
    var currentBoard = this.filledSpaces;
    var boardCopy = $.extend(true, {}, currentBoard);
    boardCopy[cellID] = player.marker;
    score += this.lineScore(boardCopy, player, '1A', '2A', '3A');
    score += this.lineScore(boardCopy, player, '1B', '2B', '3B');
    score += this.lineScore(boardCopy, player, '1C', '2C', '3C');

    score += this.lineScore(boardCopy, player, '1A', '1B', '1C');
    score += this.lineScore(boardCopy, player, '2A', '2B', '2C');
    score += this.lineScore(boardCopy, player, '3A', '3B', '3C');

    score += this.lineScore(boardCopy, player, '1A', '2B', '3C');
    score += this.lineScore(boardCopy, player, '3A', '2B', '1C');
    return score;
  };

  Board.prototype.equalityCheck = function(array1, array2){
    var equalityBoolean = _.isEqual(array1, array2);
    return equalityBoolean;
  };

  Board.prototype.lineScore = function(board, player, cell1, cell2, cell3){
    var score = 0;
    var marker = player.marker;
    var opponent = this.opponent(player);
    var otherMarker = opponent.marker;
    var lineValues = _.pick(board, cell1, cell2, cell3);
    var lineArray = _.values(lineValues);
    var sortedArray = lineArray.sort();
    var result1 = this.equalityCheck(sortedArray, [marker, marker, marker]);
    var result2 = this.equalityCheck(sortedArray, [marker, marker, null]);
    var result3 = this.equalityCheck(sortedArray, [marker, null, null]);
    var result4 = this.equalityCheck(sortedArray, [otherMarker, otherMarker, null]);
    var result5 = this.equalityCheck(sortedArray, [otherMarker, null, null]);

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

  Board.prototype.addMarker = function(marker, cellId){
    var currentValue = $( "#" + cellId ).html();
    if (_.isEmpty(currentValue)) {
      $( "#" + cellId ).html(marker);
      $( "#" + cellId ).removeClass("board");
      this.filledSpaces[cellId] = marker;
      this.checkBoardStatus(marker);
      return true;
    } else {
      return false;
    }
  };

  Board.prototype.opponent = function(player) {
    if (player === this.playerOne) {
      return this.playerTwo;
    } else {
      return this.playerOne;
    }
  };

  Board.prototype.opponentMove = function(player) {
    if (player.playerType === 'computer') {
      this.computerMove(player);
    } else {
      this.playerMove(player);
    }
  };

  Board.prototype.playerMove = function( player ) {
    var playerMarker = player.marker;
    var self = this;
    $( this.squares ).click(function(event) {
      var cellId = event.target.id;
      if ($('#' + cellId).hasClass('board') && player.turn === 1) {
        var playerMarker = player.marker;
        var valid = self.addMarker(playerMarker, cellId)
        if (valid) {
          player.turn = 0;
          var opponent = self.opponent(player);
          opponent.turn = 1;
          self.opponentMove(opponent);
        } else {
          self.playerMove(player);
        }
      }

    });
  };

  Board.prototype.randomFirstMove = function( computer ) {
    var cellIDs = _.keys(this.filledSpaces);
    var randomCell = _.sample(cellIDs, 1);
    var opponent = this.opponent(computer);
    var self = this;
    setTimeout(function() {
      if (computer.turn === 1) {
        self.addMarker(computer.marker, randomCell);
        computer.turn = 0;
        opponent.turn = 1;
        self.opponentMove(opponent);
      }
    }, 2000);
  };

  Board.prototype.computerMove = function( computer ) {
    var self = this;
    setTimeout(function() {
      var computerMarker = computer.marker;
      var opponent = self.opponent(computer);

      if (computer.turn === 1) {
        var openCellsArray = self.getOpenCells();
        var cellID = self.getBestMove(openCellsArray, computer);
        self.addMarker(computerMarker, cellID);
        computer.turn = 0;
        opponent.turn = 1;
        self.opponentMove(opponent);
      }
    }, 1500);
  }

  Board.prototype.deactivateBoard = function() {
    this.squares.removeClass('board');
  };

  Board.prototype.winnerCheck = function(marker, cell1, cell2, cell3) {
    var self = this;
    var line = _.pick(this.filledSpaces, cell1, cell2, cell3);
    var lineValues = _.values(line);
    var equality = _.isEqual(lineValues, [marker, marker, marker])
    if (equality) {
      $('#gameMessage').html('Game over! ' + marker + ' wins!');
      self.deactivateBoard();
    }
  };

  Board.prototype.checkBoardStatus = function(marker){
    var self = this;
    self.winnerCheck(marker, '1A', '2A', '3A');
    self.winnerCheck(marker, '1B', '2B', '3B');
    self.winnerCheck(marker, '1C', '2C', '3C');

    self.winnerCheck(marker, '1A', '1B', '1C');
    self.winnerCheck(marker, '2A', '2B', '2C');
    self.winnerCheck(marker, '3A', '3B', '3C');

    self.winnerCheck(marker, '1A', '2B', '3C');
    self.winnerCheck(marker, '3A', '2B', '1C');

    var totalMarks = _.values(self.filledSpaces);
    totalMarks = _.compact(totalMarks);
    if (totalMarks.length === 9) {
      $('#gameMessage').html("Game over! It's a tie!");
      self.deactivateBoard();
    }
  };

// Game -------------------------------------
  Game = function (playerOne, playerTwo, board) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.board = board;
    this.newGame = $('#newGame');
    this.whoGoesFirst();
    this.startGame();
  };

  Game.prototype.gameRestartListener = function() {
    this.newGame.click(function() {
      location.reload();
      this.newGame.addClass('invisible');
      ('.formElements').removeClass('invisible');
    });
  };

  Game.prototype.whoGoesFirst = function(){
    var playerGoesFirst = ['true','false'][Math.round(Math.random())];
    if (playerGoesFirst === 'true') {
      this.playerOne.turn = 1;
      $('#gameMessage').html(this.playerOne.marker + " goes first!");
    } else {
      $('#gameMessage').html(this.playerTwo.marker + " goes first!");
      this.playerTwo.turn = 1;
    }
  };

  Game.prototype.setUpPlayerByType = function(player) {
    // Trigger move logic based on player type
    if (player.playerType === 'computer' && player.turn === 1) {
      this.board.randomFirstMove(player);
    } else if (player.playerType === 'computer' && player.turn === 0) {
      this.board.computerMove(player);
    } else {
      this.board.playerMove(player);
    }
  };

  Game.prototype.startGame = function() {
    this.gameRestartListener();
    this.setUpPlayerByType(this.playerOne);
    this.setUpPlayerByType(this.playerTwo);
  };

// Driver code -------------------------------------

  $('#startGame').click(function(event) {
    event.preventDefault();
    var playerOneMarker = $('#markerPlayerOne').val();
    var playerTwoMarker = $('#markerPlayerTwo').val();
    var playerOneType   = $('#player1Type').prop('checked');
    var playerTwoType   = $('#player2Type').prop('checked');

    if (playerOneMarker === playerTwoMarker) {
      $('#error').html("Player markers can't be the same.");
    } else {

      if (playerOneType) {
        playerOneType = 'computer';
      } else {
        playerOneType = 'human';
      }
      if (playerTwoType) {
        playerTwoType = 'computer';
      } else {
        playerTwoType = 'human';
      }

     $('.formElements').addClass('invisible');
     $('#newGame').removeClass('invisible');
     var playerOne = new Player(playerOneMarker, playerOneType);
     var playerTwo = new Player(playerTwoMarker, playerTwoType);
     var board     = new Board(playerOne, playerTwo);
     var game      = new Game(playerOne, playerTwo, board);
    }

  });

});
