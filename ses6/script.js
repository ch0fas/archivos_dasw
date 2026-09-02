let n1 = 3
let n2 = Math.PI

console.log(n1 + n2)
console.log(n1**n1)
console.log(n2**n2)

function avg(arr)
{
    let res = 0
    for (let i = 0; i < arr.length; i++)
    {
        res += arr[i]
    }

    return res / arr.length
}

let arr = [1,2,3]
console.log(arr.length, arr, avg(arr))