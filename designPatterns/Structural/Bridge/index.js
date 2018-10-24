/**
 * Bridge
 *
 *  Bridge pattern is about preferring composition over inheritance.
 *  Implementation details are pushed from a hierarchy to another object with a separate hierarchy.
 *
 *  decouple an abstraction from its implementation so that the two can vary independently
 *
 */

// **************************** //

/*
Webpage interface :

constructor(theme)
getContent()
*/

class About{
    constructor(theme) {
        this.theme = theme;
    }

    getContent() {
        return "About page in " + this.theme.getColor();
    }
}

class Careers{
    constructor(theme) {
        this.theme = theme;
    }

    getContent() {
        return "Careers page in " + this.theme.getColor();
    }
}

// **************************** //
// separate theme hierarchy
/*
Theme interface :

getColor()
*/

class DarkTheme{
    getColor() {
        return 'Dark Black';
    }
}
class LightTheme{
    getColor() {
        return 'Off white';
    }
}
class AquaTheme{
    getColor() {
        return 'Light blue';
    }
}

// **************************** //
const darkTheme = new DarkTheme();
const lightTheme = new LightTheme();

const about = new About(lightTheme);
const careers = new Careers(lightTheme);

console.log(about.getContent() );// "About page in Dark Black"
console.log(careers.getContent() );// "Careers page in Dark Black"

