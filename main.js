$(document).ready(initializeApp);

function initializeApp(){
    createBoard();
}

function createBoard(){
  var boardSize = { rows: 8, squares: 8 };
  var gameBoard = $('#gameArea');
  var alternateColor = 0;
  for ( var index = 0; index < boardSize.rows; index++) {
     var row = $('<div>').addClass('row');
      for( var nestedIndex = 0; nestedIndex < boardSize.squares; nestedIndex++) {
         if(alternateColor) {
          var square = $('<div>').addClass('square dark');
          var checker = $('<div>').addClass('checker');
          alternateColor = 1 - alternateColor;
          square.append( checker );
          row.append(square);
         } else {
          var square = $('<div>').addClass('square light');
          alternateColor = 1 - alternateColor;
          row.append(square);
         }
     
      }
      alternateColor = 1 - alternateColor;
      gameBoard.append(row);
  }

  
} 
