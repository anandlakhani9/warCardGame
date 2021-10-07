const Card = require("../src/card.js")

const Player = function(playerName, hand, currentCard="null"){
    this.playerName = playerName;
    this.hand = hand;
    this.currentCard = currentCard;
}
    
Player.prototype.giveCurrentCard = function() { this.currentCard = this.hand.pop()};

//for testing purposes
Player.prototype.isCard = function(card) {

    return (card instanceof Card)
}

module.exports = Player;