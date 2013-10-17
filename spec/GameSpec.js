describe("Game", function() {

  beforeEach(function() {
    computer = new Computer('O');
    player = new Player('X');
    board = new Board();
  })

  describe("click event",function() {
    it("triggers page refresh when clicked", function() {
      game = new Game(player, computer, board);
      game.newGame.trigger('click');
      // expect page to refresh
    });
  });

  // describe("#playerMove", function() {
  //   it("calls #playerMove", function() {
  //     spyOn(Player.prototype, "playerMove");
  //     game = new Game(player, computer, board);
  //     expect(Player.prototype.playerMove(board)).toHaveBeenCalled();
  //   });
  // });

  describe("#restartGameListener", function() {
    it("calls #restartGameListener", function() {
      spyOn(Game.prototype, "restartGameListener");
      game = new Game(player, computer, board);
      expect(Game.prototype.restartGameListener).toHaveBeenCalled();
    });
  });

  describe("#checkGameStatus", function() {
    it("calls #checkGameStatus", function() {
      spyOn(Game.prototype, "checkGameStatus");
      game = new Game(player, computer, board);
      expect(Game.prototype.checkGameStatus).toHaveBeenCalled();
    });
  });
})