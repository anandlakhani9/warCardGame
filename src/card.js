const Card = function(name, value, suit) {
    this.name = name.toUpperCase();
    this.value = value;
    this.suit = suit.toUpperCase();
}

module.exports = Card;