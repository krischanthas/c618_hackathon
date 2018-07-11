$(document).ready(initializeApp);

function initializeApp(){
    createBoard();
}


var gameboard = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
  ];

  function createBoard(){
    debugger;
    var gameBoard = $('#gameArea');
    var alternateColor = 0;
    for ( var i = 1; i < gameboard.length + 1; i++) {
       var row = $('<div>').addClass('row');
        for( var j = 1; j < gameboard.length + 1; j++) {
          if( i < 4) {
            if(alternateColor) {
              var square = $('<div>').addClass('square dark').attr('row' , i).attr("col", j) ;
              var checker = $('<div>').addClass('checker player1');
              alternateColor = 1 - alternateColor;
              square.append( checker);
              row.append(square);
             } else {
              var square = $('<div>').addClass('square light').attr('row' , i).attr("col", j) ;
              alternateColor = 1 - alternateColor;
              row.append(square);
             }

          }
          if ( i>=4 && i <=5) {
            if(alternateColor) {
              var square = $('<div>').addClass('square dark').attr('row' , i).attr("col", j) ;
              alternateColor = 1 - alternateColor;
              row.append(square);
             } else {
              var square = $('<div>').addClass('square light').attr('row' , i).attr("col", j) ;
              alternateColor = 1 - alternateColor;
              row.append(square);
             }

          } else if (i > 5) {
          
           if(alternateColor) {
            var square = $('<div>').addClass('square dark').attr('row' , i).attr("col", j) ;
            var checker = $('<div>').addClass('checker player2');
            alternateColor = 1 - alternateColor;
            square.append( checker);
            row.append(square);
           } else {
            var square = $('<div>').addClass('square light').attr('row' , i).attr("col", j) ;
            alternateColor = 1 - alternateColor;
            row.append(square);
           }
       
        }
        // alternateColor = 1 - alternateColor;
        gameBoard.append(row);
    } 
    alternateColor = 1 - alternateColor;
  } }

// function createBoard(){
//   var boardSize = { rows: 8, squares: 8 };
//   var gameBoard = $('#gameArea');
//   var alternateColor = 0;
//   for ( var index = 0; index < boardSize.rows; index++) {
//      var row = $('<div>').addClass('row');
//       for( var nestedIndex = 0; nestedIndex < boardSize.squares; nestedIndex++) {
//          if(alternateColor) {
//           var square = $('<div>').addClass('square dark');
//           alternateColor = 1 - alternateColor;
//           row.append(square);
//          } else {
//           var square = $('<div>').addClass('square light');
//           alternateColor = 1 - alternateColor;
//           row.append(square);
//          }
     
//       }
//       alternateColor = 1 - alternateColor;
//       gameBoard.append(row);
//   } 
// } 

