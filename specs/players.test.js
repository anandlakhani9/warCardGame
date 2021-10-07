const Deck = require("../src/deck.js");
const Player = require("../src/players.js");
const Card = require("../src/card.js")

//test they can have a name 
test ("player has a name", function(){
    const player = new Player("Person A", ["number", "number2", "number3"]);
    expect(player.playerName).toBeTruthy();
})

//test they have a hand
test ("test they can have a hand of cards", () => {
    const deck = new Deck([]);
    deck.fillDeck();
    deck.shuffleDeck();
    const player = new Player("Person", deck.deckShuffled);
    for(i=0;i<player.hand.length;i++){
        card = player.hand[i];
        expect(player.isCard(card)).toBe(true);
    }
})


//test they have a current card
test("test they have a current card", () => {
    const deck = new Deck([]);
    deck.fillDeck();
    deck.shuffleDeck();
    const topCard = deck.deckShuffled[deck.deckShuffled.length - 1]
    const player = new Player("Person", deck.deckShuffled);
    player.giveCurrentCard();
    expect(player.currentCard).toBe(topCard);
})

//test the array shrinks when giving a current card
test("test the hand has shrunk by 1", () => {
    const deck = new Deck([]);
    deck.fillDeck();
    deck.shuffleDeck();
    const player = new Player("Person", deck.deckShuffled);
    const handLength = player.hand.length;
    player.giveCurrentCard();
    expect(player.hand.length).toBe(handLength - 1);
})