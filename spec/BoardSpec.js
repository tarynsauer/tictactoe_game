describe("Board", function() {

  beforeEach(function() {
    computer = new Player('O', 'human');
    player = new Player('X', 'human');
    board = new Board(computer,player);
    game = new Game(computer, player, board);
    $('body').affix('table.tableBoard tr#rowA')
    $('tr#rowA').affix('td#1A.board')
    $('tr#rowA').affix('td#1B.board')
    $('tr#rowA').affix('td#1C.board')
    $('table.tableBoard').affix('tr#rowB')
    $('tr#rowB').affix('td#2A.board')
    $('tr#rowB').affix('td#2B.board')
    $('tr#rowB').affix('td#2C.board')
    $('table.tableBoard').affix('tr#rowC')
    $('tr#rowC').affix('td#3A.board')
    $('tr#rowC').affix('td#3B.board')
    $('tr#rowC').affix('td#3C.board')
  });

  afterEach(function(){
    $('.tableBoard').remove();
  });

  describe("#addMarker", function() {
    it("adds a marker to the board", function() {
      board.addMarker('X', '2C');
      var cellValue = $('#2C').prop('outerHTML');
      expect(cellValue).toEqual('<td id="2C" class="board">X</td>');
    });

    it("adds the marker ID to the filledSpaces object", function() {
      board.addMarker('X', '2C');
      var filledSpacesArray = board.filledSpaces;
      expect(filledSpacesArray).toEqual({ "1A": null, "2A": null, "3A": null, "1B": null, "2B": null, "3B": null, "1C": null, "2C": 'X', "3C": null });
    });

  });

  describe("#checkLineForWin", function() {
    it("fails to find a winning opportunity", function() {
      board.addMarker('X', '2C');
      board.addMarker('O', '3C');
      board.addMarker('X', '1C');
      var trioResult = board.checkLineForWin(board.playerTwoMarker, '1C', '2C', '3C');
      expect(trioResult).toEqual(false);
    });

    it("finds a winning opportunity", function() {
      board.addMarker('X', '2C');
      board.addMarker('X', '1C');
      var trioResult = board.checkLineForWin(board.playerTwoMarker, '1C', '2C', '3C');
      expect(trioResult).toEqual('3C');
    });
  });

  describe("#findPotentialWin", function() {
    it("returns false if there is no winning move", function() {
      board.addMarker('X', '2C');
      board.addMarker('O', '3C');
      board.addMarker('O', '1C');
      var result = board.findPotentialWin(board.playerOneMarker);
      expect(result).toEqual(false);
    });

    it("finds a winning opportunity", function() {
      board.addMarker('O', '2C');
      board.addMarker('O', '1C');
      var result = board.findPotentialWin(board.playerOneMarker);
      expect(result).toEqual('3C');
    });
  });

  describe("#checkForCorner", function() {
    it("returns coordinate of open corner", function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '3A');
      // board.addMarker('X', '3C');
      var result = board.checkForCorner(board.playerOneMarker);
      expect(result).toEqual('3C');
    });

    it("returns false if no open corners", function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '3A');
      board.addMarker('X', '1C');
      board.addMarker('O', '3C');
      var result = board.checkForCorner(board.playerOneMarker);
      expect(result).toEqual(false);
    });
  });

  describe("#checkForSide", function() {
    it("returns coordinate of open side", function() {
      board.addMarker('X', '2A');
      board.addMarker('O', '2C');
      board.addMarker('X', '1B');
      var result = board.checkForSide(board.playerOneMarker);
      expect(result).toEqual('3B');
    });

    it("returns false if no open sides", function() {
      board.addMarker('X', '2A');
      board.addMarker('O', '2C');
      board.addMarker('X', '1B');
      board.addMarker('O', '3B');
      var result = board.checkForSide(board.playerOneMarker);
      expect(result).toEqual(false);
    });
  });

  describe("#opponent", function() {
    it("returns opponent player X", function() {
      var oppPlayer = board.opponent(computer);
      expect(oppPlayer.marker).toEqual('X');
    });

    it("returns opponent player Y", function() {
      var oppPlayer = board.opponent(player);
      expect(oppPlayer.marker).toEqual('O');
    });
  });

  describe("#opponentMove", function() {
    it("calls #playerMove", function() {
      spyOn(Board.prototype, "playerMove");
      game = new Game(player, computer, board);
      expect(Board.prototype.playerMove).toHaveBeenCalled();
    });

    it("calls #computerMove", function() {
      spyOn(Board.prototype, "computerMove");
      computer = new Player('O', 'computer');
      game = new Game(player, computer, board);
      expect(Board.prototype.computerMove).toHaveBeenCalled();
    });
  });

  describe("#checkGameStatus", function() {
    it("calls #checkGameStatus", function() {
      spyOn(Board.prototype, "checkGameStatus");
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      expect(Board.prototype.checkGameStatus).toHaveBeenCalled();
    });

    it("calls #winnerCheck", function() {
      spyOn(Board.prototype, "winnerCheck");
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      expect(Board.prototype.winnerCheck).toHaveBeenCalled();
    });

    it("calls #checkGameStatus", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '2A');
      board.addMarker('X', '3A');
      board.addMarker('O', '1B');
      board.addMarker('X', '2B');
      board.addMarker('O', '3B');
      board.addMarker('X', '1C');
      board.addMarker('O', '2C');
      board.addMarker('X', '3C');
      var message = $('#gameStatusMessage').html();
      expect(message).toEqual("Game over! It's a tie!");
    });
  });

  describe("#winnerCheck", function() {
    it("identifies a winning row", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '3A');
      board.addMarker('O', '1B');
      board.addMarker('X', '2A');
      var message = $('#gameStatusMessage').html();
      expect(message).toEqual('Game over! X wins!');
    });

    it("identifies a winning column", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '1B');
      board.addMarker('O', '2C');
      board.addMarker('X', '1C');
      var message = $('#gameStatusMessage').html();
      expect(message).toEqual('Game over! X wins!');
    });

    it("identifies a winning diagonal line", function() {
      game = new Game(player, computer, board);
      board.addMarker('O', '1A');
      board.addMarker('X', '3B');
      board.addMarker('O', '2B');
      board.addMarker('X', '2C');
      board.addMarker('O', '3C');
      var message = $('#gameStatusMessage').html();
      expect(message).toEqual('Game over! O wins!');
    });

  });

//   describe("#computerMove", function() {

//       beforeEach(function() {
//         computer = new Player('O', 'computer');
//         player = new Player('X', 'human');
//         board = new Board(computer,player);
//         $('body').affix('table.tableBoard tr#rowA')
//         $('tr#rowA').affix('td#1A.board')
//         $('tr#rowA').affix('td#1B.board')
//         $('tr#rowA').affix('td#1C.board')
//         $('table.tableBoard').affix('tr#rowB')
//         $('tr#rowB').affix('td#2A.board')
//         $('tr#rowB').affix('td#2B.board')
//         $('tr#rowB').affix('td#2C.board')
//         $('table.tableBoard').affix('tr#rowC')
//         $('tr#rowC').affix('td#3A.board')
//         $('tr#rowC').affix('td#3B.board')
//         $('tr#rowC').affix('td#3C.board')
//       });

//       afterEach(function(){
//         $('.tableBoard').remove();
//       });

//     it("calls #opponent", function() {
//       spyOn(Board.prototype, "opponent");
//       computer.turn = 1;
//       player.turn = 0;
//       board.computerMove(computer);
//      expect(Board.prototype.opponent).toHaveBeenCalled();
//     });

})