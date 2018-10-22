/**
 * Builder
 *
 * Allows you to create different flavors of an object while avoiding constructor pollution.
 * Useful when there could be several flavors of an object.
 * Or when there are a lot of steps involved in creation of an object.
 *
 * The key difference from the factory pattern is that factory pattern is to be used
 * when the creation is a one step process
 * while builder pattern is to be used when the creation is a multi step process.
 *
 */

// _______ //

class Burger {
    constructor(builder) {
        this.size = builder.size;
        this.cheeze = builder.cheeze || false;
        this.pepperoni = builder.pepperoni || false;
        this.lettuce = builder.lettuce || false;
        this.tomato = builder.tomato || false;
    }
}

// _______ //

class BurgerBuilder {

    constructor(size) {
        this.size = size;
    }

    addPepperoni() {
        this.pepperoni = true;
        return this;
    }

    addLettuce() {
        this.lettuce = true;
        return this;
    }

    addCheeze() {
        this.cheeze = true;
        return this;
    }

    addTomato() {
        this.tomato = true;
        return this;
    }

    build() {
        return new Burger(this);
    }
}

// _______ //
const burger = (new BurgerBuilder(14))
    .addPepperoni()
    .addLettuce()
    .addTomato()
    .build();

console.log('burger: ', burger);



