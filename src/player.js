// Player Class-------------------------------------
  Player = function (marker, playerType) {
    this.marker = marker;
    this.turn = 0;
    this.playerType = playerType;
    this.ai = new AI();
  };

  Player.prototype.opponent = function(player) {
    if (player === playerOne) {
      return playerTwo;
    } else {
      return playerOne;
    }
  };

  Player.prototype.opponentMove = function(player) {
    if (player.playerType === 'computer') {
      player.computerMove(player);
    } else {
      player.playerMove(player);
    }
  };

  Player.prototype.playerMove = function( player ) {
    var playerMarker = player.marker;
    var self = this;
    $(board.squares).click(function(event) {
      if (board.activeCell(event.target.id) && player.turn === 1) {
        var playerMarker = player.marker;
        var valid = board.addMarker(playerMarker, cellId);
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

  Player.prototype.computerMove = function( computer ) {
    var self = this;
    setTimeout(function() {
      var computerMarker = computer.marker;
      var opponent = self.opponent(computer);

      if (computer.turn === 1) {
        var openCellsArray = board.getOpenCells();
        var cellID = self.ai.getBestMove(openCellsArray, computer);
        board.addMarker(computerMarker, cellID);
        computer.turn = 0;
        opponent.turn = 1;
        self.opponentMove(opponent);
      }
    }, 1500);
  }

  Player.prototype.randomFirstMove = function( computer ) {
    var cellIDs = _.keys(board.filledSpaces);
    var randomCell = _.sample(cellIDs, 1);
    var opponent = computer.opponent(computer);
    setTimeout(function() {
      if (computer.turn === 1) {
        board.addMarker(computer.marker, randomCell);
        computer.turn = 0;
        opponent.turn = 1;
        computer.opponentMove(opponent);
      }
    }, 2000);
  };