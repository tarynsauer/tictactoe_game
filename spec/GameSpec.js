describe("Game", function() {

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
  })

  describe("click event",function() {
    it("triggers page refresh when clicked", function() {
      game = new Game(player, computer, board);
      game.newGame.trigger('click');
      // expect page to refresh
    });
  });

  describe("#restartGameListener", function() {
    it("calls #restartGameListener", function() {
      spyOn(Game.prototype, "restartGameListener");
      game = new Game(player, computer, board);
      expect(Game.prototype.restartGameListener).toHaveBeenCalled();
    });
  });

  describe("#whoGoesFirst", function() {
    it("calls #whoGoesFirst", function() {
      spyOn(Game.prototype, "whoGoesFirst");
      game = new Game(player, computer, board);
      expect(Game.prototype.whoGoesFirst).toHaveBeenCalled();
    });

  });

  describe("#setUpPlayerByType", function() {
    it("calls #whoGoesFirst", function() {
      spyOn(Game.prototype, "setUpPlayerByType");
      game = new Game(player, computer, board);
      expect(Game.prototype.setUpPlayerByType).toHaveBeenCalled();
    });

  });
})