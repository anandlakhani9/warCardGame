const Card = require("../src/card.js");
describe("Test card creation", () => {
    
    test("card has name" , () => {
        const card = new Card("ten", 10, "Diamond");
        const name = card.name;
        expect(name).toBe("ten".toUpperCase())
    })
    
    test("card has value" , () => {
        const card = new Card("ten", 10, "Diamond");
        const value = card.value;
        expect(value).toBe(10);

    })
    
    test("card has suit" , () => {
        const card = new Card("ten", 10, "Diamond");
        const suit = card.suit;
        expect(suit).toBe("Diamond".toUpperCase());

    })
})