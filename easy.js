// distance: number of pixels a puzzle piece will move
const DISTANCE = 100;
/**********************************
// STEP 1 - Create puzzlePieces data structure.
// I suggest using an array of objects but feel free to change that
// An example of a puzzle piece object could be: { name: ".box1", x: 0, y: 0 }
**********************************/
const puzzlePieces = [
  { name: ".box1", x: 0, y: 0 },
  { name: ".box2", x: 100, y: 0 },
  { name: ".box3", x: 200, y: 0 },
  { name: ".box4", x: 300, y: 0 },
  { name: ".box5", x: 0, y: 100 },
  { name: ".box6", x: 100, y: 100 },
  { name: ".box7", x: 200, y: 100 },
  { name: ".box8", x: 300, y: 100 },
  { name: ".box9", x: 0, y: 200 },
  { name: ".box10", x: 100, y: 200 },
  { name: ".box11", x: 200, y: 200 },
  { name: ".box12", x: 300, y: 200 },
  { name: ".box13", x: 0, y: 300 },
  { name: ".box14", x: 100, y: 300 },
  { name: ".box15", x: 200, y: 300 },
];

// blankSpace: initialize blank square as last piece so as to remember where it is.
// Will eventually use it to ask direction of clicked puzzle piece(s).
// Once pieces move, must remember to update x,y values to new blank space coords
const blankSpace = { x: 300, y: 300, order: 16 };

// I'm structuring my program sort of like how Vue does it - all in my puzzle object below.
const puzzle = {
  pieces: puzzlePieces,
  distance: DISTANCE,
  blankSpace,
  currentPiece: null,
  directionToMove: "",
  initialize: function () {
    // console.log(e.target);

    /************************************     
    // STEP 2 - Implement initialize function such that it
    // attache click event handlers for each piece
    // and within that, invokes the slide function
    ***************************************/
    const box = document.querySelectorAll("div"); //Selecting the div tag and assigning to the variable box
    box.forEach(e => e.addEventListener("click", this.slide)); //Making each box clickable using forEach

    // show puzzle pieces
    this.display();


  },
  display: function () {
    // initialize pieces to their proper order
    this.pieces.forEach(piece => {
      const pieceDOM = document.querySelector(piece.name);
      TweenLite.set(pieceDOM, { x: piece.x, y: piece.y });
    });
  },
  slide: function (e) {
    // call isMoveable to find out direction to move
    // remember to adjust coordinates including adjusting blank piece's coordinates
    /************************************
    // STEP 4 - Implement slide function so that you set x,y coordinates of appropriate puzzle piece(s)
    *********************************/

    puzzle.currentPiece = puzzle.pieces[e.target.dataset.idx]; // Picking up the coordinates of currentPiece clicked
    directionToMove = puzzle.isMoveable(); // isMovable function is called


    console.log(puzzle.currentPiece);
    // TweenLite.to(yCoord, 0.17, { x: blankSpace.x, y: blankSpace.y });
    // Now animate current puzzle piece now that x, y coordinates have been set above

    // Checking the conditions of if the peice isMovable for the right direction or not
    if ((directionToMove == "left") || (directionToMove == "right") || (directionToMove == "down") || (directionToMove == "up")) {
      TweenMax.to(this, 0.17, {
        x: puzzle.currentPiece.x,
        y: puzzle.currentPiece.y,
        ease: Power0.easeNone
      });
    }
  },

  isMoveable: function () {
    /********************************************
    // STEP 3 - Implement isMoveable function to find out / return which direction to move
    // Is the clicked piece movable?
    // If yes, then return a direction to one of: "up", "down", "left", "right"
    // If no, then return a direction of ""
     ******************************************/
    //console.log(e.target.dataset.idx);
    //console.log(puzzle.pieces[e.target.dataset.idx].y);
    // const clickedBox = document.querySelector("div");
    //console.log(puzzle.pieces[e.target.dataset.idx].x);


    if ((puzzle.currentPiece.x == blankSpace.x) || (puzzle.currentPiece.y == blankSpace.y)) {
      //This checks if the current piece can move to left direction
      if (puzzle.currentPiece.x == blankSpace.x + 100) {
        var xCoord = puzzle.currentPiece.x;
        puzzle.currentPiece.x = blankSpace.x;
        blankSpace.x = xCoord;
        return "left";
      }
      //This checks if the current piece can move to right direction
      else if (puzzle.currentPiece.x == blankSpace.x - 100) {
        var xCoord = puzzle.currentPiece.x;
        puzzle.currentPiece.x = blankSpace.x;
        blankSpace.x = xCoord;
        return "right";
      }
      //This checks if the current piece can move downwards
      else if (puzzle.currentPiece.y == blankSpace.y + 100) {
        var yCoord = puzzle.currentPiece.y;
        puzzle.currentPiece.y = blankSpace.y;
        blankSpace.y = yCoord;
        return "down";
      }
      //This checks if the current piece can move upwards
      else if (puzzle.currentPiece.y == blankSpace.y - 100) {
        var yCoord = puzzle.currentPiece.y;
        puzzle.currentPiece.y = blankSpace.y;
        blankSpace.y = yCoord;
        return "up";
      }
      // If the piece can't move return ""
      else {
        return "";
      }
    }
    // // TweenMax.to(puzzle.pieces[e.target], 0.17, { x: blankSpace.x, y: blankSpace.y });

    // this.puzzle.pieces.y = y;
    console.log("matches");

  }
};

// This is calling initialize function which displays everything
puzzle.initialize();


// const hi = document.querySelector(".hi");
// TweenMax.to(hi, 0.5, { x: 600 });
/*
STEP 5 - Comment each function implemented
STEP 6 - Submit to github
STEP 7 - host on web server
*/
