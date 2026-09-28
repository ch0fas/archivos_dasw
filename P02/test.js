let data =
{
    "users": [],
    "tasks": [],
    "tags": []
}

// Punto 1
console.log("=== Punto 1 ===\n");
console.log("Users");
console.table(getAllUsers());
console.log("Tasks");
console.table(getAllTasks());
console.log("Tags");
console.table(getAllTags());

// Punto 2
console.log("=== Punto 2 ===\n");
console.log("Creando Primer Usuario");
createUser("Sofia", "sofi@chofas.org", "123456789");
console.log("Creando Segundo Usuario");
createUser("Viviana", "foo@bar.com", "123456789");
console.log("Creando Tercer Usuario");
createUser("Denise", "spam@eggs.com", "123456789");
console.log("Todos los usuarios fueron creados");
console.table(getAllUsers());

// Punto 3
console.log("=== Punto 3 ===\n");
console.log("Usuario con ID = 2");
console.table(getUserById(2));

// Punto 4
console.log("=== Punto 4 ===\n");
console.log("Usuario con nombre Sofia");
console.table(searchUsers("name", "Sofia"));

// Punto 5
console.log("=== Punto 5 ===\n"); 
updateUser(3, {"name": "ACTUALIZADORX"});
console.log("Actualizacion hecha:");
console.table(getAllUsers());

// Punto 6
console.log("=== Punto 6 ===\n");
deleteUser(1);
console.log("Usuario con id 1 eliminado");
console.table(getAllUsers());

// Punto 7
console.log("=== Punto 7 ===\n");
createTag("School", "#8B0000");
createTag("Studying", "#00008b");
createTag("House", "#006400");
createTag("Health", "#483D8B");
createTag("Reading", "#B8860B");
console.log("Etiquetas creadas:");
console.table(getAllTags());

// Punto 8
console.log("=== Punto 8 ===\n");
updateTag(4, {"name": "ETIQUETADORX", "color": "#fcba03"});
console.log("Color modificado");
console.table(getAllTags());

// Punto 9
console.log("=== Punto 9 ===\n");
deleteTag(2);
console.log("Etiqueta 2 eliminada");
console.table(getAllTags());

// Punto 10
console.log("=== Punto 10 ===\n");
createTask("Terminar Practica 2", "Se explica solo", "2026-09-28", "Viviana", "A", [1,3]);
createTask("Grabar video", "Sobre el nuevo iPhone", "2026-04-30", "ACTUALIZADORX", "F", [4]);
createTask("Leer Cap 5 de novela china", "", "2026-09-30", "Viviana", "A", [5]);
createTask("Vender auto", "Checar Facebook Marketplace", "2026-09-28", "ACTUALIZADORX", "C", [3,4]);
createTask("Preparar cena", "Pasta", "2026-09-28", "Viviana", "A", [3]);
createTask("Preparar clase siguiente", "Bars", "2026-09-28", "ACTUALIZADORX", "A", [1,4]);
createTask("Foo", "Bars", "2026-09-28", "Viviana", "A", [1,3,4,5]);
console.log("Tareas creadas:");
console.table(getAllTasks());

// Punto 11
console.log("=== Punto 11 ===\n");
console.log("Eliminando tags de task 5");
updateTask(5, {"tags": []});
console.table(getAllTasks());

// Punto 12
console.log("=== Punto 12 ===\n");
console.log("Modificando tareas con ID 1 y 4");
updateTask(1, {"description": "Dorx Task"});
updateTask(4, {"description": "Dorx Task"});
console.table(getAllTasks());

// Punto 13
console.log("=== Punto 13 ===\n");
console.log("Todas las tareas con Dorx en la desc");
console.table(searchTasks("description", "Dorx"));

// Punto 14
console.log("=== Punto 14 ===\n");
console.log("Tareas con Tag de Escuela (1)");
console.table(findTasksByTag([1]));
console.log("Tarea con Tags de Casa (3) y Lectura (5)");
console.table(findTasksByTag([3,5]));

// Punto 15
console.log("=== Punto 15 ===\n");
console.log("Eliminando tarea con ID = 3");
deleteTask(3);
console.table(getAllTasks());