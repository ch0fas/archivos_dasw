let names = [["Juan", 4], ["Pedro", 3], ["Luis", 15], ["Sofia", 21]]

function de_chill(arr, index)
{
    let n = arr.length;
    if (index >= n)
    {
        return "Error";
    } else return arr[index][0] + arr[index][1];
} 

console.log(de_chill(names, 0))