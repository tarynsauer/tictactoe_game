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
    this.filledSpaces = { "1A": null, "2A": null, "3A": null, "1B": null, "2B": null, "3B": null, "1C": null, "2C": null, "3C": null };
    this.cells = $( ".board" );
  }

  Board.prototype.addMarker = function(marker, cellId){
    $( "#" + cellId ).html(marker);
    this.filledSpaces[cellId] = marker;
  };

  Board.prototype.checkTrioForWin = function(marker, cell1, cell2, cell3){
    var trio = _.pick(this.filledSpaces, cell1, cell2, cell3);
    var trioValues = _.values(trio);
    var trioValuesSorted = trioValues.sort();
    var equality = _.isEqual(trioValuesSorted, [marker, marker, null])
    return equality;
  };

  Board.prototype.findPotentialWin = function(marker){
    // check if you can win on next move
    var markedCells = this.filledSpaces.getCellsByMarker(marker);

  };

  Board.prototype.blockOpponentWin = function(marker){
    // check if opponent can win on next move
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
