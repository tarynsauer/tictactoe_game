$( document ).ready(function() {
// Player -------------------------------------
  Player = function (marker) {
    this.marker = marker;
  }

  Player.prototype.playerMove = function( board ) {
    var playerMarker = this.marker;
    $( board.cells ).click(function(event) {
      var cellId = event.target.id;
      board.addMarker(playerMarker, cellId);
    });
  };

// Computer -------------------------------------
  Computer = function (marker) {
    this.marker = marker;
  }

  Computer.prototype.computerMove = function( board ) {
    var computerMarker = this.marker;
    // add logic for computer moves
  };

// Board -------------------------------------
  Board = function () {
    this.filledSpaces = { "1A": null, "2A": null, "3A": null,
    "1B": null, "2B": null, "3B": null, "1C": null, "2C": null, "3C": null };
    this.cells = $( ".board" );
  }

  Board.prototype.addMarker = function(marker, cellId){
    $( "#" + cellId ).html(marker);
    this.filledSpaces[cellId] = marker;
  };

  Board.prototype.findEmptyCell = function(cellSet) {
    var result;
    _.each(trio, function (cellValue, cellID) {
      if (cellValue === null) {
        result = cellID;
      }
    });
    return result;
  };

  Board.prototype.checkTrioForWin = function(marker, cell1, cell2, cell3){
    var trio = _.pick(this.filledSpaces, cell1, cell2, cell3);
    var trioValues = _.values(trio);
    var trioValuesSorted = trioValues.sort();
    var equality = _.isEqual(trioValuesSorted, [marker, marker, null])
    if (equality === false) {
      return false;
    } else {
      // this needs to be refactored to findEmptyCell()
      var result;
      _.each(trio, function (cellValue, cellID) {
        if (cellValue === null) {
          result = cellID;
        }
      });
      return result;
    }
  };

  Board.prototype.findPotentialWin = function(marker){
    // check if there is a potential winning move
    var rowOne = this.checkTrioForWin(marker, '1A', '1B', '1C');
    var rowTwo = this.checkTrioForWin(marker, '2A', '2B', '2C');
    var rowThree = this.checkTrioForWin(marker, '3A', '3B', '3C');

    var colOne = this.checkTrioForWin(marker, '1A', '2A', '3A');
    var colTwo = this.checkTrioForWin(marker, '1B', '2B', '3B');
    var colThree = this.checkTrioForWin(marker, '1C', '2C', '3C');

    var diagonalOne = this.checkTrioForWin(marker, '1A', '2B', '3C');
    var diagonalTwo = this.checkTrioForWin(marker, '3A', '2B', '1C');

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

  };

  Board.prototype.checkSides = function(marker){
    // take a side position if it's free
  };

// Game -------------------------------------
  Game = function (player, computer, board) {
    this.player = player;
    this.computer = computer;
    this.board = board;
    this.winner;
    this.newGame = $('#newGame');
    this.playersTurn = this.whoGoesFirst();
    this.startGame();
  }

  Game.prototype.startGame = function() {
    this.restartGameListener();
    this.checkGameStatus();
  }

  Game.prototype.nextPlayersTurn = function() {
    if (this.playersTurn === 'player') {
      this.playersTurn = 'computer';
    } else {
      this.playersTurn = 'player';
      this.player.playerMove(this.board);
    }
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
      this.player.playerMove(this.board);
      return 'player';
    } else {
      return 'computer';
    }
  }

// Driver code -------------------------------------
  var computer = new Computer('O');
  var player = new Player('X');
  var board = new Board();
  var game = new Game(player, computer, board);
});
