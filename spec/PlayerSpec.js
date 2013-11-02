describe('Player', function() {

  beforeEach(function() {
    computer = new Player('O', 'computer');
    player = new Player('X', 'human');
    board = new Board(computer,player);
    game = new Game(board);
  });

  describe('new player object', function() {
    it('assigns marker value based on input', function() {
      expect(player.marker).toEqual('X');
    });

    it('assigns type value based on input', function() {
      expect(player.playerType).toEqual('human');
    });

    it('assigns default turn value of 0', function() {
      player = new Player('X', 'human');
      expect(player.turn).toEqual(0);
    });
  });

  describe('#opponent', function() {
    it('returns opponent player O', function() {
      var oppPlayer = computer.opponent;
      expect(oppPlayer.marker).toEqual('X');
    });

    it('returns opponent player X', function() {
      var oppPlayer = player.opponent;
      expect(oppPlayer.marker).toEqual('O');
    });
  });

  describe('#playerMove', function() {
    it('calls #addMarker', function() {
      spyOn(Player.prototype, 'playerMove');
      game = new Game(board);
      computer.turn = 0;
      player.turn = 1;
      $('#1A').trigger('click');
      expect(Player.prototype.playerMove).toHaveBeenCalledWith(player);
    });
  });

  describe('#opponentMove', function() {
    it('calls #playerMove', function() {
      spyOn(Player.prototype, 'playerMove');
      player.opponentMove(player);
      expect(Player.prototype.playerMove).toHaveBeenCalled();
    });

    it('calls #computerMove', function() {
      spyOn(Player.prototype, 'computerMove');
      computer.opponentMove(computer);
      expect(Player.prototype.computerMove).toHaveBeenCalled();
    });
  });
});