//FOR VARIABLES DECLARATION

let name = "Arunkumar R.M";
const age = 32;
isStudent = true;

console.log(name);
console.log(age);   
console.log(isStudent);

//FOR OBJECTS

let person = {
    name: "Arunkumar R.M",
    age: 32,
    isStudent: true,
}

console.log(person.isStudent);
console.log(person.name);
console.log(person.age);

//Arrays hold multiple values in an ordered list.

let colors = ["orange", "white", "Green"]
console.log(colors[0]);
console.log(colors[1]); 
console.log(colors[2]);

//To push a new value to the end of an array, use the push() method.
colors.push("Blue");
console.log(colors);

//To remove the last value from an array, use the pop() method.
colors.pop();
console.log(colors);

//To add a new value to the beginning of an array, use the unshift() method.
colors.unshift("Red");

//Function is a block of code designed to perform a particular task.
function welcome(name) {
    console.log("Greetings " + name + "!");
}

welcome("Siddhi");
welcome("Ashwin");

//Function to add two numbers
function addNumbers(num1, num2) {
    return num1+num2;
}
console.log(addNumbers(5, 10));

//Control Structures are used to make decisions and repeat actions in code.

//If-else statement
let score = 76;
if (score >= 75) {
    console.log("You have just passed the exam.");
}else if (score <= 74 && score >= 50) {
    console.log("You have passed the exam.");
    }else if (score < 50) {
    console.log("you have failed the exam.");
}else {
    console.log("Can't determine the score. Please study the course again!");
}

//For loop
for (let i=0; i < 10; i++) {
    console.log("This is the number to be printed from 1 to 9" + i);
}

//While loop
let employeeRank = 6;
while (employeeRank >= 5) {
    console.log("Company Doesn't provide the insurance Rank above 5");
}
