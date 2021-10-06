const Card = require("../src/card.js");

const Deck = function (deckShuffled) {
    this.deckShuffled = deckShuffled; 
}

Deck.prototype.fillDeck = function() {
    const suits = ["clubs", "spades", "hearts", "diamonds"];
    const names = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen"];
    const deck = []
    const namesLength = names.length; 
    for (suit of suits){
        for (i=0;i<namesLength;i++){
            deck.push(new Card(names[i],i + 2, suit));
        }
    }
    this.deckShuffled = deck;
}