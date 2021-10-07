const Deck = require("../src/deck.js");



//deck length should be 52 cards
test("check there are 52 cards in the deck", function(){
    const deck = new Deck([]); 
    deck.fillDeck();
    deck.shuffleDeck();
    expect(deck.deckShuffled.length).toBe(52);
})

//deck unique
test("Check that all the cards in the deck are unique", function() {
    const deck = new Deck([]);
    deck.fillDeck();
    deck.shuffleDeck();
    expect(deck.uniqueArrayLength(deck.deckShuffled)).toBe(52);
})

//suits unique
describe("check there are all 4 suits and they each have 13 unique cards", () => {
    test("clubs", () =>{
        const cardDeck = [];
        deck = new Deck(cardDeck);
        deck.fillDeck();
        deck.shuffleDeck();
        expect(deck.filterSuit("CLUBS")).toBe(13);
    })
    test("spades", () =>{
        const cardDeck = [];
        deck = new Deck(cardDeck);
        deck.fillDeck();
        deck.shuffleDeck();
        expect(deck.filterSuit("spades")).toBe(13);
    })
    test("hearts", () =>{
        const cardDeck = [];
        deck = new Deck(cardDeck);
        deck.fillDeck();
        deck.shuffleDeck();
        expect(deck.filterSuit("hearts")).toBe(13);
    })
    test("diamonds", () =>{
        const cardDeck = [];
        deck = new Deck(cardDeck);
        deck.fillDeck();
        deck.shuffleDeck();
        expect(deck.filterSuit("diamonds")).toBe(13);
    })
})
