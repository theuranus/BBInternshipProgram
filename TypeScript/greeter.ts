class Student {
    fullName: string;
    constructor(public firstName: string, public middleInit: string, public lastName: string) {
        this.fullName = `${firstName} ${middleInit} ${lastName}`;
    }
}

interface Person {
    firstName: string;
    lastName: string;
    fullName: string;
}

function greeter(person: Person) {
    return `Hello ${person.firstName} ${person.lastName} ----- (${person.fullName})`;
}

// const user = { firstName: 'Bao', lastName: 'Thai' };
const user = new Student('John', 'D.', 'Smith');

document.body.innerHTML = greeter(user);