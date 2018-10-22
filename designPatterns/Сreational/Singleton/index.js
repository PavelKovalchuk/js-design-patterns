/**
 * Singleton
 *
 * Ensures that only one object of a particular class is ever created.
 *
 * This is useful when exactly one object is needed to coordinate actions across the system.
 *
 * In javascript, singletons can be implemented using the module pattern.
 * Private variables and functions are hidden in a function closure, and public methods are selectively exposed.
 *
 */

// _______ //

const president = (function(){
    const presidentsPrivateInformation = 'Super private';

    const name = 'Turd Sandwich';

    const getName = () => (console.log(name));

    return {
        getName,
    };
}());

president.getName(); // Outputs 'Turd Sandwich'
president.name;
console.log(president.name)// Outputs undefined
president.presidentsPrivateInformation ;// Outputs undefined




