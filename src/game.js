const Player = require("../src/players.js");
const Deck = require("../src/deck.js");

const Game = function(player1="", player2="", isPlaying = false, deck = null, winner = null, loser = null,
                      rounds= null, war = false) {
    this.player1 = player1;
    this.player2 = player2;
    this.isPlaying = isPlaying;
    this.deck = deck;
    this.winner = winner;
    this.loser = loser;
    this.rounds = rounds;
    this.war = war;
}


Game.prototype.initGame = function(player1Name, player2Name){
    //initialise players
    this.player1 = new Player(player1Name, []);
    this.player2 = new Player(player2Name, []);
    //add and fill deck
    this.deck = new Deck([]);
    this.deck.fillDeck();
    this.deck.shuffleDeck();
    //give cards to players
    this.deck.deckShuffled.forEach((card, index) => {
        if(index % 2 === 0) {
            this.player1.hand.push(this.deck.deckShuffled[index]);
        } else {
            this.player2.hand.push(this.deck.deckShuffled[index]);
        }
    })
    //give cards to players
    //this.player1.hand = this.deck.deckShuffled.slice(0,26);
    //this.player2.hand = this.deck.deckShuffled.slice(26,52);
    this.isPlaying = true;
}

//pop single card to players
Game.prototype.drawCard = function(){
    this.player1.giveCurrentCard();
    this.player2.giveCurrentCard();
  
}

//draw players card in instance of war
//  Game.prototype.playWarHand = function () {
//         if (this.war === false)
//         {
//             return;
//         }
//         this.player1.createWarHand();
//         this.player2.createWarHand();
//         console.log('yo');
//         this.compareCards(this.player1.warHand.slice(0, 1), this.player2.warHand.slice(0, 1));
// }

//let counter = 0;

//compare cards - and add to other's hand
Game.prototype.compareCards = function(card1, card2) {
    if(card1.value > card2.value) {
        let randomNumber = Math.floor(2*Math.random());
        //console.log(randomNumber);
        if (randomNumber === 1)
        {
            for (let i = 0; i < this.player1.warHand.length; i++){
                this.player1.hand.unshift(this.player1.warHand[i], this.player2.warHand[i])
            }
            //this.player1.hand.unshift(card1, card2);
            //this.player1.hand.unshift(card2);
        }
        else 
        {
            for (let i = 0; i < this.player1.warHand.length; i++){
                this.player1.hand.unshift(this.player2.warHand[i], this.player1.warHand[i])
            }
            //this.player1.hand.unshift(card2, card1);
            //this.player1.hand.unshift(card2);
            
        }
        this.player1.clearWarHand();
        this.player2.clearWarHand();
        console.log("p1 wins round")
        this.war = false;
        return ("card 1 is higher")
    }
    else if(card2.value > card1.value) 
    {
        let randomNumber = Math.floor(2*Math.random());
        if (randomNumber === 1)
        {
            for (let i = 0; i < this.player1.warHand.length; i++){
                this.player2.hand.unshift(this.player1.warHand[i], this.player2.warHand[i])
            }
            //this.player2.hand.unshift(card1, card2);
            //this.player1.hand.unshift(card2);
        }
        else 
        {
            for (let i = 0; i < this.player1.warHand.length; i++){
                this.player2.hand.unshift(this.player2.warHand[i], this.player1.warHand[i])
            }
            //this.player2.hand.unshift(card2, card1);
            //this.player1.hand.unshift(card2);
            
        }
        this.player1.clearWarHand();
        this.player2.clearWarHand();
        console.log("p2 wins round");
        console.log(this.player1.hand);
        console.log(this.player2.hand); 
        this.war = false;
        return ("card 2 is higher");
     } else {
         this.war = true;
         console.log('lolo');
     } 
}

Game.prototype.checkWin = function () {
    if (this.player1.hand.length === 0){
        //console.log("Player 1 wins")
        this.isPlaying = false;
        this.winner = this.player1.name;
        this.loser = this.player2.name
        console.log('yoyo');
    }
    else if (this.player2.hand.length === 0){
        //console.log("Player 2 wins")
        this.isPlaying = false;
        this.winner = this.player2.name;
        this.loser = this.player1.name;
        console.log('oioi');
    }
}
Game.prototype.warPlay = function() {
    console.log("Hello")
    console.log(this.war);
    while(this.war){
        if(this.player1.hand.length > 1 && this.player2.hand.length > 1)
        {
            console.log("gldkjg");
            this.player1.createWarHand();
            console.log(this.player1.warHand[0]);
            this.player2.createWarHand();
            console.log(this.player2.warHand[0]),
            this.compareCards(this.player1.warHand[0], this.player2.warHand[0]) 
        }
        else if (this.player1.hand.length < 2){
            console.log("peen");
            for (let i = 0; i < this.player1.hand.length; i++){
                this.player2.hand.unshift(this.player1.hand.pop());
                //this.player2.hand.unshift(this.player2.warHand[i], this.player1.warHand[i])
            };
            // for (let i = 0; i < this.player1.warHand.length; i++){
            //     this.player2.hand.unshift(this.player2.warHand[i], this.player1.warHand[i])
            // };
            //this.player1.hand = [];
            this.war = false;
        }
        else {
            console.log("leen");
            for (let i = 0; i < this.player2.hand.length; i++){
                this.player1.hand.unshift(this.player2.hand.pop());
                //this.player1.hand.unshift(this.player2.warHand[i], this.player1.warHand[i])
            };
            // for (let i = 0; i < this.player1.warHand.length; i++){
            //     this.player1.hand.unshift(this.player2.warHand[i], this.player1.warHand[i])
            // };
            //this.player2.hand = [];
            this.war = false;
        }
    }
    this.player1.clearWarHand();
    this.player2.clearWarHand();
}

Game.prototype.playGame = function(){
    this.initGame();
    console.log(this.player1.hand.length);
    // console.log("\n\n")
    console.log(this.player2.hand.length);
    //Initialise round counter
    let roundCounter = 0;
    //all game logic goes in here
    while(this.isPlaying){
    //for(i=0;i<10;i++){
        this.checkWin();
        if(!this.isPlaying){break;}
        //console.log(this.player1.hand.length);
        this.drawCard();
        //console.log(this.player1.currentCard);
        //console.log(this.player2.currentCard);
        this.compareCards(this.player1.currentCard, this.player2.currentCard);
        if (this.war){
          this.warPlay();
        };
        //console.log("p1 has: " + this.player1.hand.length);
        //console.log(this.player1.hand);
        //console.log("p2 has: " + this.player2.hand.length);
        //console.log(this.player2.hand);
        roundCounter++;
    }
    this.rounds = roundCounter;
}


const game = new Game()
game.playGame();
console.log(game.rounds);

module.exports = Game;

// if player1.hand[1] > player2.hand[1]{
//     card1 = player1.hand.pop()
//     card2 = player1.hand.pop()
//     card3 = player2.hand.pop()
//     card4 = player2.hand.pop()
//     player1.hand.unshift(card1, card2,card3, card4, player1.currentcard, player2.currentcard)
// }