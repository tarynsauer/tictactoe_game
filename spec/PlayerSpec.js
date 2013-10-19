describe("Player", function() {

  beforeEach(function() {
    computer = new Computer();
    player = new Player();
    board = new Board('O','X');
    game = new Game(player, computer, board);
  })

  // describe("#playerMove", function() {
  //   it("calls a click event listener", function() {

  //   });

  //   it("calls #addMarker on the board", function() {

  //   });

  // });

})