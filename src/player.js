// Player Class-------------------------------------
  Player = function (marker, playerType) {
    this.marker = marker;
    this.turn = 0;
    this.playerType = playerType;
    this.ai = new AI();
    this.opponent;
  };

  Player.prototype.randomFirstMove = function(computer) {
    var cellIDs = _.keys(board.filledSpaces);
    var randomCell = _.sample(cellIDs, 1);
    setTimeout(function() {
      if (computer.turn === 1) {
        board.addMarker(computer.marker, randomCell);
        computer.turn = 0;
        computer.opponent.turn = 1;
        computer.opponentMove(computer.opponent);
      }
    }, 2000);
  };

  Player.prototype.playerMove = function(player) {
    var playerMarker = player.marker;
    var self = this;
    $(board.squares).click(function(event) {
      var cellId = event.target.id;
      if (board.activeCell(cellId) && player.turn === 1) {
        var playerMarker = player.marker;
        var valid = board.addMarker(playerMarker, cellId);
        if (valid) {
          player.turn = 0;
          player.opponent.turn = 1;
          self.opponentMove(player.opponent);
        } else {
          self.playerMove(player);
        }
      }
    });
  };

  Player.prototype.computerMove = function(computer) {
    var self = this;
    setTimeout(function() {
      var computerMarker = computer.marker;
      if (computer.turn === 1) {
        var openCellsArray = board.getOpenCells();
        var cellID = self.ai.getBestMove(openCellsArray, computer);
        board.addMarker(computerMarker, cellID);
        computer.turn = 0;
        computer.opponent.turn = 1;
        self.opponentMove(computer.opponent);
      }
    }, 1500);
  };

  Player.prototype.opponentMove = function(player) {
    if (player.playerType === 'computer') {
      player.computerMove(player);
    } else {
      player.playerMove(player);
    }
  };