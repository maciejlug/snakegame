//--init 
var col = 26
var row = 25
snakeOnePos = [{col:26,row:25},{col:25,row:25}]



for(i=0; i<2; i++){
  let div = document.createElement("div")
  div.classList.add("snakeOne")
  document.getElementById("playBox").appendChild(div)
  }


  var snakeOne = document.getElementsByClassName("snakeOne");


  //starting position

  snakeOneLength = snakeOnePos.length
  var foodCreate = document.createElement("div");
  foodCreate.id = "food"
  document.getElementById("playBox").appendChild(foodCreate);
  createFood()
  //create board
  for (let i = 1; i < 51; i++) {
    if(i%2==0){
    for (let n = 1; n < 51; n+=2) {
    var div = document.createElement("div");
    div.classList.add("darker")
    div.style.gridColumn = n
    div.style.gridRow = i
    document.getElementById("board").appendChild(div);
    }}else{
      for (let n = 2; n < 51; n+=2) {
        var div = document.createElement("div");
        div.classList.add("darker")
        div.style.gridColumn = n
        div.style.gridRow = i
        document.getElementById("board").appendChild(div);
    }
  }
  }

//--init

  var move = 4
//--movement 

  //movement by key
  document.onkeydown = checkKey;

  //changing position of snake head
  function game(){
     
  function checkKey(e) {

      e = e || window.event;
      //up
      if (e.keyCode == '38' && move != 2) {
        move = 1
      }
      //down
      else if (e.keyCode == '40' && move != 1) {
        move = 2
      }
      //left
      else if (e.keyCode == '37' && move != 4) {
        move = 3
      }
      //right
      else if (e.keyCode == '39' && move != 3) {
        move = 4
      }
  }
    switch (move){
      case 1:
        row-=1;
        break;
      case 2:
        row+=1;
        break
      case 3:
        col-=1;
        break
      case 4:
        col+=1;
        break
    }
    //possibility to move through walls
      if(col==51){
        col=1;
      }
      if(row==51){
        row=1;
      }
      if(col==0){
        col=50;
      }
      if(row==0){
        row=50;
      }
      //if food picked, increase length of snake and create new food
      if(col == foodcol && row == foodrow){
        snakeOneLength+=1
        createFood()
        var div = document.createElement("div");
        div.className = "snakeOne";
        document.getElementById("playBox").appendChild(div);
        document.getElementById("scoreOne").innerHTML=`Score: ${snakeOneLength-2}`;
      }
    changePos()
  }
  //how fast the game updates
  var play = setInterval(game, 50)

//--movement


//creating food at random position
function createFood(){
  var food = document.getElementById("food");
  foodcol = Math.floor(Math.random() * 50)+1;  
  foodrow = Math.floor(Math.random() * 50)+1;  
  food.style.gridColumn = `${foodcol}`
  food.style.gridRow = `${foodrow}`
  
}
//adding position of snake head to 0 index
function changePos(){
  snakeOnePos.splice(0,0,{col:col,row:row})

//deleting last position if there are more positions than actual snake length
  if(snakeOnePos.length>snakeOneLength){
    snakeOnePos.splice(-1,1)
  }
//adding tail of snake
  for(let i=0; i<snakeOneLength;i++){
    snakeOne[i].style.gridColumn = `${snakeOnePos[i].col}`
    snakeOne[i].style.gridRow = `${snakeOnePos[i].row}`
    //comparing if head has the same position as rest of body(if it is, you lose)
    if(JSON.stringify(snakeOnePos[0]) === JSON.stringify(snakeOnePos[i+1])){
      food.style.display = "none"
      lose()
      clearInterval(play)
      break
    }
  }

}


function lose(){


  let wholeSnakeOne = document.querySelectorAll('.snakeOne');
  let state = 1

  let divInfo = document.createElement("div");
  let divText = document.createElement("div");
  let divScore = document.createElement("div");

  //ending screen
  divInfo.classList.add("info") 
  document.getElementById("content").appendChild(divInfo)
  divText.innerHTML = "You lose"
  document.getElementsByClassName("info")[0].appendChild(divText)
  divScore.innerHTML = `Score: ${snakeOneLength-2}`
  divScore.style.fontSize = "5vh"
  document.getElementsByClassName("info")[0].appendChild(divScore)
  
  //ending snake fading animation
  setInterval(function(){
    if(state%2==0){
      for(let i=0; i<wholeSnakeOne.length;i++)
      wholeSnakeOne[i].style.removeProperty('display')
      state+=1
    }else{
      for(let i=0; i<wholeSnakeOne.length;i++)
      wholeSnakeOne[i].style.display = "none"
      state+=1
    }
    }, 750);


}


  function retry(){
    location.reload();

}
