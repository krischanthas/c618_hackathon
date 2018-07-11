$(document).ready(initializeApp);

function initializeApp(){
    createBoard();
    repopulateChecker()
    applyHandlers();
}

function applyHandlers() {
    $('.resetButton').on('click', resetGame);
}

var gameboard = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0],
  ];

  function createBoard(){
    var gameBoard = $('#gameArea');
    var alternateColor = 0;
    for ( var i = 0; i < gameboard.length; i++) {
       var row = $('<div>').addClass('row');
        for( var j = 0; j < gameboard.length; j++) {
          if( i < 4) {
            if(alternateColor) {
              var square = $('<div>').addClass('square dark').attr('row' , i).attr("col", j) ;
              
              alternateColor = 1 - alternateColor;
              
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
            
            alternateColor = 1 - alternateColor;
           
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



// Click handler

// determine which players turn

// current position, row/column

// take the current piece, determine position, 

function repopulateChecker(){
    var gameBoard = $('#gameArea');
    for(var i = 0; i < gameboard.length; i++){
        for(var j =0; j < gameboard.length; j++){
            if(gameboard[i][j]=== 1){
                var checker = $('<div>').addClass('checker player1');
                $(`div[row = ${i}][col= ${j}]`).append(checker);
                // $("div[row ="+i+"][col="+j+"]").append(checkerpiece);
            }
            else if(gameboard[i][j]=== 2){
                var checker = $('<div>').addClass('checker player2');
                $(`div[row = ${i}][col= ${j}]`).append(checker);
            }
        }
    }
}

function getLocation(){
    var row = $(this).attr('row');
    var column = $(this).attr('col');
    console.log('Row: ', row);
    console.log('Column: ', col);
}

function resetGame() {
    gameboard = [
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [2,0,2,0,2,0,2,0],
        [0,2,0,2,0,2,0,2],
        [2,0,2,0,2,0,2,0],
      ];
      repopulateChecker();
}