import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices:[
            {
                value: '1',
                name: `${'1.'.green} Crear tarea.`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas.`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas.`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes.`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s).`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea.`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir.`
            },
        ]
    }
]

export async function inquirerMenu() {
    console.clear();
    console.log("=======================".green);
    console.log(" Seleccione una opcion: ".white);
    console.log("=======================\n".green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}


export async function pausa() {
    const pregunta = [
        {
            type: 'input',
            name: 'pregunta',
            message: `Presiona ${'Enter'.green} para continuar:`
        }
    ];

    console.log('\n');
    await inquirer.prompt(pregunta);
}

export async function leerInput(message) {
    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length == 0) {
                    return 'Porfavor ingrese un valor'
                }
                return true
            }

        }
    ];

     const {desc} = await inquirer.prompt(pregunta);
     return desc;
}

export async function listadoTareasBorrar( tareas = [] ) {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green
        return  {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });
    const preguntas = [
        {
            type:'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

export async function confirmar(message) {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

export async function mostrarListadoCheckList( tareas = [] ) {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green
        return  {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    const pregunta = [
        {
            type:'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}