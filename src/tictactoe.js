$( document ).ready(function() {

  $('#startGame').click(function(event) {
    event.preventDefault();
    var playerOneMarker = $('#markerPlayerOne').val();
    var playerTwoMarker = $('#markerPlayerTwo').val();
    var playerOneType   = $('#player1Type').prop('checked');
    var playerTwoType   = $('#player2Type').prop('checked');

    if (playerOneMarker === playerTwoMarker) {
      $('#error').html("Player markers can't be the same.");
    } else {

      if (playerOneType) {
        playerOneType = 'computer';
      } else {
        playerOneType = 'human';
      }
      if (playerTwoType) {
        playerTwoType = 'computer';
      } else {
        playerTwoType = 'human';
      }

     $('.formElements').addClass('invisible');
     $('#newGame').removeClass('invisible');
     playerOne = new Player(playerOneMarker, playerOneType);
     playerTwo = new Player(playerTwoMarker, playerTwoType);
     board     = new Board(playerOne, playerTwo);
     game      = new Game(board);
    }

  });

});