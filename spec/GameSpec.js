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
    game = new Game(player, computer, board);
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
      game = new Game(player, computer, board);
      expect(Game.prototype.gameRestartListener).toHaveBeenCalled();
    });

    it('calls #startGame', function() {
      spyOn(Game.prototype, 'startGame');
      game = new Game(player, computer, board);
      expect(Game.prototype.startGame).toHaveBeenCalled();
    });

    it('calls #whoGoesFirst', function() {
      spyOn(Game.prototype, 'whoGoesFirst');
      game = new Game(player, computer, board);
      expect(Game.prototype.whoGoesFirst).toHaveBeenCalled();
    });

    it('calls #setUpPlayerByType', function() {
      spyOn(Game.prototype, 'setUpPlayerByType');
      game = new Game(player, computer, board);
      expect(Game.prototype.setUpPlayerByType).toHaveBeenCalled();
    });
  });

});