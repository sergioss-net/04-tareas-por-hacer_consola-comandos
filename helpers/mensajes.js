//documentacion oficial https://www.npmjs.com/package/colors
require('colors');

/**
 * Promesa mostrasrMenu()
 */
const mostrarMenu = () => {
    return new Promise( resolve => {
        //console.clear();//Esta linea NO FUNCIONA y no limpia la consola en Cmder
        process.stdout.write('\033c');//Esta linea SI FUNCIONA y limpia la consola de Cmder

        console.log('==================================='.green);
        console.log('     Selecciones una opción'.green);
        console.log('===================================\n'.green);

        console.log(`${ '1.'.green } Crear Tarea`);
        console.log(`${ '2.'.green } Listar Tareas`);
        console.log(`${ '3.'.green } Listar Tareas Completadas`);
        console.log(`${ '4.'.green } Listar Tareas Pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir \n`);

        //Crear interfaz para mostrar y recibir información al usuario, desde la consola de comandos
        const readline = require('readline').createInterface({
            input: process.stdin,//Pausa la ejecucion, esperar caracteres y el ENTER del usuario
            output: process.stdout//Mostrar un mensaje en consola
        });

        //Mostrar información al usuario (stdout) con la pregunta
        readline.question('Seleccione una opción: ', (opt) => {
            //console.log({ opt });
            readline.close();//Cuando ya no se este usando más el readline, hay que cerrarlo por que se quedaria esperando información del usuario
            resolve(opt);//En el resolve de la promesa se regresa la opcion escogida por el usuario
        });
    });

    
}

/**
 * Promesa pausa()
 */
const pausa = () => {
    return new Promise( resolve => {
        //Crear interfaz para mostrar y recibir información al usuario, desde la consola de comandos
        const readline = require('readline').createInterface({
            input: process.stdin,//Pausa la ejecucion, esperar caracteres y el ENTER del usuario
            output: process.stdout//Mostrar un mensaje en consola
        });

        //Mostrar información al usuario (stdout) con la pregunta
        readline.question(`\nPresione ${ 'ENTER'.bgBlue } para continuar\n`, (opt) => {
            //console.log({ opt });
            readline.close();//Cuando ya no se este usando más el readline, hay que cerrarlo
            resolve();//En el resolve de la promesa NO requiero regresar "opt" elegido por el usuario
        });
    });    
}

module.exports = {
    mostrarMenu,
    pausa
}