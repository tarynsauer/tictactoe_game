describe('AI', function() {

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

  describe('#calcScore', function() {
    it('returns cellID score array', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '2A');
      board.addMarker('X', '3A');
      var result = computer.ai.calcScore('2B', computer)
      expect(result).toEqual(9);
    });
  });

  describe('#getBestMove', function() {
    it('returns the cellID with the highest score', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '1B');
      board.addMarker('X', '3A');
      var openCellsArray = board.getOpenCells();
      var bestMove = computer.ai.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2B');
    });

    it('returns the cellID with the highest score', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '3A');
      var openCellsArray = board.getOpenCells();
      var bestMove = computer.ai.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2A');
    });

    it('returns the cellID with the highest score', function() {
      board.addMarker('X', '1C');
      board.addMarker('O', '2A');
      var openCellsArray = board.getOpenCells();
      var bestMove = computer.ai.getBestMove(openCellsArray, computer)
      expect(bestMove).toEqual('2B');
    });

    it('returns the cellID of the best move', function() {
      board.addMarker('X', '1A');
      board.addMarker('O', '3B');
      board.addMarker('X', '3C');
      var openCellsArray = board.getOpenCells();
      var bestMove = computer.ai.getBestMove(openCellsArray, computer)
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
      var result = computer.ai.lineScore(currentBoard, computer, line)
      expect(result).toEqual(0);
    });
  });

  describe('#getHighScoreCell', function() {
    it('returns the cellID with the highest score', function() {
      var result = computer.ai.getHighScoreCell([[8, '2A'], [10, '2B'], [100, '3B'], [-100, '1C'], [-55, '2C']]);
      expect(result).toEqual('3B');
    });
  });

});