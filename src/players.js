const Card = require("../src/card.js")

const Player = function(playerName, hand, currentCard="null", warHand = []){
    this.playerName = playerName;
    this.hand = hand;
    this.currentCard = currentCard;
    this.warHand = warHand;
}
    
Player.prototype.giveCurrentCard = function() { 
    this.currentCard = this.hand.pop();
    this.warHand.push(this.currentCard); };

Player.prototype.createWarHand = function() {
    //this.warHand.unshift(this.hand.slice(-2));
    this.warHand.unshift(this.hand.pop());
    this.warHand.unshift(this.hand.pop());
    console.log(this.warHand);
}

Player.prototype.clearWarHand = function () {
    this.warHand = [];
}

//for testing purposes
Player.prototype.isCard = function(card) {

    return (card instanceof Card)
}

module.exports = Player;