const Card = require("../src/card.js")

const Player = function(playerName, hand, currentCard="null"){
    this.playerName = playerName;
    this.hand = hand;
    this.currentCard = currentCard;
}
    
Player.prototype.giveCurrentCard = function() { this.currentCard = this.hand.pop()};

//for testing purposes
Player.prototype.isCard = function(card) {
    // if (card instanceof Card){
    //     return true;
    // }
    // console.log(typeof card)
    // return false;
    return (card instanceof Card)
}

module.exports = Player;