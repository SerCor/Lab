let a = [1,2,3,4,5,6,7];
let itr = a[Symbol.iterator]();
console.log(itr);

for(let i = 0; i < 10;i++)
    console.log(itr.next());