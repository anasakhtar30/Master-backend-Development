// alert('Hello')
//Fundament of Javascrip
// arrays and objects
// function return 
// async js coding

// var arr = [1,2,3,4,"hey",{},function(){},[]]
// var arr = [1,2,3,4]
//foreach, map, filter find indexOf

// arr.forEach(function(val){
//         console.log(val + "hello");
//     })
   
//map
// let arr = [1,2,3,4]

// let ansarr = arr.map((val)=>{
//     return val*3;
// })

// console.log(ansarr);

//Filter
// var arr = [1,2,3,,4,5,6,7,8,9,10];
// const newarr = arr.filter((val)=>{
    //     if(val > 1) return true;
    //     else return false;
    // })
    // console.log(newarr);
    
// var arr = [1,2,3,,4,5,6,7,8,9,10];

// var ans = arr.find(function(val){
//     if(val === 2) return val;
// })

// console.log(ans);


//object
//Key-value pairs

// var kolu = 12;
// {
//     a :kolu
// }

// var obj = {
//     name:"harsh",
//     age:12
// }
// // console.log(obj.name)
// console.log(obj['name'])
// Object.freeze(obj);
// obj.age = 33
// console.log(obj.age);

// var arr = [1,2,3,4];

//Function is basically an object in javascript
// function abcd(a,b,c){

// }

// abcd();

// function abcd(){
//     return 12;
// }
// abcd();



//async-await
//yha pr async nhn use hua hai
// var blob = await fetch('https://randomuser.me/api/');
// var res = await blob.json();

// console.log(res);

//line  by line code chale isey kehte hai synchronous
//jo bhi code async nature ka ho, usey side stack mein bhej do aur agle code ko chalo jo bhi sync nature ka ho, jab bhi saara sync code chal jaaye tab check kro ki async code complete hua ya nhn and agar vo complete hua ho to usey main stack mein lao and chalo

// async function abcd(){
//     var blob = await fetch(`https://randomuser.me/api/`);
//     var ans = await blob.json();
//     console.log(ans.results[0].name);
// }

// abcd();


const Person = {
    name:"John",
    age:22,
    isStudent:true,
    greet:()=>{
        console.log('Hello');
    }
}

// for(let key in Person){
//     console.log(`${key},${Person[key]}`);  
// }

console.log(Object.keys(Person));
console.log(Object.values(Person));
console.log(Object.entries(Person));



// console.log(Person.name);
// console.log(Person['age']);
// Person.greet();

//use newObject()

// const Person = new Object();
// Person.name = "John";
// Person.age = 23
// Person.greet = ()=>{
//     console.log(`Hey there`);
    
// }
// delete Person.age
// console.log(Person['age']);
// Person.greet();


