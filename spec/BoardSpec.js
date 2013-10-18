describe("Board", function() {

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
  });

  afterEach(function(){
    $('.tableBoard').remove();
  });

  describe("#addMarker", function() {
    it("adds a marker to the board", function() {
      board.addMarker('X', '2C');
      var cellValue = $('#2C').prop('outerHTML');
      expect(cellValue).toEqual('<td id="2C" class="board">X</td>');
    });

    it("adds the marker ID to the filledSpaces object", function() {
      board.addMarker('X', '2C');
      var filledSpacesArray = board.filledSpaces;
      expect(filledSpacesArray).toEqual({ "1A": null, "2A": null, "3A": null, "1B": null, "2B": null, "3B": null, "1C": null, "2C": 'X', "3C": null });
    });

  });

  describe("#checkTrioForWin", function() {
    it("fails to find a winning opportunity", function() {
      board.addMarker('X', '2C');
      board.addMarker('O', '3C');
      board.addMarker('X', '1C');
      var trioResult = board.checkTrioForWin(player.marker, '1C', '2C', '3C');
      expect(trioResult).toEqual(false);
    });

    it("finds a winning opportunity", function() {
      board.addMarker('X', '2C');
      board.addMarker('X', '1C');
      var trioResult = board.checkTrioForWin(player.marker, '1C', '2C', '3C');
      expect(trioResult).toEqual(true);
    });
  });
})