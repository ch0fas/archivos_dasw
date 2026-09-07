// Sofia Maldonado

class AlumnoTarea
{
    constructor(nombre, carrera, calificaciones)
    {
        this.nombre = nombre;
        this.carrera = carrera;
        this.calificaciones = calificaciones;
    }
}

function fnAprobados(alumnos, materia)
{
    if (materia != "POO" && materia != "Deep Learning" && materia != "Proyecto de Ciencia de Datos")
    {
        console.log("Materia no válida")
    } else
    {
        if (materia == "POO") var index = 0
        else if (materia == "Deep Learning") var index = 1
        else var index = 2;
        console.log("Las personas que aprobaron " + materia + " fueron:")
        for (let i = 0; i < alumnos.length; i++)
        {
            if (alumnos[i].calificaciones[index][1] >= 6)
            {
                console.log(alumnos[i].nombre)
            }
        }
    }
}

function fnPromedio(alumnos, nombre)
{
    let found = false
    for (let i = 0; i < alumnos.length; i++)
    {
        if (alumnos[i].nombre == nombre)
        {
            var alum = alumnos[i]
            found = true
        }
    }
    if (!found)
    {
        console.log("Student not found");
        return 0;
    } 
    let sum = 0
    let n = 0
    for (let i = 0; i < alum.calificaciones.length; i++)
    {
        sum += alum.calificaciones[i][1];
        n++;
    }
    return sum / n;
}



let alumnos =
[
    new AlumnoTarea("Sofia", "Ciencia de Datos", [["POO", 10], ["Deep Learning", 10], ["Proyecto de Ciencia de Datos", 10]]),
    new AlumnoTarea("Viviana", "Ciencia de Datos", [["POO", 9], ["Deep Learning", 10], ["Proyecto de Ciencia de Datos", 10]]),
    new AlumnoTarea("Diego", "Software", [["POO", 4], ["Deep Learning", 2], ["Proyecto de Ciencia de Datos", 3]]),
    new AlumnoTarea("Denise", "Ciencia de Datos", [["POO", 10], ["Deep Learning", 10], ["Proyecto de Ciencia de Datos", 10]]),
    new AlumnoTarea("Jose Luis", "Ciencia de Datos", [["POO", 5], ["Deep Learning", 5], ["Proyecto de Ciencia de Datos", 6]])
]

console.log(fnPromedio(alumnos, "Viviana"))
fnAprobados(alumnos, "Proyecto de Ciencia de Datos");