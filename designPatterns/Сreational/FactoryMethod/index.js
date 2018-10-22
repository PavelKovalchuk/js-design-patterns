/**
 * Factory Method
 *
 * It provides a way to delegate the instantiation logic to child classes.
 *
 * In class-based programming, the factory method pattern is a creational pattern
 * that uses factory methods to deal with the problem of creating objects
 * without having to specify the exact class of the object that will be created.
 *
 * This is done by creating objects by calling a factory method—either specified in
 * an interface and implemented by child classes, or implemented in a base class
 * and optionally overridden by derived classes—rather than by calling a constructor.
 *
 * Useful when there is some generic processing in a class but
 * the required sub-class is dynamically decided at runtime.
 * Or putting it in other words, when the client doesn't know what exact sub-class it might need.
 *
 */

/*
Interviewer interface

askQuestions()
*/

class Developer {
    askQuestions() {
        console.log('Asking about design patterns!');
    }
}

class CommunityExecutive {
    askQuestions() {
        console.log('Asking about community building');
    }
}

// _______ //
class HiringManager {

    // every child class should have makeInterviewer method

    takeInterview() {
        const interviewer = this.makeInterviewer();
        interviewer.askQuestions();
    }
}

class DevelopmentManager extends HiringManager {
    makeInterviewer() {
        return new Developer();
    }
}

class MarketingManager extends HiringManager {
    makeInterviewer() {
        return new CommunityExecutive();
    }
}

// _______ //

const devManager = new DevelopmentManager();
devManager.takeInterview(); // Output: Asking about design patterns
(new DevelopmentManager()).takeInterview();

const marketingManager = new MarketingManager();
marketingManager.takeInterview(); // Output: Asking about community building.


