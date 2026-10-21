let counter = document.getElementById("counter");
let total = document.getElementById("total");

plusButton.addEventListener("click", () =>
{
    
    total.innerText = Math.floor(total.innerHTML) + 1;
    counter.innerHTML = Math.floor(counter.innerHTML) + 1;
})

minusButton.addEventListener("click", () =>
{
    total.innerText = Math.floor(total.innerHTML) - 1;
    counter.innerHTML = Math.floor(counter.innerHTML) + 1;
})

resetButton.addEventListener("click", () =>
{
    total.innerHTML = 0;
    counter.innerHTML = 0;
})

duplicator.addEventListener("click", () =>
{
    total.innerHTML = Math.floor(total.innerHTML) * 2;
    counter.innerHTML = Math.floor(counter.innerHTML) + 1;
})