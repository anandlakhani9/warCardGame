const Player = require("../src/players.js");
const Deck = require("../src/deck.js");

const Game = function(player1="", player2="", isPlaying = false, deck = null) {
    this.player1 = player1;
    this.player2 = player2;
    this.isPlaying = isPlaying;
    this.deck = deck;
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
    this.player1.hand = this.deck.deckShuffled.slice(0,26);
    this.player2.hand = this.deck.deckShuffled.slice(26,52);
    this.isPlaying = true;
}

//pop cards to players
Game.prototype.drawCard = function(){
    this.player1.giveCurrentCard();
    this.player2.giveCurrentCard();
  
}
//compare cards - and add to other's hand
Game.prototype.compareCards = function(card1, card2) {
    if(card1.value > card2.value) {
        this.player1.hand.unshift(card1, card2);
        //this.player1.hand.unshift(card2);
        console.log("p1 wins round")
        return ("card 1 is higher")
    }
    else if(card2.value > card1.value) 
    {
        this.player2.hand.unshift(card2);
        this.player2.hand.unshift(card1);
        //this.player2.hand.unshift(card2);
        console.log("p2 wins round")
        return ("card 2 is higher")
    }
}

Game.prototype.checkWin = function () {
    if (this.player1.hand.length === 52){
        console.log("Player 1 wins")
        this.isPlaying = false;
    }
    else if (this.player2.hand.length === 52){
        console.log("Player 2 wins")
        this.isPlaying = false;
    }
}

Game.prototype.playGame = function(){
    this.initGame();
    console.log(this.player1.hand.length);
    // console.log("\n\n")
    console.log(this.player2.hand.length);
    //all game logic goes in here
    while(this.isPlaying){
    //for(i=0;i<30;i++){
        this.checkWin();
        if(!this.isPlaying){break;}
        //console.log(this.player1.hand.length);
        this.drawCard();
        console.log(this.player1.currentCard);
        console.log(this.player2.currentCard);
        this.compareCards(this.player1.currentCard, this.player2.currentCard);
        console.log("p1 has: " + this.player1.hand.length);
        console.log("p2 has: " + this.player2.hand.length);
    }
}

const game = new Game()
game.playGame();

module.exports = Game;