/**
 * In object-oriented programming (OOP),
 * a factory is an object for creating other objects –
 * formally a factory is a function or method that returns objects of
 * a varying prototype or class from some method call, which is assumed to be "new".
 *
 * When to Use?

 When creating an object is not just a few assignments and involves some logic,
 it makes sense to put it in a dedicated factory instead of repeating the same code everywhere.
 *
 */

/*
Door

getWidth()
getHeight()

*/

// a door interface and the implementation
class WoodenDoor {
    constructor(width, height){
        this.width = width;
        this.height = height;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }
}

//  door factory that makes the door and returns it
const DoorFactory = {
    makeDoor : (width, height) => new WoodenDoor(width, height)
};

// it can be used as
const door = DoorFactory.makeDoor(100, 200);
console.log('door:', door);
console.log('Width:', door.getWidth());
console.log('Height:', door.getHeight());

