const Deck = require("../src/deck.js");
const Player = require("../src/players.js");
const Card = require("../src/card.js");
const Game = require("../src/game.js");

//the two hands should contain all 52 cards
test("two hands contain all 52 cards", () => {
    const game = new Game();
    game.initGame();
    const twoHandsCombined = new Deck(game.player1.hand.concat(game.player2.hand));
    expect(twoHandsCombined.uniqueArrayLength(twoHandsCombined.deckShuffled)).toBe(52);
})

//test the game's playing state is true when the game has not yet been played
test("If the game has not been won then its playing state is true", () => {
    const game = new Game ();
    game.initGame();
    expect(game.isPlaying).toBe(true);
})

//test that player 1 is updated as the winner when they have 52 cards
test("test that player 1 is updated as the winner when they have 52 cards", () => {
    const game = new Game ();
    game.initGame();
    deck = new Deck([]);
    deck.fillDeck();
    game.player1.hand = deck.deckShuffled;
    game.player2.hand = [];
    game.checkWin();
    expect(game.winner).toBe(game.player1.name);
})

//test that player 2 is updated as the loser when they have 0 cards
test("test that player 2 is updated as the loser when they have 0 cards", () => {
    const game = new Game ();
    game.initGame();
    deck = new Deck([]);
    deck.fillDeck();
    game.player1.hand = deck.deckShuffled;
    game.player2.hand = [];
    game.checkWin();
    expect(game.loser).toBe(game.player2.name);
})


//test that player 2 is updated as the winner when they have 52 cards
test("test that player 2 is updated as the winner when they have 52 cards", () => {
    const game = new Game ();
    game.initGame();
    deck = new Deck([]);
    deck.fillDeck();
    game.player2.hand = deck.deckShuffled;
    game.player1.hand = [];
    game.checkWin();
    expect(game.winner).toBe(game.player2.name);
})

//test that player 1 is updated as the loser when they have 0 cards
test("test that player 1 is updated as the loser when they have 0 cards", () => {
    const game = new Game ();
    game.initGame();
    deck = new Deck([]);
    deck.fillDeck();
    game.player2.hand = deck.deckShuffled;
    game.player1.hand = [];
    game.checkWin();
    expect(game.loser).toBe(game.player1.name);
})

//test the game has not been won when neither player has 52 cards
test("The game has not been won when neither player has 52 cards", () => {
    const game = new Game ();
    game.initGame();
    game.checkWin();
    expect(game.isPlaying).toBe(true);
})

//test the game's playing state is false when the game has finished
test("If the game has been won then its playing state is set to false", () => {
    const game = new Game ();
    game.initGame();
    game.playGame();
    expect(game.isPlaying).toBe(false);
})

//test the rounds property is a positive integer when the game has finished
test("the rounds property is a positive integer when the game has finished", () => {
    const game = new Game ();
    game.initGame();
    game.playGame();
    expect(game.rounds).toBeGreaterThan(0);
})

//test the compareCard method works
test("compareCard works when card2 is higher than card1", () => {
    const game = new Game ();
    game.initGame();
    const card1 = new Card("ten", 10, "Diamond");
    const card2 = new Card("jack", 11, "Diamond");
    const result = game.compareCards(card1, card2);
    expect(result).toBe("card 2 is higher");
})

test("compareCard works when card1 is higher than card2", () => {
    const game = new Game();
    game.initGame();
    const card1 = new Card("nine", 9, "Diamond");
    const card2 = new Card("seven", 7, "Diamond");
    const result = game.compareCards(card1, card2);
    expect(result).toBe("card 1 is higher");
})

//test that the winner has the cards added to their hand
test("winner has two cards added to top of hand", () => {
    const game = new Game();
    game.initGame();
    const card1 = new Card("nine", 9, "Diamond");
    const card2 = new Card("seven", 7, "Diamond");
    const bothCards = [card1, card2];
    game.compareCards(card1, card2);
    const topTwoCards = game.player1.hand.slice(0,2);
    expect(topTwoCards).toContain(card1, card2);
})

//test the loser doesn't have cards added to their hand
test("loser doesn't have cards added to hand", () => {
    const game = new Game();
    game.initGame();
    const card1 = new Card("nine", 9, "Diamond");
    const card2 = new Card("seven", 7, "Diamond");
    game.compareCards(card1, card2);
    expect(game.player2.hand.length).toBe(26);
})