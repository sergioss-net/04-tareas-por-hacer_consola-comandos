//documentacion oficial --> https://www.npmjs.com/package/inquirer
const inquirer = require('inquirer');
require('colors');

const inquirerMenu = async() => {
    process.stdout.write('\033c');//limpia la consola de Cmder

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                { value: '1', name: `${ '1.'.green } Crear tarea` },
                { value: '2', name: `${ '2.'.green } Listar tareas` },            
                { value: '3', name: `${ '3.'.green } Listar tareas completadas` },
                { value: '4', name: `${ '4.'.green } Listar tareas pendientes` },
                { value: '5', name: `${ '5.'.green } Completar tarea(s)` },
                { value: '6', name: `${ '6.'.green } Borrar tarea` },
                { value: '0', name: `${ '0.'.green } Salir` }
            ]
        }
    ];

    console.log('==================================='.green);
    console.log('     Selecciones una opción'.yellow);
    console.log('===================================\n'.green);

    //Hacemos una destructuracion
    const { opcion } = await inquirer.prompt(preguntas);//Para hacer una lista de preguntas en la consola
    return opcion;
}

const inquirerPausa = async() => {
    const pregunta = [
        {
            type: 'input',
            name: 'opcion2',
            message: `Presione ${ 'ENTER'.bgBlue } para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt(pregunta);//Para hacer una pregunta en la consola
}

const inquirerleerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,//message: message
            validate( value ){//Forma de definir una funcion dentro del objeto
                if ( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    //desestruturamos "desc" del objeto que regresa
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const inquirerListadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i ) => {
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id, name: `${ idx } ${ tarea.desc }`
        }
    });

    //Para añadirlo al principop del arreglo
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',//es una lista
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    console.log('\n');
    //Hacemos una destructuracion
    const { id } = await inquirer.prompt(preguntas);//Para hacer una lista de preguntas en la consola
    return id;
}

const inquirerConfirmar = async( message ) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message//message: message
        }
    ];

    //los "confirm" regresa un boolean, por lo que "ok" sera un true o false
    const { ok } = await inquirer.prompt(pregunta);//Para hacer una pregunta en la consola
    return ok;
}


const inquirerMostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i ) => {
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',//regresa una arreglo con todos los ids seleccionados con la barra espacioadora
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    console.log('\n');
    //Hacemos una destructuracion
    const { ids } = await inquirer.prompt(pregunta);//Para hacer una lista de preguntas en la consola
    return ids;
}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    inquirerleerInput,
    inquirerListadoTareasBorrar,
    inquirerConfirmar,
    inquirerMostrarListadoChecklist
}