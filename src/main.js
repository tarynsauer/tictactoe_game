$( document ).ready(function() {
// Player -------------------------------------
  Player = function (marker) {
    this.marker = marker;
    this.turn = 0;
  }

// Computer -------------------------------------
  Computer = function (marker) {
    this.marker = marker;
    this.turn = 0;
  }

  // Computer.prototype.computerMove = function( board ) {
  //   var computerMarker = board.playerOneMarker;
  //   var playerMarker = board.playerTwoMarker;
  //   var win = board.findPotentialWin(computerMarker);
  //   var block = board.findPotentialWin(playerMarker);
  //   var corner = board.checkForCorner(computerMarker);
  //   var side = board.checkForSide(computerMarker);

  //   if (win != false) {
  //     board.addMarker(computerMarker, win);
  //   } else if (block != false) {
  //     board.addMarker(playerMarker, block);
  //   } else if (corner != false) {
  //     board.addMarker(computerMarker, corner);
  //   } else if (side != false) {
  //     board.addMarker(computerMarker, side);
  //   } else {
  //     board.addMarker(computerMarker, '2B');
  //   }
  // };

// Board -------------------------------------
  Board = function (playerOne, playerTwo) {
    this.filledSpaces = { "1A": null, "2A": null, "3A": null,
                          "1B": null, "2B": null, "3B": null,
                          "1C": null, "2C": null, "3C": null };
    this.cells = $( ".board" );
    this.playerOneMarker = playerOne.marker;
    this.playerTwoMarker = playerTwo.marker;
  }

  Board.prototype.addMarker = function(marker, cellId){
    $( "#" + cellId ).html(marker);
    this.filledSpaces[cellId] = marker;
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
    if (equality === false) {
      return false;
    } else {
      var emptyCell = this.findEmptyCell(line);
    }
    return emptyCell;
  };

  Board.prototype.findPotentialWin = function(marker){
    // check if there is a potential winning move
    var rowOne = this.checkLineForWin(marker, '1A', '1B', '1C');
    var rowTwo = this.checkLineForWin(marker, '2A', '2B', '2C');
    var rowThree = this.checkLineForWin(marker, '3A', '3B', '3C');

    var colOne = this.checkLineForWin(marker, '1A', '2A', '3A');
    var colTwo = this.checkLineForWin(marker, '1B', '2B', '3B');
    var colThree = this.checkLineForWin(marker, '1C', '2C', '3C');

    var diagonalOne = this.checkLineForWin(marker, '1A', '2B', '3C');
    var diagonalTwo = this.checkLineForWin(marker, '3A', '2B', '1C');

    if (rowOne != false) {
      return rowOne;
    } else if (rowTwo != false) {
      return rowTwo;
    } else if (rowThree != false) {
      return rowThree;
    } else if (colOne != false) {
      return colOne;
    } else if (colTwo != false) {
      return colTwo;
    } else if (colThree != false) {
      return colThree;
    } else if (diagonalOne != false) {
      return diagonalOne;
    } else if (diagonalTwo != false) {
      return diagonalTwo;
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

  Board.prototype.playerMove = function( player ) {
    var playerMarker = player.marker;
    var self = this;
    if (player.turn === 1) {
      $( this.cells ).click(function(event) {
        var cellId = event.target.id;
        self.addMarker(playerMarker, cellId);
        player.turn = 0;
      });
    }
  };

  Computer.prototype.computerMove = function( computer ) {
    var computerMarker = this.playerOneMarker;
    var playerMarker = this.playerTwoMarker;
    var win = this.findPotentialWin(computerMarker);
    var block = this.findPotentialWin(playerMarker);
    var corner = this.checkForCorner(computerMarker);
    var side = this.checkForSide(computerMarker);

    if (computer.turn === 1) {
      if (win != false) {
        this.addMarker(computerMarker, win);
      } else if (block != false) {
        this.addMarker(playerMarker, block);
      } else if (corner != false) {
        this.addMarker(computerMarker, corner);
      } else if (side != false) {
        this.addMarker(computerMarker, side);
      } else {
        this.addMarker(computerMarker, '2B');
      }
    }
    computer.turn = 0;
  };

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

  Game.prototype.startGame = function() {
    this.restartGameListener();
    this.checkGameStatus();
  }

  Game.prototype.restartGameListener = function() {
    this.newGame.click(function() {
      location.reload();
    });
  }

  Game.prototype.checkGameStatus = function(){
    var self = this.board;
    this.board.cells.click(function() {
      if (self.filledSpaces.length === 9) {
        $('#gameStatusMessage').html('Game over!');
      }
    });
  }

  Game.prototype.whoGoesFirst = function(){
    var playerGoesFirst = ['true','false'][Math.round(Math.random())];
    if (playerGoesFirst === 'true') {
      this.playerOne.turn = 1;
    } else {
      this.playerTwo.turn = 1;
    }
  }

// Driver code -------------------------------------
  var computer = new Computer('O');
  var player = new Player('X');
  var board = new Board(computer, player);
  var game = new Game(player, computer, board);
});
