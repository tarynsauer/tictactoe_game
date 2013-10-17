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
      board.addMarker('X', '2C')
      var cellValue = $('#2C').prop('outerHTML');
      expect(cellValue).toEqual('<td id="2C" class="board">X</td>');
    });

    it("adds the marker ID to the filledSpaces array", function() {
      board.addMarker('X', '2C')
      var filledSpacesArray = board.filledSpaces
      expect(filledSpacesArray).toEqual(['2C']);
    });

    it("removes the marker ID from the openSpaces array", function() {
      board.addMarker('X', '2C')
      var openSpacesArray = board.openSpaces
      expect(openSpacesArray).toEqual(["1A", "2A", "3A", "1B", "2B", "3B", "1C", "3C"]);
    });
  });

})