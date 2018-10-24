/**
 * Decorator
 *
 *  Decorator pattern lets you dynamically change the behavior of an object
 *  at run time by wrapping them in an object of a decorator class.
 *
 *  without affecting the behavior of other objects from the same class.
 *
 *  often useful for adhering to the Single Responsibility Principle,
 *  as it allows functionality to be divided between classes with unique areas of concern
 *
 */

// **************************** //

/*
Coffee interface:
getCost()
getDescription()
*/

class SimpleCoffee{

    getCost() {
        return 10;
    }

    getDescription() {
        return 'Simple coffee';
    }
}

// **************************** //
//making the code extensible to allow options to modify it if required

class MilkCoffee {

    constructor(coffee) {
        this.coffee = coffee;
    }

    getCost() {
        return this.coffee.getCost() + 2;
    }

    getDescription() {
        return this.coffee.getDescription() + ', milk';
    }
}

class WhipCoffee {

    constructor(coffee) {
        this.coffee = coffee;
    }

    getCost() {
        return this.coffee.getCost() + 5;
    }

    getDescription() {
        return this.coffee.getDescription() + ', whip';
    }
}

class VanillaCoffee {

    constructor(coffee) {
        this.coffee = coffee;
    }

    getCost() {
        return this.coffee.getCost() + 3;
    }

    getDescription() {
        return this.coffee.getDescription() + ', vanilla';
    }
}

// **************************** //

let someCoffee;

someCoffee = new SimpleCoffee();
console.log(someCoffee.getCost());// 10
console.log(someCoffee.getDescription());// Simple Coffee

someCoffee = new MilkCoffee(someCoffee);
console.log(someCoffee.getCost());// 12
console.log(someCoffee.getDescription());// Simple Coffee, milk

someCoffee = new WhipCoffee(someCoffee);
console.log(someCoffee.getCost());// 17
console.log(someCoffee.getDescription());// Simple Coffee, milk, whip

someCoffee = new VanillaCoffee(someCoffee);
console.log(someCoffee.getCost());// 20
console.log(someCoffee.getDescription());// Simple Coffee, milk, whip, vanilla



