const Card = require("../src/card.js");


//A deck class which handles the original creation and shuffling of the deck
const Deck = function (deckShuffled) {
    this.deckShuffled = deckShuffled; 
}

//method which fills the deck and updates the deckShuffled array
Deck.prototype.fillDeck = function() {
    const suits = ["clubs", "spades", "hearts", "diamonds"];
    const names = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "Jack", "Queen", "King", "Ace"];
    const deck = []
    const namesLength = names.length; 
    for (suit of suits){
        for (i=0;i<namesLength;i++){
            deck.push(new Card(names[i],i + 2, suit));
        }
    }
    this.deckShuffled = deck;
}

//Randomize array in-place using Durstenfeld shuffle algorithm
//Snippet taken from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
Deck.prototype.shuffleDeck = function() {
    const deck = this.deckShuffled;
    let deckLength = deck.length;
    for (let i = deckLength - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    this.deckShuffled = deck;
}

/*Deck.prototype.shuffleDeck = function() {
    const deck = this.deckShuffled;
    this.deckShuffled = deck;
}*/

//method so that we can test how many unique cards are within the deck
Deck.prototype.uniqueArrayLength = function(deckShuffled) {
    //Assign deck to new set (a set is an object of unique values)
    const uniqueDeckValues = new Set(deckShuffled);
    return uniqueDeckValues.size;
}

//method for testing purposes so that we can check all suits are full
Deck.prototype.filterSuit = function(suit) {
    suit = suit.toUpperCase();
    const suitArray = this.deckShuffled.filter((card) => card.suit === suit);
    //console.log(suitArray);
    return suitArray.length;
}

module.exports = Deck;