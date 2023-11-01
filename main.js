let arr = [8,4,5,1, 3, 4, 6, 8];
let obj = {0: 4, 1:6, 2:8};
const myArr = [[1,2,1, [8,9,10]],[3,4],[5,6]];
let words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];


let p1 = fetch('https://jsonplaceholder.typicode.com/posts').then(value => value.json());
let p2 = fetch('https://jsonplaceholder.typicode.com/todos').then(value => value.json());

Promise.race([p1, p2])
.then(
    function(values){
        console.log(values);
        // return valuesNew;
    },
    function(){}
).then(
    function(data){
        console.log(data);
    },
    function(){}
)


// let promise1 = fetch('https://jsonplaceholder.typicode.com/posts');
// let x = promise1.then(
//     function(response){
//         return fetch('https://jsonplaceholder.typicode.com/todos');
//     }
// );

// console.log(x); // guess the output:1

// let promise1 = fetch('https://jsonplaceholder.typicode.com/posts');
// let x = promise1.then(
//     function(response){
//         return 999;
//     }
// );

// console.log(x); // guess the output:2