function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


// Alternatively, you can write the isEmpty function on the Object prototype.
Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}


var myObj = {
    myKey: "Some Value"
}

if(myObj.isEmpty()) {
    // Object is empty
    console.log("Object.prototype : Object is Empty");
} else {
    // Object is NOT empty (would return false in this example)
     console.log("Object.prototype : Object is not Empty");
}




var myObj = {}; // Empty Object
if(isEmpty(myObj)) {
    // Object is empty 
    console.log("Object is Empty");
} else {
    // Object is NOT empty
    console.log("Object is not empty");
}


var myObject = {
    ac:"as"
};

var isMyObjectEmpty = !Object.keys(myObject).length;

console.log("isMyObjectEmpty : ",isMyObjectEmpty);