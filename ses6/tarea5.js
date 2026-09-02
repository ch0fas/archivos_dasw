function biggest_num(arr)
{
    let res = -2147483648
    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i] > res)
        {
            res = arr[i]
        }
    }
    return res;
}

let arr = [-50, 0, 100, 10]
console.log("Numero más grande en " + arr + ": " + biggest_num(arr))

console.log("" + 1 + 0)
console.log("" - 1 + 0)
console.log(true + false)
console.log(6 / "3")
console.log("2" * "3")
console.log(4 + 5 + "px")
console.log("$" + 4 + 5)
console.log("4" - 2)
console.log("4px" - 2)
console.log(7 / 0)
console.log(" -9 " + 5)
console.log(" -9 " - 5)
console.log(null + 1)
console.log(undefined + 1)