/**
 * Abstract Factory
 *
 * A factory of factories a factory that groups the individual but related/dependent factories together
 * without specifying their concrete classes.
 *
 * When there are interrelated dependencies with not-that-simple creation logic involved
 *
 */

/*
Door interface :

getDescription()
*/

class WoodenDoor {
    getDescription() {
        console.log('I am a wooden door');
    }
}

class IronDoor {
    getDescription() {
        console.log('I am an iron door');
    }
}

// _______ //

/*
DoorFittingExpert interface :

getDescription()
*/

class Welder {
    getDescription() {
        console.log('I can only fit iron doors');
    }
}

class Carpenter {
    getDescription() {
        console.log('I can only fit wooden doors');
    }
}

// _______ //

/*
DoorFactory interface :

makeDoor()
makeFittingExpert()
*/

// Wooden factory to return carpenter and wooden door
class WoodenDoorFactory {
    makeDoor(){
        return new WoodenDoor();
    }

    makeFittingExpert() {
        return new Carpenter();
    }
}

// Iron door factory to get iron door and the relevant fitting expert
class IronDoorFactory {
    makeDoor(){
        return new IronDoor();
    }

    makeFittingExpert() {
        return new Welder();
    }
}

// _______ //

const woodenFactory = new WoodenDoorFactory();

const door = woodenFactory.makeDoor();
const expert = woodenFactory.makeFittingExpert();

door.getDescription(); // Output: I am a wooden door
expert.getDescription();// Output: I can only fit wooden doors

// Same for Iron Factory
const ironFactory = new IronDoorFactory();

const door2 = ironFactory.makeDoor();
const expert2 = ironFactory.makeFittingExpert();

door2.getDescription() ; // Output: I am an iron door
expert2.getDescription();// Output: I can only fit iron doors


