

var cardsChosenFlowers = new Array(2);
var cardsChosenIDs = new Array(2);
var card = 0;
var score = 0;
var pairsCompleted = 0;
var count=0;
var start;

var orderOfCards = [];
var easyButtonInHTML = document.getElementById("easyButton");
var hardButtonInHTML = document.getElementById("hardButton");

// Making the cards unclickable until you choose a game mode below
document.getElementById("game_container").style.pointerEvents="none";

// silly comments
console.log("you inspected the page :p");
console.log("good job");

// Sweet alert welcoming the player
swal({
  title: "Welcome to Cucu's Nature-Themed Memory Game!",
  text: "Please select a difficulty before clicking the cards. Remember, no cheating is allowed!",
  button: false,
  className: "welcomeAlert",
});


// ✅✅✅ // CREATING THE ORDER OF THE CARDS
function changeDifficulty(mode) {
  if (mode=='hard'){
    document.getElementById("game_container").style.pointerEvents="auto";

//setting the order of cards
    orderOfCards = ['leaf1.png', 'leaf2.png', 'leaf3.png', 'leaf4.png', 'leaf5.png', 'leaf6.png', 'leaf1.png', 'leaf2.png', 'leaf3.png', 'leaf4.png', 'leaf5.png', 'leaf6.png'];
    orderOfCards = orderOfCards.sort(() => 0.5 - Math.random());

//Changing the CSS of the buttons, so that it's easier to know which one is selected
    hardButtonInHTML.classList.add('leafActiveMode');
    easyButtonInHTML.classList.remove('flowerActiveMode');

//reseting the data
    start = Date.now();
    count=0;
    document.getElementById('timesClicked').innerHTML = count;
    score=0;
    document.getElementById('gameScore').innerHTML = score;
    pairsCompleted=0;

//URGENT FIND A WAY TO TURN ALL CARDS FACE DOWN ONCE YOU CHANGE THE MODE
    var i=0;
    while (i<=11){
      var aaabbbccc = document.getElementById(i).src;
      if(aaabbbccc.includes('flower')){
      document.getElementById(i).src = "BackOfCard.jpg";
      document.getElementById(i).style.pointerEvents = "auto";
      }
      i++
    }

  } else if (mode=='easy'){ /////EASY MODE EASY MODE EASY EASY MODE
    document.getElementById("game_container").style.pointerEvents="auto";

//setting the order of the cards
    orderOfCards = ['flower1.png', 'flower2.png', 'flower3.png', 'flower4.png', 'flower5.png', 'flower6.png', 'flower1.png', 'flower2.png', 'flower3.png', 'flower4.png', 'flower5.png', 'flower6.png'];
    orderOfCards = orderOfCards.sort(() => 0.5 - Math.random());

//Changing the CSS of the buttons, so that it's easier to know which one is selected
    easyButtonInHTML.classList.add('flowerActiveMode');
    hardButtonInHTML.classList.remove('leafActiveMode');

//reseting the data
    start = Date.now();
    count=0;
    document.getElementById('timesClicked').innerHTML = count;
    score=0;
    document.getElementById('gameScore').innerHTML = score;
    pairsCompleted=0;

//URGENT FIND A WAY TO TURN ALL CARDS FACE DOWN ONCE YOU CHANGE THE MODE
    var i=0;
    while (i<=11){
      var aaabbbccc = document.getElementById(i).src;
      console.log(aaabbbccc);
      if(aaabbbccc.includes('leaf')){
      document.getElementById(i).src = "BackOfCard.jpg";
      document.getElementById(i).style.pointerEvents = "auto";
      }
      i++
    }
  }
}




// ✅✅✅ // THIS IS FOR THE TIMER THING
  var timer = setInterval(
    () => {document.getElementById('difference').innerHTML = Math.floor((Date.now() - start)/1000)}
    , 100);


// changing the card to another one
function changeImage(imgID) {
  var imageSRC = document.getElementById(imgID).src;
// ✅✅✅ // TIMES CLICKED
  count++
  document.getElementById('timesClicked').innerHTML = count;
  
  if (imageSRC.includes('BackOfCard.jpg')) {
// ✅✅✅ // CHANGING THE CARD 
    document.getElementById(imgID).src = orderOfCards[Number(imgID)];
    cardsChosenFlowers[card] = orderOfCards[Number(imgID)];
    cardsChosenIDs[card] = imgID;
    card++;

  } else {
    document.getElementById(imgID).src='BackOfCard.jpg';
  }
  
  if (card==2){
    card=0;
//check if two cards in cardsChosenFlowers match
    if (cardsChosenFlowers[0]==cardsChosenFlowers[1] && cardsChosenIDs[0]!=cardsChosenIDs[1]){
  //updating the score
      score += 100;
      document.getElementById('gameScore').innerHTML = score;
      
//making them unclickable
      for(i=0; i<=1; i++){document.getElementById(cardsChosenIDs[i]).style.pointerEvents = "none";}
      
//storing how many pairs are completed
      pairsCompleted++
      
//if all pairs are done
      if (pairsCompleted==orderOfCards.length/2){        
//stopping the timer
        clearInterval(timer);

//end message, allows for the player to play again or stop
        swal("You have won, good job!", {
          buttons: {
            continue: "Try Again",
            cancel: "Stop Playing",
          },
        })
        .then((value) => {
          switch (value) {
            case "continue":
              swal("Have fun!");
              setTimeout(()=>{document.location.reload(true)}, 3000);
              break;
            default:
              swal(`Game over, you finished in ${document.getElementById('difference').innerHTML} seconds!`);
          }
        });
      }
    } else if (cardsChosenIDs[0]==cardsChosenIDs[1]) {
// Recognize cheating! And sending a fun little alert :p
      alert('you cheater!');
      document.getElementById(cardsChosenIDs[0]).src = "BackOfCard.jpg";
    } else {
// Making the whole board unclickable while the timer is going so that players can't press buttons while there's still a uncompleted pair facing up
      document.getElementById('game_container').style.pointerEvents="none";
      setTimeout(() => {
        for(i=0; i<=1; i++){document.getElementById(cardsChosenIDs[i]).src = 'BackOfCard.jpg'};
        document.getElementById('game_container').style.pointerEvents="auto";}, 1500)
    }
  }
}

//Sweet Alert Docs: https://sweetalert.js.org/docs/
