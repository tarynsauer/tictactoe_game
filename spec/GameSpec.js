describe('Game', function() {

  beforeEach(function() {
    computer = new Player('O', 'human');
    player = new Player('X', 'human');
    board = new Board(player, computer);
    $('body').affix('table.tableBoard tr#rowA');
    $('tr#rowA').affix('td#1A.board');
    $('tr#rowA').affix('td#1B.board');
    $('tr#rowA').affix('td#1C.board');
    $('table.tableBoard').affix('tr#rowB');
    $('tr#rowB').affix('td#2A.board');
    $('tr#rowB').affix('td#2B.board');
    $('tr#rowB').affix('td#2C.board');
    $('table.tableBoard').affix('tr#rowC');
    $('tr#rowC').affix('td#3A.board');
    $('tr#rowC').affix('td#3B.board');
    $('tr#rowC').affix('td#3C.board');
    $('body').affix('p#gameStatusMessage');
    game = new Game(board);
  });

  afterEach(function(){
    $('h1#gameMessage').remove();
    $('.tableBoard').remove();
  });

  describe('create new game',function() {
    it('assigns new player to playerOne', function() {
      expect(game.playerOne).toEqual(jasmine.any(Object));
    });

    it('assigns player object to playerTwo', function() {
      expect(game.playerTwo).toEqual(jasmine.any(Object));
    });

    it('assigns player object to playerTwo', function() {
      expect(game.playerTwo).toEqual(jasmine.any(Object));
    });

    it('assigns board object to board', function() {
      expect(game.board).toEqual(jasmine.any(Object));
    });

    it('assigns jQuery object to newGame', function() {
      expect(game.newGame).toEqual(jasmine.any(Object));
    });

    it('calls #gameRestartListener', function() {
      spyOn(Game.prototype, 'gameRestartListener');
      game = new Game(board);
      expect(Game.prototype.gameRestartListener).toHaveBeenCalled();
    });

    it('calls #startGame', function() {
      spyOn(Game.prototype, 'startGame');
      game = new Game(board);
      expect(Game.prototype.startGame).toHaveBeenCalled();
    });

    it('calls #whoGoesFirst', function() {
      spyOn(Game.prototype, 'whoGoesFirst');
      game = new Game(board);
      expect(Game.prototype.whoGoesFirst).toHaveBeenCalled();
    });

    it('calls #setUpPlayerByType', function() {
      spyOn(Game.prototype, 'setUpPlayerByType');
      game = new Game(board);
      expect(Game.prototype.setUpPlayerByType).toHaveBeenCalled();
    });

    it('calls #setOpponents', function() {
      spyOn(Game.prototype, 'setOpponents');
      game = new Game(board);
      expect(Game.prototype.setOpponents).toHaveBeenCalled();
    });

    it('calls #firstMoveMessage', function() {
      spyOn(Game.prototype, 'firstMoveMessage');
      game = new Game(board);
      expect(Game.prototype.firstMoveMessage).toHaveBeenCalled();
    });
  });

  describe('returns appropriate game messages',function() {
    it('calls #showTieMessage', function() {
      spyOn(Game.prototype, 'showTieMessage');
      board.addMarker('O', '1A');
      board.addMarker('O', '2A');
      board.addMarker('X', '3A');
      board.addMarker('X', '1B');
      board.addMarker('X', '2B');
      board.addMarker('O', '3B');
      board.addMarker('O', '1C');
      board.addMarker('O', '2C');
      board.addMarker('X', '3C');
      expect(Game.prototype.showTieMessage).toHaveBeenCalled();
    });

    it('identifies a winning row', function() {
      spyOn(Game.prototype, 'showWinMessage');
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '3A');
      board.addMarker('O', '1B');
      board.addMarker('X', '2A');
      expect(Game.prototype.showWinMessage).toHaveBeenCalled();
    });

    it('identifies a winning column', function() {
      spyOn(Game.prototype, 'showWinMessage');
      board.addMarker('X', '1A');
      board.addMarker('O', '2B');
      board.addMarker('X', '1B');
      board.addMarker('O', '2C');
      board.addMarker('X', '1C');
      expect(Game.prototype.showWinMessage).toHaveBeenCalled();
    });

    it('identifies a winning diagonal line', function() {
      spyOn(Game.prototype, 'showWinMessage');
      board.addMarker('O', '1A');
      board.addMarker('X', '3B');
      board.addMarker('O', '2B');
      board.addMarker('X', '2C');
      board.addMarker('O', '3C');
      expect(Game.prototype.showWinMessage).toHaveBeenCalled();
    });
  });

});