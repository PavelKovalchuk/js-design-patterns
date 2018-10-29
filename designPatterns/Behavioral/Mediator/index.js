/**
 * Mediator
 *
 *  Mediator pattern adds a third party object (called mediator) to control the interaction between
 *  two objects (called colleagues).
 *  It helps reduce the coupling between the classes communicating with each other.
 *  Because now they don't need to have the knowledge of each other's implementation.
 *
 *  the mediator pattern defines an object that encapsulates how a set of objects interact.
 *
 *
 */

// **************************** //

// Mediator
class ChatRoom {
    showMessage(user, message) {
        const time = new Date();
        const sender = user.getName();

        console.log(time + '[' + sender + ']:' + message);
    }
}

// **************************** //
// Then we have our users i.e. colleagues

class User {
    constructor(name, chatMediator) {
        this.name = name;
        this.chatMediator = chatMediator;
    }

    getName() {
        return this.name;
    }

    send(message) {
        this.chatMediator.showMessage(this, message);
    }
}

// **************************** //
//
const mediator = new ChatRoom();

const john = new User('John Doe', mediator);
const jane = new User('Jane Doe', mediator);

john.send('Hi there!');
jane.send('Hey!');

// Output will be
// Feb 14, 10:58 [John]: Hi there!
// Feb 14, 10:58 [Jane]: Hey!