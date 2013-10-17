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

// Board -------------------------------------
  Board = function () {
    this.openSpaces = ["1A", "2A", "3A", "1B", "2B", "3B", "1C", "2C", "3C"];
    this.filledSpaces = [];
    this.cells = $( ".board" );
  }

  Board.prototype.addMarker = function(marker, cellId){
    $( "#" + cellId ).html(marker);
    this.openSpaces.splice( this.openSpaces.indexOf( cellId ), 1 );
    this.filledSpaces.push(cellId);
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
