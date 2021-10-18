const Card = require("../src/card.js")

//Player class has a name, hand, a current card which corresponds to a single card draw
//and a war hand which is their ongoing hand in case a 'war' situation is reached
const Player = function(playerName, hand=[], currentCard="null", warHand = []){
    this.playerName = playerName;
    this.hand = hand;
    this.currentCard = currentCard;
    this.warHand = warHand;
}
 
//method which gives the player their current card
Player.prototype.giveCurrentCard = function() { 
    this.currentCard = this.hand.pop();
    this.warHand.push(this.currentCard); };

//method which draws two extra cards for the 'war' scenario, and stores it in the war hand array
Player.prototype.createWarHand = function() {
   
    this.warHand.unshift(this.hand.pop());
    this.warHand.unshift(this.hand.pop());
    console.log(this.warHand);
}

//method which clears the war hand ready for future war scenarios
Player.prototype.clearWarHand = function () {
    this.warHand = [];
}

//for testing purposes
Player.prototype.isCard = function(card) {

    return (card instanceof Card)
}

module.exports = Player;