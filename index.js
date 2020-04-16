// hee hee hoo hoo taku was here uwu
console.log('Hello World');
let name = 'Taku';
console.log(name);


//cannot be a reserved keyword
//should be meaningful
//cannot start with a number
//cannot contain a space or hyphen
//are case-sensitive

let firstName = 'Faisal', lastName = 'Farrash';

let interestRate = 0.3;
interestRate = 1;
console.log(interestRate);

const taku = 'cute';

let string = 'String';  //String Literal
let number = 1;         //Number Literal
let boolean = true;     //Boolean Literal
let UNDEFINED;          //Default
let NULL = null;        //Nothing
let object = {};        //Object Literal
let array = [];         //Array Literal

let person = {
    name: 'Taku',
    age: 16
};

person.name = 'Faisal';

person['name'] = 'Faisal';

console.log(person.name);

let selectedColors = ['red','blue'];
selectedColors[2] = 'green'
console.log(selectedColors);
console.log(selectedColors[0]);
console.log(selectedColors.length);

function greet(name) {
    console.log('YO WHATTUP ' + name);
}

greet('TAKU');

function square(number) {
    return number * number;
}

squared = square(2);
console.log(squared);
console.log(square(3));

function showImage(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    img.style= "position:relative; top:100px; left:800px;"

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}