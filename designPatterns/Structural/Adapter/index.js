/**
 * Adapter
 *
 *  Adapter pattern lets you wrap an otherwise incompatible object in an adapter
 *  to make it compatible with another class.
 *
 *  to make existing classes work with others without modifying their source code
 *
 */

// **************************** //

/*
Lion interface :

roar()
*/

// an interface Lion that all types of lions have to implement
class AfricanLion  {
    roar() {
        console.log('AfricanLion roar');
    }
}

class AsianLion  {
    roar() {
        console.log('AsianLion roar');
    }
}

// **************************** //

class Hunter {
    hunt(lion) {
        // ... some code before
        console.log('Hunter hunt');
        lion.roar();
        //... some code after
    }
}

// **************************** //
// dog has a different interface.
// To make it compatible for our hunter, we will have to create an adapter that is compatible

class WildDog {
    bark() {
        console.log('WildDog bark');
    }
}

// Adapter around wild dog to make it compatible with our game
class WildDogAdapter {

    constructor(dog) {
        this.dog = dog;
    }

    roar() {
        this.dog.bark();
    }
}

// **************************** //

const wildDog = new WildDog();
const wildDogAdapter = new WildDogAdapter(wildDog);

const hunter = new Hunter();
hunter.hunt(wildDogAdapter);

