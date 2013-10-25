describe('Line', function() {

  beforeEach(function() {
    computer = new Player('O', 'human');
    player = new Player('X', 'human');
    board = new Board(computer,player);
    line = new Line('1A', '1B', '1C');
  });

  describe('new line', function() {
    it('has cell values c1', function() {
      expect(line.c1).toEqual('1A');
    });

    it('has cell value c2', function() {
      expect(line.c2).toEqual('1B');
    });

    it('has cell value c3', function() {
      expect(line.c3).toEqual('1C');
    });
  });
});