// Game Class-------------------------------------
  Game = function (board) {
    this.playerOne = board.playerOne;
    this.playerTwo = board.playerTwo;
    this.board = board;
    this.ai = new AI();
    this.newGame = $('#newGame');
    this.whoGoesFirst();
    this.startGame();
  };

  Game.prototype.showNewGameForm = function(marker) {
    this.newGame.addClass('invisible');
    ('.formElements').removeClass('invisible');
  };

  Game.prototype.firstMoveMessage = function(marker) {
    $('#gameMessage').html(marker + ' goes first!');
  };

  Game.prototype.showWinMessage = function(marker) {
    $('#gameMessage').html('Game over! ' + marker + ' wins!');
  };

  Game.prototype.showTieMessage = function() {
    $('#gameMessage').html("Game over! It's a tie!");
  };

  Game.prototype.gameRestartListener = function() {
    this.newGame.click(function() {
      location.reload();
      this.showNewGameForm();
    });
  };

  Game.prototype.whoGoesFirst = function(){
    var playerGoesFirst = ['true','false'][Math.round(Math.random())];
    if (playerGoesFirst === 'true') {
      this.playerOne.turn = 1;
      this.firstMoveMessage(this.playerOne.marker);
    } else {
      this.firstMoveMessage(this.playerTwo.marker);
      this.playerTwo.turn = 1;
    }
  };

  Game.prototype.setUpPlayerByType = function(player) {
    if (player.playerType === 'computer' && player.turn === 1) {
      player.randomFirstMove(player);
    } else if (player.playerType === 'computer' && player.turn === 0) {
      player.computerMove(player);
    } else {
      player.playerMove(player);
    }
  };

  Game.prototype.startGame = function() {
    this.gameRestartListener();
    this.setUpPlayerByType(this.playerOne);
    this.setUpPlayerByType(this.playerTwo);
  };