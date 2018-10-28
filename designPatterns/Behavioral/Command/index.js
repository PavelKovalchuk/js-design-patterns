/**
 * Command
 *
 *  Allows you to encapsulate actions in objects.
 * The key idea behind this pattern is to provide the tool to decouple client from receiver.
 *
 * in which an object is used to encapsulate all information needed
 * to perform an action or trigger an event at a later time.
 * This information includes the method name, the object that owns the method
 * and values for the method parameters.
 */

// **************************** //

// Receiver
class Bulb {
    turnOn() {
        console.log('Bulb has been lit');
    }

    turnOff() {
        console.log('Darkness!');
    }
}

// **************************** //
// an interface that each of the commands are going to implement and then we have a set of commands

/*
Command interface :

    execute()
    undo()
    redo()
*/

// Command
class TurnOnCommand {
    constructor(bulb) {
        this.bulb = bulb;
    }

    execute() {
        this.bulb.turnOn();
    }

    undo() {
        this.bulb.turnOff();
    }

    redo() {
        this.execute();
    }
}

class TurnOffCommand {
    constructor(bulb) {
        this.bulb = bulb;
    }

    execute() {
        this.bulb.turnOff();
    }

    undo() {
        this.bulb.turnOn();
    }

    redo() {
        this.execute();
    }
}

// **************************** //
// an Invoker with whom the client will interact to process any commands

// Invoker
class RemoteControlInvoker {
    submit(command) {
        command.execute();
    }
}

// **************************** //
const bulb = new Bulb();

const turnOn = new TurnOnCommand(bulb);
const turnOff = new TurnOffCommand(bulb);

const remote = new RemoteControlInvoker();
remote.submit(turnOn); // Bulb has been lit!
remote.submit(turnOff); // Darkness!


