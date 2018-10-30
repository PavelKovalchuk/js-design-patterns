/**
 * State
 *
 *  It lets you change the behavior of a class when the state changes.
 *
 *  can be interpreted as a strategy pattern
 *  which is able to switch the current strategy through invocations of
 *  methods defined in the pattern's interface
 *
 */

// **************************** //

// our transformation functions

const upperCase = inputString => inputString.toUpperCase();
const lowerCase = inputString => inputString.toLowerCase();
const defaultTransform = inputString => inputString;

// **************************** //

class TextEditor {
    constructor(transform) {
        this._transform = transform;
    }

    setTransform(transform) {
        this._transform = transform;
    }

    type(words) {
        console.log(this._transform(words));
    }
}

// **************************** //
const editor = new TextEditor(defaultTransform);

editor.type('First line');

editor.setTransform(upperCase);

editor.type('Second line');
editor.type('Third line');

editor.setTransform(lowerCase);

editor.type('Fourth line');
editor.type('Fifth line');

// Output:
// First line
// SECOND LINE
// THIRD LINE
// fourth line
// fifth line

