

function monstrarMenu() {
    return new Promise(resolve => {
        console.clear()
        console.log("=======================".green);
        console.log(" Seleccione una opcion: ".green);
        console.log("=======================\n".green);

        console.log(`1. Crear una tarea.`);
        console.log(`2. Listar tareas.`);
        console.log(`3. Listar tareas completadas.`);
        console.log(`4. Listar tareas pendientes.`);
        console.log(`5. Completar tarea(s).`);
        console.log(`6. Borrar tarea.`);
        console.log(`0. Salir.\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    })
}

function pausa() {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
        readline.question('\nPrecione enter para continuar:\n', (opt) => {
            readline.close();
            resolve(opt);
        })

    })
}


module.exports = {
    monstrarMenu,
    pausa
}