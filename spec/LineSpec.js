describe("Line", function() {

  beforeEach(function() {
    computer = new Player('O', 'human');
    player = new Player('X', 'human');
    board = new Board(computer,player);
    game = new Game(computer, player, board);
  });

  describe("new board", function() {
    it("creates eight new lines on creating a new board", function() {
      expect(board.lines.length).toEqual(8);
    });

    it("creates an array of new lines on creating a board", function() {
      expect(board.lines).toEqual(jasmine.any(Array));
    });
  });

})