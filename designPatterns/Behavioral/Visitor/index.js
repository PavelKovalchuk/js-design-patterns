/**
 * Visitor
 *
 *   let's you add further operations to objects without having to modify them.
 *
 *      It is a way of separating an algorithm from an object structure on which it operates.
 *   A practical result of this separation is the ability to add new operations
 *   to existing object structures without modifying those structures.
 *   It is one way to follow the open/closed principle.
 */

// **************************** //

class Monkey {
    shout() {
        console.log('Ooh oo aa aa!');
    }

    accept(operation) {
        operation.visitMonkey(this);
    }
}

class Lion {
    roar() {
        console.log('Roaaar!');
    }

    accept(operation) {
        operation.visitLion(this);
    }
}

class Dolphin {
    speak() {
        console.log('Tuut tuttu tuutt!');
    }

    accept(operation) {
        operation.visitDolphin(this);
    }
}

// **************************** //

// Let's implement our visitor

const speak = {
    visitMonkey(monkey){
        monkey.shout();
    },
    visitLion(lion){
        lion.roar();
    },
    visitDolphin(dolphin){
        dolphin.speak();
    }
};

const jump = {
    visitMonkey(monkey) {
        console.log('Jumped 20 feet high! on to the tree!');
    },
    visitLion(lion) {
        console.log('Jumped 7 feet! Back on the ground!');
    },
    visitDolphin(dolphin) {
        console.log('Walked on water a little and disappeared');
    }
}

// **************************** //

const monkey = new Monkey();
const lion = new Lion();
const dolphin = new Dolphin();

monkey.accept(speak)  ;  // Ooh oo aa aa!
lion.accept(speak)  ;    // Roaaar!
dolphin.accept(speak) ;  // Tuut tutt tuutt!

monkey.accept(jump)  ;