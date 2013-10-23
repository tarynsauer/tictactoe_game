# Tic-tac-toe game with AI option

This tic-tac-toe game allows for comptuer vs. computer, human vs. computer, and human vs. human matchups. The computer is unbeatable, and all computer vs. computer matchups result in a tie. You can play the game in any Web browser.

##### Table of Contents  
[Getting started](#getting)  
[Playing the game](#playing)  
[AI algorithm](#ai)
[Technology used](#technology)
[Notes](#notes)

## Getting started

To get this program, clone the repository to your local machine, then open the following file in a web browser:
```
index.html
```
## Playing the game

Once you've opened this file in the browser, follow these steps to begin playing the game:

1. For each player, select a marker and player type. Players must have different markers, or else an error appears.
2. Click **Start game!** button to begin playing.
3. The program randomly selects which player goes first. This selection appears in the message header.
4. Players alternate clicking on the board to add their respective marker.
5. Once one player wins or the board contains nine markers (a tie), gameplay stops and the game outcome appears in the message header.
6. Click the **New Game** button to play again.

You can click the **New Game** button at any time to restart the program.

## AI algorithm

To always be "unbeatable", computer players use the following procedure to select moves:

1. If selected to go first, place marker in a randomly chosen square.
2. On all subsequent moves, the computer calculates a total score for each possible move (i.e., for all open squares). The total score is a sum of the scores for all "win lines" (three rows, three columns, two diagonals) on the board, given that particular move. Based on the squares in the line, each "win line" score is assigned one of the following values:
  * +100 for [marker, marker, marker]
  * +10 for [marker, marker, open]
  * + 1 for [marker, open, open]
  * -1 for [opponentMarker, open, open]
  * -10 for [opponentMarker, opponentMarker, open]
  * 0 for all other combinations

3. The computer finds the square with the highest total score, and it moves its marker to that square.

This process uses a [Minimax](https://en.wikipedia.org/wiki/Minimax) search algorithm.

## Technology used

I used the following tools and technologies to make this web application:

* [HTML5 Bloilerplate](http://html5boilerplate.com/)
* [JQuery](http://jquery.com/)
* [JavaScript Underscore](http://underscorejs.org/)
* [Jasmine](http://pivotal.github.io/jasmine/)
* [Jasmine fixture](https://github.com/searls/jasmine-fixture)

### File structure

### Spec

To run the Jasmine specs, open the following file in a web browser:
```
SpecRunner.html
```
Refresh the browser page to re-run the specs.

## Notes
