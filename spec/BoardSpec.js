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
      expect(cellValue).toEqual('<td id="2C" class="">X</td>');
    });

    it("adds the marker ID to the filledSpaces object", function() {
      board.addMarker('X', '2C');
      var filledSpacesArray = board.filledSpaces;
      expect(filledSpacesArray).toEqual({ "1A": null, "2A": null, "3A": null, "1B": null, "2B": null, "3B": null, "1C": null, "2C": 'X', "3C": null });
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
  });

  describe("#checkBoardStatus", function() {
    it("calls #checkBoardStatus", function() {
      spyOn(Board.prototype, "checkBoardStatus");
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      expect(Board.prototype.checkBoardStatus).toHaveBeenCalled();
    });

    it("calls #winnerCheck", function() {
      spyOn(Board.prototype, "winnerCheck");
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      expect(Board.prototype.winnerCheck).toHaveBeenCalled();
    });

    it("calls #checkBoardStatus", function() {
      spyOn(Board.prototype, "checkBoardStatus");
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      expect(Board.prototype.checkBoardStatus).toHaveBeenCalled();
    });

    it("calls #checkBoardStatus", function() {
      game = new Game(player, computer, board);
      board.addMarker('O', '1A');
      board.addMarker('O', '2A');
      board.addMarker('X', '3A');
      board.addMarker('X', '1B');
      board.addMarker('X', '2B');
      board.addMarker('O', '3B');
      board.addMarker('O', '1C');
      board.addMarker('O', '2C');
      board.addMarker('X', '3C');
      var message = $('#gameMessage').html();
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
      var message = $('#gameMessage').html();
      expect(message).toEqual('Game over! X wins!');
    });

    it("identifies a winning column", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '1B');
      board.addMarker('O', '2C');
      board.addMarker('X', '1C');
      var message = $('#gameMessage').html();
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

  describe("#getOpenCells", function() {
    it("returns all open cells as an array", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '2A');
      board.addMarker('X', '3A');
      var result = board.getOpenCells();
      expect(result).toEqual(['1B', '2B', '3B', '1C', '2C', '3C']);
    });
  });

  describe("#calcScore", function() {
    it("returns cellID score array", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '2A');
      board.addMarker('X', '3A');
      var result = board.calcScore('2B', computer)
      expect(result).toEqual(9);
    });
  });

  describe("#getBestMove", function() {
    it("returns the cellID with the highest score", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '1B');
      board.addMarker('X', '3A');
      var openCellsArray = board.getOpenCells();
      var bestMove = board.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2B');
    });

    it("returns the cellID with the highest score", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '3A');
      var openCellsArray = board.getOpenCells();
      var bestMove = board.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2A');
    });

    it("returns the cellID with the highest score", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1C');
      board.addMarker('O', '2A');
      var openCellsArray = board.getOpenCells();
      var bestMove = board.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2B');
    });

    it("returns the cellID of the best move", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '3B');
      board.addMarker('X', '3C');
      var openCellsArray = board.getOpenCells();
      var bestMove = board.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2B');
    });

  });

  describe("#lineScore", function() {
    it("returns correct score of row one", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '1B');
      board.addMarker('X', '3A');
      var currentBoard = board.filledSpaces;
      currentBoard['2B'] = 'O';
      var line = ['1A', '2A', '3A']
      var result = board.lineScore(currentBoard, computer, line)
      expect(result).toEqual(-10);
    });
  });

  describe("#getOpenCells", function() {
    it("returns the cellID of all open cells", function() {
      game = new Game(player, computer, board);
      board.addMarker('X', '1A');
      board.addMarker('O', '1B');
      board.addMarker('X', '3A');
      var result = board.getOpenCells();
      expect(result).toEqual(['2A', '2B', '3B', '1C', '2C', '3C']);
    });
  });

  describe("#getHighScoreCell", function() {
    it("returns the cellID with the highest score", function() {
      game = new Game(player, computer, board);
      var result = board.getHighScoreCell([[8, '2A'], [10, '2B'], [100, '3B'], [-100, '1C'], [-55, '2C']]);
      expect(result).toEqual('3B');
    });
  });

  describe("#equalityCheck", function() {
    it("returns true if arrays are the same", function() {
      game = new Game(player, computer, board);
      var result = board.equalityCheck(['X', 'X', null], ['X', 'X', null]);
      expect(result).toBe(true);
    });

    it("returns false if arrays are not the same", function() {
      game = new Game(player, computer, board);
      var result = board.equalityCheck(['X', 'X', null], ['X', null, null]);
      expect(result).toBe(false);
    });
  });

  describe("#randomFirstMove", function() {
    it("calls #addMarker", function() {
      spyOn(Board.prototype, "addMarker");
      computer.turn = 1;
      game = new Game(player, computer, board);
      board.randomFirstMove(computer);
      expect(Board.prototype.addMarker).toHaveBeenCalled();
    });

    it("calls #opponentMove", function() {
      spyOn(Board.prototype, "opponentMove");
      game = new Game(player, computer, board);
      computer.turn = 1
      board.randomFirstMove(computer);
      expect(Board.prototype.opponentMove).toHaveBeenCalled();
    });

    it("returns a cellID string", function() {
      game = new Game(player, computer, board);
      computer.turn = 1;
      var result = board.randomFirstMove(computer);
      expect(result)(jasmine.any(String));
    });
  });
})