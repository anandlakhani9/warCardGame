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

//test the compareCard method works


//test that the winner has their cards added to the deck

//test the loser doesn't have cards added to their deck