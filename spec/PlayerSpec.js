describe('Player', function() {

  beforeEach(function() {
    player = new Player('X', 'human');
  });

  describe('new player object', function() {
    it('assigns marker value based on input', function() {
      expect(player.marker).toEqual('X');
    });

    it('assigns type value based on input', function() {
      expect(player.playerType).toEqual('human');
    });

    it('assigns default turn value of 0', function() {
      expect(player.turn).toEqual(0);
    });
  });
});