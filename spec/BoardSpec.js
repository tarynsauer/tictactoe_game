describe('Board', function() {

  beforeEach(function() {
    computer = new Player('O', 'computer');
    player = new Player('X', 'human');
    board = new Board(computer,player);
    game = new Game(board);
    $('body').affix('h1#gameMessage')
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
    $('h1#gameMessage').remove();
    $('.tableBoard').remove();
  });

  describe('create new board', function() {
    it('has a filledSpaces object attribute', function() {
      expect(board.filledSpaces).toEqual({
        '1A': null, '2A': null, '3A': null,
        '1B': null, '2B': null, '3B': null,
        '1C': null, '2C': null, '3C': null });
    });

    it('has a filledSpaces object attribute', function() {
      expect(board.squares).toEqual(jasmine.any(Object));
    });

    it('has a playerOne object attribute', function() {
      expect(board.playerOne).toEqual(computer);
    });

    it('has a playerTwo object attribute', function() {
      expect(board.playerTwo).toEqual(player);
    });

    it('has a playerOneMarker object attribute', function() {
      expect(board.playerOneMarker).toEqual('O');
    });

    it('has a playerTwoMarker object attribute', function() {
      expect(board.playerTwoMarker).toEqual('X');
    });

    it('creates eight new line objects', function() {
      expect(board.lines.length).toEqual(8);
    });

    it('board has an array of new line objects', function() {
      expect(board.lines).toEqual(jasmine.any(Array));
    });

  });

  describe('#addMarker', function() {
    it('adds a marker to the board', function() {
      board.addMarker('X', '2C');
      var cellValue = $('#2C').prop('outerHTML');
      expect(cellValue).toEqual('<td id="2C" class="">X</td>');
    });

    it('adds the marker ID to the filledSpaces object', function() {
      board.addMarker('X', '2C');
      var filledSpacesArray = board.filledSpaces;
      expect(filledSpacesArray).toEqual({ '1A': null, '2A': null, '3A': null,
        '1B': null, '2B': null, '3B': null, '1C': null, '2C': 'X', '3C': null });
    });

  });

  describe('#playerMove', function() {
    it('calls #addMarker', function() {
      spyOn(board, "playerMove");
      game = new Game(board);
      computer.turn = 0;
      player.turn = 1;
      $('#1A').trigger('click');
      expect(board.playerMove).toHaveBeenCalled();
    });

    // it('calls #opponent', function() {
    //   spyOn(board, "opponent");
    //   game = new Game(board);
    //   computer.turn = 0;
    //   player.turn = 1;
    //   board.playerMove(player);
    //   expect(board.opponent).toHaveBeenCalled();
    // });

    // it('calls #opponentMove', function() {
    //   spyOn(board, "opponentMove");
    //   game = new Game(board);
    //   computer.turn = 0;
    //   player.turn = 1;
    //   board.playerMove(player);
    //   expect(board.opponentMove).toHaveBeenCalled();
    // });

    // it('changes assigns player turn to 0', function() {
    //   spyOn(board, "opponentMove");
    //   game = new Game(board);
    //   computer.turn = 0;
    //   player.turn = 1;
    //   board.playerMove(player);
    //   expect(player.turn).toEqual(0);
    // });

    it('assigns opponent turn value to 1', function() {
      spyOn(board, "opponentMove");
      game = new Game(board);
      computer.turn = 0;
      player.turn = 1;
      board.playerMove(player);
      expect(computer.turn).toEqual(1);
    });

  });

  describe('#computerMove', function() {
    it('calls #opponent', function() {
      spyOn(board, "opponent");
      game = new Game(board);
      computer.turn = 1;
      player.turn = 0;
      board.computerMove(computer);
      expect(board.opponent).toHaveBeenCalled();
    });

    it('calls #getOpenCells', function() {
    });

    it('calls #getBestMove', function() {
    });

    it('calls #addMarker', function() {
    });

    it('calls #opponentMove', function() {
    });
  });

  describe('#opponent', function() {
    it('returns opponent player X', function() {
      var oppPlayer = board.opponent(computer);
      expect(oppPlayer.marker).toEqual('X');
    });

    it('returns opponent player Y', function() {
      var oppPlayer = board.opponent(player);
      expect(oppPlayer.marker).toEqual('O');
    });
  });

  describe('#opponentMove', function() {
    it('calls #playerMove', function() {
      spyOn(Board.prototype, 'playerMove');
      board.opponentMove(player);
      expect(Board.prototype.playerMove).toHaveBeenCalled();
    });

    it('calls #computerMove', function() {
      spyOn(Board.prototype, 'computerMove');
      board.opponentMove(computer);
      expect(Board.prototype.computerMove).toHaveBeenCalled();
    });
  });

  describe('#checkBoardStatus', function() {
    it('calls #checkBoardStatus', function() {
      spyOn(Board.prototype, 'checkBoardStatus');
      game = new Game(board);
      board.addMarker('X', '1A');
      expect(Board.prototype.checkBoardStatus).toHaveBeenCalled();
    });

    it('calls #winnerCheck', function() {
      spyOn(Board.prototype, 'winnerCheck');
      game = new Game(board);
      board.addMarker('X', '1A');
      expect(Board.prototype.winnerCheck).toHaveBeenCalled();
    });

    it('calls #checkForTie', function() {
      spyOn(Board.prototype, 'checkForTie');
      game = new Game(board);
      board.addMarker('X', '1A');
      expect(Board.prototype.checkForTie).toHaveBeenCalled();
    });

    it('returns tie message when appropriate', function() {
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

  describe('#winnerCheck', function() {
    it('identifies a winning row', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '3A');
      board.addMarker('O', '1B');
      board.addMarker('X', '2A');
      var message = $('#gameMessage').html();
      expect(message).toEqual('Game over! X wins!');
    });

    it('identifies a winning column', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '1B');
      board.addMarker('O', '2C');
      board.addMarker('X', '1C');
      var message = $('#gameMessage').html();
      expect(message).toEqual('Game over! X wins!');
    });

    it('identifies a winning diagonal line', function() {
      board.addMarker('O', '1A');
      board.addMarker('X', '3B');
      board.addMarker('O', '2B');
      board.addMarker('X', '2C');
      board.addMarker('O', '3C');
      var message = $('#gameMessage').html();
      expect(message).toEqual('Game over! O wins!');
    });

  });

  describe('#deactivateBoard', function() {
    it('removes board class from all cells', function() {
      board.deactivateBoard();
      var result = $('.board');
      expect(result).toBeNull();
    });
  });

  describe('#getOpenCells', function() {
    it('returns all open cells as an array', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '2A');
      board.addMarker('X', '3A');
      var result = board.getOpenCells();
      expect(result).toEqual(['1B', '2B', '3B', '1C', '2C', '3C']);
    });
  });

  describe('#calcScore', function() {
    it('returns cellID score array', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '2A');
      board.addMarker('X', '3A');
      var result = board.calcScore('2B', computer)
      expect(result).toEqual(9);
    });
  });

  describe('#getBestMove', function() {
    it('returns the cellID with the highest score', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '1B');
      board.addMarker('X', '3A');
      var openCellsArray = board.getOpenCells();
      var bestMove = board.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2B');
    });

    it('returns the cellID with the highest score', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '3A');
      var openCellsArray = board.getOpenCells();
      var bestMove = board.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2A');
    });

    it('returns the cellID with the highest score', function() {
      board.addMarker('X', '1C');
      board.addMarker('O', '2A');
      var openCellsArray = board.getOpenCells();
      var bestMove = board.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2B');
    });

    it('returns the cellID of the best move', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '3B');
      board.addMarker('X', '3C');
      var openCellsArray = board.getOpenCells();
      var bestMove = board.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2B');
    });

  });

  describe('#lineScore', function() {
    it('returns correct score of row one', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '1B');
      board.addMarker('X', '3A');
      var currentBoard = board.filledSpaces;
      currentBoard['2B'] = 'O';
      var line = ['1A', '2A', '3A']
      var result = board.lineScore(currentBoard, computer, line)
      expect(result).toEqual(0);
    });
  });

  describe('#getOpenCells', function() {
    it('returns the cellID of all open cells', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '1B');
      board.addMarker('X', '3A');
      var result = board.getOpenCells();
      expect(result).toEqual(['2A', '2B', '3B', '1C', '2C', '3C']);
    });
  });

  describe('#getLineValuesArray', function() {
    it('returns a sorted array of marks', function() {
      var line = new Line('1A', '1B', '1C');
      board.addMarker('X', '1A');
      board.addMarker('X', '1B');
      var result = board.lineValuesArray(line, board);
      expect(result).toEqual(['X', 'X', null]);
    });
  });

  describe('#getHighScoreCell', function() {
    it('returns the cellID with the highest score', function() {
      var result = board.getHighScoreCell([[8, '2A'], [10, '2B'], [100, '3B'], [-100, '1C'], [-55, '2C']]);
      expect(result).toEqual('3B');
    });
  });

  describe('#equalityCheck', function() {
    it('returns true if arrays are the same', function() {
      var result = board.equalityCheck(['X', 'X', null], ['X', 'X', null]);
      expect(result).toBe(true);
    });

    it('returns false if arrays are not the same', function() {
      var result = board.equalityCheck(['X', 'X', null], ['X', null, null]);
      expect(result).toBe(false);
    });
  });
})