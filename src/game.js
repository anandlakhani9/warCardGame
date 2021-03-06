const Player = require("../src/players.js");
const Deck = require("../src/deck.js");

const Game = function(player1="", player2="", isPlaying = false, deck = null, winner = null, loser = null,
                      rounds= null) {
    this.player1 = player1;
    this.player2 = player2;
    this.isPlaying = isPlaying;
    this.deck = deck;
    this.winner = winner;
    this.loser = loser;
    this.rounds = rounds;
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

//pop cards to players
Game.prototype.drawCard = function(){
    this.player1.giveCurrentCard();
    this.player2.giveCurrentCard();
  
}
//compare cards - and add to other's hand
Game.prototype.compareCards = function(card1, card2) {
    if(card1.value >= card2.value) {
        let randomNumber = Math.floor(2*Math.random());
        //console.log(randomNumber);
        if (randomNumber === 1)
        {
            this.player1.hand.unshift(card1, card2);
            //this.player1.hand.unshift(card2);
        }
        else 
        {
            this.player1.hand.unshift(card2, card1);
            //this.player1.hand.unshift(card2);
            
        }
        //console.log("p1 wins round") 
        return ("card 1 is higher")
    }
    else if(card2.value > card1.value) 
    {
        let randomNumber = Math.floor(2*Math.random());
        if (randomNumber === 1)
        {
            this.player2.hand.unshift(card1, card2);
            //this.player1.hand.unshift(card2);
        }
        else 
        {
            this.player2.hand.unshift(card2, card1);
            //this.player1.hand.unshift(card2);
            
        }
        //console.log("p2 wins round") 
        return ("card 2 is higher")
    }
}

Game.prototype.checkWin = function () {
    if (this.player1.hand.length === 52){
        //console.log("Player 1 wins")
        this.isPlaying = false;
        this.winner = this.player1.name;
        this.loser = this.player2.name
    }
    else if (this.player2.hand.length === 52){
        //console.log("Player 2 wins")
        this.isPlaying = false;
        this.winner = this.player2.name;
        this.loser = this.player1.name;
    }
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

module.exports = Game;