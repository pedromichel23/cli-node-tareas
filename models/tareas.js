import { Tarea } from './tarea.js';
import colors from 'colors';

export class Tareas {
    _listado = {}
    constructor() {
        this._listado = {}
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    listarTareasCompPend() {
        let salida = '';
        // let num = 1;
        // tareas.forEach(element => {
        //     if (element.completadoEn != null) {
        //         salida += `${colors.green(num)}. ${element.desc} :: Completado.\n`
        //     } else {
        //         salida += `${colors.red(num)}. ${element.desc} :: Pendiente.\n`
        //     }
        //     num++;
        // })
        
        this.listadoArr.forEach((tarea, i) => {
            if (tarea.completadoEn != null) {
                salida += `${colors.green(i+1)}. ${tarea.desc} :: Completado.\n`;
            } else {
                salida += `${colors.red(i+1)}. ${tarea.desc} :: Pendiente.\n`;
            }
        })
        return salida;
    }

    listarTareasCompOPend(completado = true) {
        let salida = '';
        let i = 1;
        if (completado == true) {
            this.listadoArr.forEach((tarea) => {
                if (tarea.completadoEn != null) {
                    salida += `${colors.green(i)}. ${tarea.desc} :: ${colors.green(tarea.completadoEn)}.\n`;
                    i++;
                }
            });
        } else {
            this.listadoArr.forEach((tarea) => {
                if (tarea.completadoEn == null) {
                    salida += `${colors.red(i)}. ${tarea.desc} :: Pendiente.\n`;
                    i++;
                }       
            }); 
        }
        return salida;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc='') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea (id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleTareasCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}