/**
 * Proxy
 *
 * Using the proxy pattern, a class represents the functionality of another class.
 *
 * A proxy is a wrapper or agent object that is being called by the client
 * to access the real serving object behind the scenes.
 *
 * Use of the proxy can simply be forwarding to the real object, or can provide additional logic.
 *
 *  In the proxy extra functionality can be provided, for example
 *  caching when operations on the real object are resource intensive,
 *  or checking preconditions before operations on the real object are invoked.
 *
 */

// **************************** //

// Firstly we have the door interface and an implementation of door

/*
Door interface :

open()
close()
*/

class LabDoor {
    open() {
        console.log('Opening lab door');
    }

    close() {
        console.log('Closing the lab door');
    }
}

// **************************** //

// Then we have a proxy to secure any doors that we want

class Security {
    constructor(door) {
        this.door = door;
    }

    open(password) {
        if (this.authenticate(password)) {
            this.door.open();
        } else {
            console.log('Big no! It ain\'t possible.');
        }
    }

    authenticate(password) {
        return password === 'ecr@t';
    }

    close() {
        this.door.close();
    }
}

// **************************** //

const door = new Security(new LabDoor());
door.open('invalid'); // Big no! It ain't possible.

door.open('ecr@t'); // Opening lab door
door.close(); // Closing lab door

