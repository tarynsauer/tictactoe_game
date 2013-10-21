describe("Player", function() {

  beforeEach(function() {
    computer = new Player('O', 'human');
    player = new Player("X", 'human');
    board = new Board(player, computer);
    game = new Game(player, computer, board);
  })

})