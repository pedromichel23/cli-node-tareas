import { inquirerMenu, pausa , leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

 async function main() {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        //console.log({opt});
        switch(opt) {
            case '1':
                const desc =  await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                //console.log(tareas.listadoArr);
                console.log(tareas.listarTareasCompPend())
                break;
            case '3':
                console.log(tareas.listarTareasCompOPend(true));
                break;
            case '4':
                console.log(tareas.listarTareasCompOPend(false));
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleTareasCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id != 0) {
                    const ok = await confirmar('¿Estas seguro de borrar esta tarea?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);
        

        await pausa();
    } while (opt != '0')
    
}

main();