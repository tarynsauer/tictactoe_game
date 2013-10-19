describe("Computer", function() {

  beforeEach(function() {
    computer = new Computer('O');
    player = new Player('X');
    board = new Board();
    game = new Game(player, computer, board);
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
  })

  describe("#computerMove", function() {
    it("calls #findPotentialWin", function() {
      spyOn(Game.prototype, "findPotentialWin");
      computer.computerMove();
      expect(Game.prototype.findPotentialWin).toHaveBeenCalled();
    });

    // it("calls #addMarker on the board", function() {

    // });

  });

})