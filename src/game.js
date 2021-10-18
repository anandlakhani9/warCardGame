const Player = require("../src/players.js");
const Deck = require("../src/deck.js");

//Initialise game class with numerous properties of game. isPlaying property used to start game
//and war property used to determine whether 'war' play should commence
const Game = function(player1="", player2="", isPlaying = false, deck = null, winner = null, loser = null,
                      rounds= null, war = false, roundWinner = null) {
    this.player1 = player1;
    this.player2 = player2;
    this.isPlaying = isPlaying;
    this.deck = deck;
    this.winner = winner;
    this.loser = loser;
    this.rounds = rounds;
    this.war = war;
    this.roundWinner = roundWinner;
}

//method to initialise game
Game.prototype.initGame = function(player1Name, player2Name){
    //initialise players
    this.player1 = new Player(player1Name, []);
    this.player2 = new Player(player2Name, []);
    //add and fill deck
    this.deck = new Deck([]);
    this.deck.fillDeck();
    this.deck.shuffleDeck();
    //give cards to players, one at a time to simulate human experience
    this.deck.deckShuffled.forEach((card, index) => {
        if(index % 2 === 0) {
            this.player1.hand.push(this.deck.deckShuffled[index]);
        } else {
            this.player2.hand.push(this.deck.deckShuffled[index]);
        }
    })
    //set isPlaying to true to start card drawing and comparison
    this.isPlaying = true;
}

//pop single card to players for a drawer
Game.prototype.drawCard = function(){
    this.player1.giveCurrentCard();
    this.player2.giveCurrentCard();
  
}

//Compare two cards and add to the winners hand. For this we have assumed the top of the hand corresponds to
//the end of the hand array, and the bottom to the start of the array
Game.prototype.compareCards = function(card1, card2) {
    if(card1.value > card2.value) {
        //generate random number so that cards added to winning hand in a random order
        let randomNumber = Math.floor(2*Math.random());
        if (randomNumber === 1)
        {
            //used loop to ensure all cards from a hand (including 'war' cards) were added
            for (let i = 0; i < this.player1.warHand.length; i++){
                this.player1.hand.unshift(this.player1.warHand[i], this.player2.warHand[i])
            }
        }
        else 
        {
            for (let i = 0; i < this.player1.warHand.length; i++){
                this.player1.hand.unshift(this.player2.warHand[i], this.player1.warHand[i])
            }
            
        }
        //Clear war hands ready for next drawer
        this.player1.clearWarHand();
        this.player2.clearWarHand();
        console.log("p1 wins round")
        this.war = false;
        this.roundWinner = this.player1;
        return ("card 1 is higher");
    }
    else if(card2.value > card1.value) 
    {
        let randomNumber = Math.floor(2*Math.random());
        if (randomNumber === 1)
        {
            for (let i = 0; i < this.player1.warHand.length; i++){
                this.player2.hand.unshift(this.player1.warHand[i], this.player2.warHand[i])
            }
        }
        else 
        {
            for (let i = 0; i < this.player1.warHand.length; i++){
                this.player2.hand.unshift(this.player2.warHand[i], this.player1.warHand[i])
            }
        }
        this.player1.clearWarHand();
        this.player2.clearWarHand();
        console.log("p2 wins round");
        this.war = false;
        this.roundWinner = this.player2;
        return ("card 2 is higher");
     } 
     //In case of draw, initiate war by changing war property of game
     else {
         this.war = true;
     } 
}

//method to check if a player has won by seeing if one hand is empty
Game.prototype.checkWin = function () {
    if (this.player1.hand.length === 0){
        this.isPlaying = false;
        this.winner = this.player2;
        this.loser = this.player1;
    }
    else if (this.player2.hand.length === 0){
        this.isPlaying = false;
        this.winner = this.player1;
        this.loser = this.player2;
    }
}

//method to handle 'war' play
Game.prototype.warPlay = function() {
    while(this.war){
        //only play war if there are at least two cards in both hands, otherwise assign
        //the player with at least two cards as the winner
        if(this.player1.hand.length > 1 && this.player2.hand.length > 1)
        {
            //draw two additional cards needed for war
            this.player1.createWarHand();
            this.player2.createWarHand();
            //use compare method to compare cards
            this.compareCards(this.player1.warHand[0], this.player2.warHand[0]) 
        }
        else if (this.player1.hand.length < 2){
            //In the case player 1 has less than two cards in hand, add their hand to player 2
            for (let i = 0; i < this.player1.hand.length; i++){
                this.player2.hand.unshift(this.player1.hand.pop());
                //this.player2.hand.unshift(this.player2.warHand[i], this.player1.warHand[i])
            };
            this.war = false;
        }
        else {
            //likewise for player 2
            for (let i = 0; i < this.player2.hand.length; i++){
                this.player1.hand.unshift(this.player2.hand.pop());
            };
            this.war = false;
        }
    }
    //ensure to clear war hands when war state is not in play
    this.player1.clearWarHand();
    this.player2.clearWarHand();
}


//Finally, play game method which handle sequence of the game
Game.prototype.playGame = function(){
    this.initGame();
    //Initialise round counter
    let roundCounter = 0;
    //Loop which runs whilst isPlaying === true
    while(this.isPlaying){
        this.checkWin();
        if(!this.isPlaying){break;}
        this.drawCard();
        this.compareCards(this.player1.currentCard, this.player2.currentCard);
        if (this.war){
          this.warPlay();
        };
        roundCounter++;
    }
    this.rounds = roundCounter;
}

//Code used to run game
//const game = new Game()
//game.playGame();


module.exports = Game;
