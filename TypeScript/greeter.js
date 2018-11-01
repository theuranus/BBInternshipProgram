var Student = /** @class */ (function () {
    function Student(firstName, middleInit, lastName) {
        this.firstName = firstName;
        this.middleInit = middleInit;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInit + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello " + person.firstName + " " + person.lastName + " ----- (" + person.fullName + ")";
}
// const user = { firstName: 'Bao', lastName: 'Thai' };
var user = new Student('John', 'D.', 'Smith');
document.body.innerHTML = greeter(user);
