//Class which stores card objects, with name, value and suit properties
const Card = function(name, value, suit) {
    this.name = name.toUpperCase();
    this.value = value;
    this.suit = suit.toUpperCase();
}

module.exports = Card;