const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const deck = [];
const dealerCards = [];
const playerCards = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];

let dealerSum = 0;
let playerSum = 0;
let playerAceCount = 0;
const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};

for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

for (let i = 0; i < deck.length; i++) {
  if (
    deck[i].pointValue == "king" ||
    deck[i].pointValue == "queen" ||
    deck[i].pointValue == "jack"
  ) {
    deck[i].pointValue = 10;
  } else if (deck[i].pointValue == "ace") {
    deck[i].pointValue = 1;
  }
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
}

reduceAce();

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}
shuffleDeck();

window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
});

// Noun
let cardsButton = document.getElementById("deal-button");
let hitButton = document.getElementById("hit-button");
let standButton = document.getElementById("stand-button");

// Verb
cardsButton.addEventListener("click", function () {
  for (let i = 1; i <= 4; i++) {
    if (i % 2 == 0) {
      let newCard = deck.pop();
      dealerCards.push(newCard);

      let img = document.createElement("img");
      img.src = "./images/" + newCard.rank + "_of_" + newCard.suit + ".png";
      let src = document.getElementById("dealer-hand");
      src.appendChild(img);

      function calculateDealerPoints() {
        dealerSum = newCard.pointValue + dealerSum;
        console.log(dealerSum + " dealerPoints");
      }
      calculateDealerPoints();

      document.getElementById("dealer-points").innerHTML = dealerSum;
    } else {
      let newCard = deck.pop();
      dealerCards.push(newCard);

      let img = document.createElement("img");
      img.src = "./images/" + newCard.rank + "_of_" + newCard.suit + ".png";
      let src = document.getElementById("player-hand");
      src.appendChild(img);

      function calculatePlayerPoints() {
        playerSum = newCard.pointValue + playerSum;
        console.log(playerSum + " playerPoints");
      }
      calculatePlayerPoints();

      document.getElementById("player-points").innerHTML = playerSum;

      if (playerSum > 21) {
        document.getElementById("messages").innerHTML = "Bust";
      }
    }
  }
});

hitButton.addEventListener("click", (e) => {
  let newCard = deck.pop();
  let img = document.createElement("img");
  img.src = "./images/" + newCard.rank + "_of_" + newCard.suit + ".png";
  let src = document.getElementById("player-hand");
  src.appendChild(img);

  function calculatePlayerPoints() {
    playerSum = newCard.pointValue + playerSum;
  }
  calculatePlayerPoints();

  document.getElementById("player-points").innerHTML = playerSum;
  if (playerSum > 21) {
    document.getElementById("messages").innerHTML = "Bust";
    document.getElementById("messages").style.color = "red";
  }
});

standButton.addEventListener("click", (e) => {
  for (let i = dealerSum; i <= 17; i = dealerSum) {
    let newCard = deck.pop();
    let img = document.createElement("img");
    img.src = "./images/" + newCard.rank + "_of_" + newCard.suit + ".png";
    let src = document.getElementById("dealer-hand");
    src.appendChild(img);
    dealerCards.push(newCard);

    function calculateDealerPoints() {
      dealerSum = newCard.pointValue + dealerSum;
      console.log(dealerSum + " dealerPoints");
    }
    calculateDealerPoints();

    document.getElementById("dealer-points").innerHTML = dealerSum;

    if (dealerSum > playerSum && dealerSum <= 21) {
      document.getElementById("messages").innerHTML = "Dealer wins";
      document.getElementById("messages").style.color = "red";
    } else if ((playerSum = dealerSum)) {
      document.getElementById("messages").innerhtml = "Tie";
    } else if (playerSum === 21) {
      document.getElementById("messages").innerHTML = "Player wins";
    } else if (playerSum > dealerSum && playerSum <= 21) {
      document.getElementById("messages").innerHTML = "Player wins";
      document.getElementById("messages").style.color = "green";
    } else if (dealerSum > 21) {
      document.getElementById("messages").innerHTML = "Dealer bust";
    }
  }
});
