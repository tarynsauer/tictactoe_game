describe("Player", function() {

  beforeEach(function() {
    computer = new Computer('O');
    player = new Player("X");
    board = new Board(player, computer);
    game = new Game(player, computer, board);
  })

  // describe("#playerMove", function() {
  //   it("calls a click event listener", function() {

  //   });

  //   it("calls #addMarker on the board", function() {

  //   });

  // });

})