/**
 * Composite
 *
 * Composite pattern lets clients to treat the individual objects in a uniform manner.
 *
 * The composite pattern describes that a group of objects is to be treated
 * in the same way as a single instance of an object.
 *
 */

// **************************** //

// Here we have different employee types

/*
Employee interface :

constructor(name, salary)
getName()
setSalary()
getSalary()
getRoles()
*/

class Developer {

    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    getName() {
        return this.name;
    }

    setSalary(salary) {
        this.salary = salary;
    }

    getSalary() {
        return this.salary;
    }

    getRoles() {
        return this.roles;
    }

    develop() {
        /* */
    }
}

class Designer {

    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    getName() {
        return this.name;
    }

    setSalary(salary) {
        this.salary = salary;
    }

    getSalary() {
        return this.salary;
    }

    getRoles() {
        return this.roles;
    }

    design() {
        /* */
    }
}

// **************************** //
// we have an organization which consists of several different types of employees

class Organization {
    constructor(){
        this.employees = [];
    }

    addEmployee(employee) {
        this.employees.push(employee);
    }

    getNetSalaries() {
        let netSalary = 0;

        this.employees.forEach(employee => {
            netSalary += employee.getSalary();
        });

        return netSalary;
    }
}

// **************************** //

// it can be used as

// Prepare the employees
const john = new Developer('John Doe', 12000);
const jane = new Designer('Jane', 10000);

// Add them to organization
const organization = new Organization();
organization.addEmployee(john);
organization.addEmployee(jane);

console.log("Net salaries: " , organization.getNetSalaries()); // Net Salaries: 22000


