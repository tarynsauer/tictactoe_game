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

  describe('#getOpenCells', function() {
    it('returns all open cells as an array', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '2A');
      board.addMarker('X', '3A');
      var result = board.getOpenCells();
      expect(result).toEqual(['1B', '2B', '3B', '1C', '2C', '3C']);
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

  describe('#activeCell', function() {
    it('returns true if the cell is active', function() {
      var result = board.activeCell('1A');
      expect(result).toBe(true);
    });

    it('returns false if the cell is inactive', function() {
      board.addMarker('X', '1A');
      var result = board.activeCell('1A');
      expect(result).toBe(false);
    });
  });
})