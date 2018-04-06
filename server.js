(function() {
    var foo = 1;
    console.log(foo + " " + bar + " " + baz);
    var bar = 2;
    var baz = 3;
    console.log(foo + " " + bar + " " + baz);
    // Hoisting is the JavaScript interpreter’s action of moving all variable and
    // function declarations to the top of the current scope

})();

foo();

function() {
  console.log("Hello!");
};

// ==========================================================================================

function hoist() {
  a = 20;
  var b = 100;
}

hoist();

console.log(a); 
/* 
Accessible as a global variable outside hoist() function
Output: 20
*/

console.log(b); 
/*
Since it was declared, it is confined to the hoist() function scope.
We can't print it out outside the confines of the hoist() function.
Output: ReferenceError: b is not defined
*/

// ===========================================================================================

console.log(hoist); // Output: undefined

var hoist = 'The variable has been hoisted.';


// =============================================================================================
const hoist;
hoist = 'The variable has been hoisted.';
console.log(hoist); // Output: ReferenceError: hoist is not defined
