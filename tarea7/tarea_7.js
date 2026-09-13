// Ejercicio 1
console.log("=== EJERCICIO 1 ===")

let libros = []

for (let i = 0; i < 10; i++)
{
    let libro = 
    {
        id: i,
        year: Math.floor(Math.random() * 21) + 2000,
        author: "Author" + Math.floor(Math.random() * 101),
        date: ''
    }
    libro.date = new Date(libro.year + "-01-01T12:00:00.000Z")
    libros.push(libro)
}
console.table(libros)
console.log(JSON.stringify(libros))

 // Para el ejercicio 3

// Ejercicio 2
console.log("=== EJERCICIO 2 ===")


let nuevo_libro =
{
    id: 27,
    year: 1928,
    author: "Radclyffe Hall",
    date: new Date()
}
libros.unshift(nuevo_libro)
console.table(libros)

let libros_new = []
function transfer_books(original_arr, new_arr)
{
    let og_arr_size = original_arr.length
    for (let i = 0; i < og_arr_size; i++)
    {
        new_arr.push(original_arr.pop())
    }
    return new_arr
}

libros_new = transfer_books(libros, libros_new)
console.table(libros_new)
console.log("Libros: " + libros)

// Ejercicio 3
console.log("=== EJERCICIO 3 ===")

let libros_copy = libros_new

function delete_book(id, arr)
{
    let index = arr.findIndex(item => item.id == id)
    if (index != -1)
    {
        delete arr[index]
        console.log("Elemento eliminado")
        return true
    } else
    {
        console.log("Elemento no encontrado")
        return false
    }
}

delete_book(4, libros_copy)
console.table(libros_copy)

function filter_year(year, arr)
{
    return arr.filter(item => item.year <= year)
}

let filtered_books = filter_year(2010, libros_copy)
console.table(filtered_books)

// Ejercicio 4
console.log("=== EJERCICIO 4 ===")

let new_books = []
for (let i = 0; i < 20; i++)
{
    let libro = 
    {
        id: i,
        year: Math.floor(Math.random() * 21) + 2000,
        author: "Author" + Math.floor(Math.random() * 101),
        date: '',
        clave: Math.floor(Math.random() * 900) + 100,
        word_count: Math.floor(Math.random() * 99001) + 1000
    }
    libro.date = new Date(libro.year + "-01-01T12:00:00.000Z")
    new_books.push(libro)
}
console.table(new_books)

let new_book =
{
    id: 823,
    year: 1818,
    author: "Mary Shelley",
    date: new Date(),
    clave: Math.floor(Math.random() * 900) + 100,
    word_count: 72641
}

new_books.splice(6, 1, new_book)
console.table(new_books)

new_books.sort(function(a, b){return a.clave - b.clave})
console.table(new_books)

function about_arr(arr, option)
{
    let word_total = 0
    let book = arr[0]
    switch (option)
    {
        case "T":
            for (let i = 0; i < 20; i++)
            {
                word_total += arr[i].word_count
            }
            console.log("The total amount of words is: " + word_total)
            break
        case "P":
            for (let i = 0; i < 20; i++)
            {
                word_total += arr[i].word_count
            }
            console.log("The average amount of words per book is: " + word_total/20)
            break
        case "MX":
            for (let i = 1; i < 20; i++)
            {
                if (arr[i].word_count > book.word_count) { book = arr[i]}
            }
            console.log(`The book with the most words is ${book.id} with ${book.word_count} words`)
            break
        case "MN":
            for (let i = 1; i < 20; i++)
            {
                if (arr[i].word_count < book.word_count) { book = arr[i]}
            }
            console.log(`The book with the least words is ${book.id} with ${book.word_count} words`)
            break
        default:
            console.log("Not a valid option. Try again")
    }
}

about_arr(new_books, "T")
about_arr(new_books, "P")
about_arr(new_books, "MX")
about_arr(new_books, "MN")
about_arr(new_books, "MP")