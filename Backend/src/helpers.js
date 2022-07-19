function sum(a,b){
    return a + b;
}

const add = (a,b) => {
    return a + b;
}

//one line statement
const add1 = (a,b) => a + b;

//without parameter
const add2 = () => 10 + 20;

//With single parameter
const add3 = a => a;


//Directly eporting the function
// exports.add4 = a => a;
// exports.add5 = a => a;


//Arrow fucntion does not have context of this
module.exports = {sum,add,add1,add2,add3};
//console.log(process);

