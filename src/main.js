$( document ).ready(function() {
// Player -------------------------------------
  Player = function (marker, playerType) {
    this.marker = marker;
    this.turn = 0;
    this.playerType = playerType;
  }

// Board -------------------------------------
  Board = function (playerOne, playerTwo) {
    this.filledSpaces = { "1A": null, "2A": null, "3A": null,
                          "1B": null, "2B": null, "3B": null,
                          "1C": null, "2C": null, "3C": null };
    this.cells = $( ".board" );
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playerOneMarker = playerOne.marker;
    this.playerTwoMarker = playerTwo.marker;
  }

  Board.prototype.addMarker = function(marker, cellId){
    var currentValue = $( "#" + cellId ).html();
    if (_.isEmpty(currentValue)) {
      $( "#" + cellId ).html(marker);
      $( "#" + cellId ).removeClass("board");
      this.filledSpaces[cellId] = marker;
      this.checkGameStatus(marker);
      return true;
    } else {
      return false;
    }

  };

  Board.prototype.findEmptyCell = function(cellSet) {
    var result;
    _.each(cellSet, function (cellValue, cellID) {
      if (cellValue === null) {
        result = cellID;
      }
    });
    return result;
  };

  Board.prototype.checkLineForWin = function(marker, cell1, cell2, cell3){
    var line = _.pick(this.filledSpaces, cell1, cell2, cell3);
    var lineValues = _.values(line);
    var lineValuesSorted = lineValues.sort();
    var equality = _.isEqual(lineValuesSorted, [marker, marker, null])
    if (equality) {
      var emptyCell = this.findEmptyCell(line);
    } else {
      return false;
    }
    return emptyCell;
  };

  Board.prototype.findPotentialWin = function(marker){
    // check if there is a potential winning move
    var rowOne = this.checkLineForWin(marker, '1A', '2A', '3A');
    var rowTwo = this.checkLineForWin(marker, '1B', '2B', '3B');
    var rowThree = this.checkLineForWin(marker, '1C', '2C', '3C');

    var colOne = this.checkLineForWin(marker, '1A', '1B', '1C');
    var colTwo = this.checkLineForWin(marker, '2A', '2B', '2C');
    var colThree = this.checkLineForWin(marker, '3A', '3B', '3C');

    var diagonalOne = this.checkLineForWin(marker, '1A', '2B', '3C');
    var diagonalTwo = this.checkLineForWin(marker, '3A', '2B', '1C');

    var checkResults = _.compact([rowOne, rowTwo, rowThree,
                                colOne, colTwo, colThree,
                                diagonalOne, diagonalTwo]);

    if (checkResults.length > 0) {
      return checkResults.pop();
    } else {
      return false;
    }

  };

  Board.prototype.checkForCorner = function(marker){
    // take a corner if it's free
    var corners = _.pick(this.filledSpaces, '1A', '1C', '3A', '3C');
    var emptyCorner = this.findEmptyCell(corners);
    if (_.isEmpty(emptyCorner)) {
      return false;
    } else {
      return emptyCorner;
    }
  };

  Board.prototype.checkForSide = function(marker){
    // take a side position if it's free
    var sides = _.pick(this.filledSpaces, '2A', '2C', '1B', '3B');
    var emptySide = this.findEmptyCell(sides);
    if (_.isEmpty(emptySide)) {
      return false;
    } else {
      return emptySide;
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
    if (player.turn === 1) {
      $( this.cells ).click(function(event) {
        var cellId = event.target.id;
        var result = self.addMarker(playerMarker, cellId);
        if (result) {
          player.turn = 0;
          var opponent = self.opponent(player);
          opponent.turn = 1;
          self.opponentMove(opponent);
        } else {
          self.playerMove(player);
        }

      });
    }
  };

  Board.prototype.computerMove = function( computer ) {
    var self = this;
    setTimeout(function() {
      var computerMarker = computer.marker;
      var opponent = self.opponent(computer);
      var opponentMarker = opponent.marker;
      var win = self.findPotentialWin(computerMarker);
      var block = self.findPotentialWin(opponentMarker);
      var corner = self.checkForCorner(computerMarker);
      var side = self.checkForSide(computerMarker);

      if (computer.turn === 1) {
        console.log(computer.turn);
        if (win != false) {
          self.addMarker(computerMarker, win);
        } else if (block != false) {
           self.addMarker(computerMarker, block);
        } else if (corner != false) {
          self.addMarker(computerMarker, corner);
        } else if (side != false) {
          self.addMarker(computerMarker, side);
        } else if (self.filledSpaces['2B'] === null) {
          self.addMarker(computerMarker, '2B');
        }
        computer.turn = 0;
        opponent.turn = 1;
        self.opponentMove(opponent);
      }
    }, 2000);
  };

  Board.prototype.winnerCheck = function(marker, cell1, cell2, cell3) {
    var self = this;
    var line = _.pick(this.filledSpaces, cell1, cell2, cell3);
    var lineValues = _.values(line);
    var equality = _.isEqual(lineValues, [marker, marker, marker])
    if (equality) {
      $('#gameMessage').html('Game over! ' + marker + ' wins!');
    }
  }

  Board.prototype.checkGameStatus = function(marker){
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
    }
  }

// Game -------------------------------------
  Game = function (playerOne, playerTwo, board) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.board = board;
    this.winner;
    this.newGame = $('#newGame');
    this.whoGoesFirst();
    this.startGame();
  }

  Game.prototype.restartGameListener = function() {
    this.newGame.click(function() {
      location.reload();
      this.newGame.addClass('invisible');
      ('.settings').removeClass('invisible');
    });
  }

  Game.prototype.whoGoesFirst = function(){
    var playerGoesFirst = ['true','false'][Math.round(Math.random())];
    if (playerGoesFirst === 'true') {
      this.playerOne.turn = 1;
      $('#gameMessage').html(this.playerOne.marker + " goes first!");
    } else {
      $('#gameMessage').html(this.playerTwo.marker + " goes first!");
      this.playerTwo.turn = 1;
    }
  }

  Game.prototype.setUpPlayerByType = function(player) {
    // Trigger move logic based on player type
    if (player.playerType === 'computer') {
      this.board.computerMove(player);
    } else {
      this.board.playerMove(player);
    }
  }

  Game.prototype.startGame = function() {
    this.restartGameListener();
    this.setUpPlayerByType(this.playerOne);
    this.setUpPlayerByType(this.playerTwo);
  }

  Game.prototype.endGame = function() {
    this.playerOne.turn = 2;
    this.playerTwo.turn = 2;
  }

// Driver code -------------------------------------

  $('#startGame').click(function(event) {
    event.preventDefault();
    var playerOneMarker = $('#markerPlayerOne').val();
    var playerTwoMarker = $('#markerPlayerTwo').val();
    var playerOneType   = $('#player1Type').prop('checked');
    var playerTwoType   = $('#player2Type').prop('checked');

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

   $('.settings').addClass('invisible');
   $('#newGame').removeClass('invisible');
   var playerOne = new Player(playerOneMarker, playerOneType);
   var playerTwo = new Player(playerTwoMarker, playerTwoType);
   var board = new Board(playerOne, playerTwo);
   var game = new Game(playerOne, playerTwo, board);
  });

});
