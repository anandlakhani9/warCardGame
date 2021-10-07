const Card = require("../src/card.js");

const Deck = function (deckShuffled) {
    this.deckShuffled = deckShuffled; 
}

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

/* Randomize array in-place using Durstenfeld shuffle algorithm */
/* nicked from ashleedawg https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
//then modified
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

//code taken from stackOverflow
//used for checking each card is uunique by converting to a set 
//for later checking the length is what it should be
Deck.prototype.uniqueArrayLength = function(deckShuffled) {
    //Assign deck to new set (a set is an object of unique values)
    const uniqueDeckValues = new Set(deckShuffled);
    //use spread operator to assign each key-value pair to new array
    //length property should be 52 if all cards are unique
    // return [...uniqueDeckValues].length;
    return uniqueDeckValues.size;
}

Deck.prototype.filterSuit = function(suit) {
    suit = suit.toUpperCase();
    const suitArray = this.deckShuffled.filter((card) => card.suit === suit);
    console.log(suitArray);
    return suitArray.length;
}


cardDeck = new Deck([]);
cardDeck.fillDeck();
cardDeck.filterSuit("CLUBS");

module.exports = Deck;