//MAP
let map = new Map();

map.set('uday',1992);

console.log(map.get('uday'));

console.log(map.has('uday'));

console.log(map.delete('uday'));

console.log(map.has('uday'));

console.log(map.size);


let map = new Map([
    [ 1, 'one' ],
    [ 2, 'two' ],
    [ 3, 'three' ], // trailing comma is ignored
]);

console.log(map);


let map = new Map();

const KEY1 = {};
map.set(KEY1, 'hello');
console.log(map.get(KEY1)); // hello

const KEY2 = {};
map.set(KEY2, 'world');
console.log(map.get(KEY2)); // world

console.log(map);



let map = new Map([
    [false, 'no'],
    [true,  'yes'],
]);

for (let key of map.keys()) {
    console.log(key);
}

for (let value of map.values()) {
    console.log(value);
}

for (let entry of map.entries()) {
    console.log(entry[0], entry[1]);
}


for (let [key, value] of map.entries()) {
    console.log(key, value);
}


for (let [key, value] of map) {
    console.log(key, value);
}


let arr = [2, 11, -1];
console.log(Math.max(...arr));

let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);
let arr = [...map.keys()]; // [1, 2, 3]
console.log(arr);


let map = new Map([
    [false, 'no'],
    [true,  'yes'],
]);

map.forEach((value, key) => {
    console.log(key, value);
});


let map0 = new Map()
.set(1, 'a')
.set(2, 'b')
.set(3, 'c');

let map1 = new Map(
    [...map0] // step 1
    .filter(([k, v]) => k < 3) // step 2
); // step 3
// Resulting map: {1 => 'a', 2 => 'b'}

console.log(map1);


let map2 = new Map(
    [...map0] // step 1
    .map(([k, v]) => [k * 2, '_' + v]) // step 2
);

console.log(map2)

// Map API  
// Handling single entries:

// Map.prototype.get(key) : any
// Returns the value that key is mapped to in this map. If there is no key key in this map, undefined is returned.

// Map.prototype.set(key, value) : this
// Maps the given key to the given value. If there is already an entry whose key is key, it is updated. Otherwise, a new entry is created.

// Map.prototype.has(key) : boolean
// Returns whether the given key exists in this map.

// Map.prototype.delete(key) : boolean
// If there is an entry whose key is key, it is removed and true is returned. Otherwise, nothing happens and false is returned.

// Handling all entries:

// get Map.prototype.size : number
// Returns how many entries there are in this map.

// Map.prototype.clear() : void
// Removes all entries from this map.

// Iterating and looping: happens in the order in which entries were added to a map.

// Map.prototype.entries() : Iterable<[any,any]>
// Returns an iterable with one [key,value] pair for each entry in this map. The pairs are arrays of length 2.

// Map.prototype.forEach((value, key, collection) => void, thisArg?) : void
// The first parameter is a callback that is invoked once for each entry in this map. If thisArg is provided, this is set to it for each invocation. Otherwise, this is set to undefined.

// Map.prototype.keys() : Iterable<any>
// Returns an iterable over all keys in this map.

// Map.prototype.values() : Iterable<any>
// Returns an iterable over all values in this map.

// Map.prototype[Symbol.iterator]() : Iterable<[any,any]>
// The default way of iterating over maps. Refers to Map.prototype.entries.



// A WeakMap is a map that doesn’t prevent its keys from being garbage-collected. That means that you can associate data with objects without having to worry about memory leaks.

// A WeakMap is a data structure whose keys must be objects and whose values can be arbitrary values. It has the same API as Map, with one significant difference: you can’t iterate over the contents – neither the keys, nor the values, nor the entries. You can’t clear a WeakMap, either.

// The rationales for these restrictions are:

// The volatility of WeakMaps makes iteration difficult.

// Not having clear() provides a security property. Quoting Mark Miller: “The mapping from weakmap/key pair value can only be observed or affected by someone who has both the weakmap and the key. With clear(), someone with only the WeakMap would’ve been able to affect the WeakMap-and-key-to-value mapping.”


//SET

let set = new Set();

set.add('red')

console.log(set.has('red'));

console.log(set.delete('red'));

console.log(set.has('red'));


 let set = new Set();
 set.add('red')
 set.add('green')

 console.log(set.size);

 set.clear();

console.log(set.size);

let set = new Set(['red', 'green', 'blue']);

let set = new Set(['red', 'green', 'blue']);
for (let x of set) {
    console.log(x);
}


let arr = [3, 5, 2, 2, 5, 5];

let unique = [...new Set(arr)]; // [3, 5, 2]

console.log("arr",arr);
console.log("unique",unique);

// In contrast to arrays, sets don’t have the methods map() and filter(). A work-around is to convert them to arrays and back.


let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));


console.log(typeof set);
console.log(set);


// API  
// Single set elements:

// Set.prototype.add(value) : this
// Adds value to this set.

// Set.prototype.has(value) : boolean
// Checks whether value is in this set.

// Set.prototype.delete(value) : boolean
// Removes value from this set.

// All set elements:

// get Set.prototype.size : number
// Returns how many elements there are in this set.

// Set.prototype.clear() : void
// Removes all elements from this set.

// Iterating and looping:

// Set.prototype.values() : Iterable<any>
// Returns an iterable over all elements of this set.

// Set.prototype[Symbol.iterator]() : Iterable<any>
// The default way of iterating over sets. Points to Set.prototype.values.

// Set.prototype.forEach((value, key, collection) => void, thisArg?)
// Loops over the elements of this set and invokes the callback (first parameter) for each one. value and key are both set to the element, so that this method works similarly to Map.prototype.forEach. If thisArg is provided, this is set to it for each call. Otherwise, this is set to undefined.


// Why size and not length?  #
// Question: Arrays have the property length to count the number of entries. Why do maps and set have a different property, size, for this purpose?

// Answer: length is for sequences, data structures that are indexable – like arrays. size is for collections that are primarily unordered – like maps and sets.



