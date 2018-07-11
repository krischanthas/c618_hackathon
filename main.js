$(document).ready(initializeApp);


var selectedChecker = null;
var currentRow = null;
var currentColumn = null; 
var possibleRow = null;
var possibleColumn = null;
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

function initializeApp(){
    createBoard();
    repopulateChecker();
    applyHandlers();
}

function applyHandlers(){
    $('.square').on('click', selectPiece);
}



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

function movePiece(){
    var row = parseInt($(this).attr('row'));
    var column = parseInt($(this).attr('col'));
    console.log('Row: ', row);
    console.log('Column: ', column);

    var checkerSelected = gameboard[row][column];
    var possibleMoveLeft = gameboard[row +1][column -1];
    var possibleMoveRight = gameboard[row+1][column+1];

   
}

function selectPiece(){
    debugger;
    if(!selectedChecker){
        console.log(this);
      
            currentRow = parseInt($(this).attr('row'));
            currentColumn = parseInt($(this).attr('col'));
            possibleRow = currentRow + 1;
            possibleMoveLeft = currentColumn -1;
            possibleMoveRight = currentColumn + 1;
            $(`div[row = ${possibleRow}][col = ${possibleMoveLeft}]`).addClass("highLight");
            $(`div[row= ${possibleRow}][col = ${possibleMoveRight}]`).addClass("highLight");


        
        currentRow = parseInt($(this).attr('row'));
        currentColumn = parseInt($(this).attr('col'));
        selectedChecker = gameboard[currentRow][currentColumn];
    } else {

        selectedChecker = null;
        var moveToRow = parseInt($(this).attr('row'));
        var moveToColumn = parseInt($(this).attr('col'));
        gameboard[moveToRow][moveToColumn] = 1;
        gameboard[currentRow][currentColumn]= 0;
        $('.square').empty();
        repopulateChecker();
    }
}
