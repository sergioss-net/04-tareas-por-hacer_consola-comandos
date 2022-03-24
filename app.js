//documentacion oficial --> https://www.npmjs.com/package/colors
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, inquirerPausa, inquirerleerInput, inquirerListadoTareasBorrar, inquirerConfirmar, inquirerMostrarListadoChecklist } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

/**
 * Para trabajar con varios procesos asincronos y trabajar con el async/await
 */
const main = async() => {
    let opt = '';
    const tareas = new Tareas();//Crear instancia "tareas"

    const tareasDB = leerDB();//Recuperar las tareas del archivo JSON donde estan guardadas

    if ( tareasDB ) { //cargar tareas del archivo JSON que es nuestra Base de Datos
        tareas.cargarTareasFromArray( tareasDB);
    }

    do {
        //Imprime el menu y retorna una opcion
        opt = await inquirerMenu();//espera hasta que tengamos una resolucion de inquirerMenu() promesa que regresa la opcion escogida por el usuario
        
        switch (opt) {
            case '1': //crear opción
                const desc = await inquirerleerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2': //listar opciones
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr);
            break;

            case '3'://listar tareas completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4'://listar tareas completadas
                tareas.listarPendientesCompletadas(false);
            break;

            case '5'://compleado | pendiente
                const ids = await inquirerMostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas( ids );
            break;

            case '6'://Borrar tarea
                const id = await inquirerListadoTareasBorrar(tareas.listadoArr);
                if ( id !== '0' ) {//Si es CERO es Cancelar, opcion del menu para en caso de cancelar el boorado de una tarea
                    const confirmar = await inquirerConfirmar('¿Está seguro?');
                    if (confirmar) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada correctamente')
                    }
                }                
            break;            
        }

        guardarDB( tareas.listadoArr );//Grabar en el archivo de texto

        await inquirerPausa();
    } while ( opt !== '0' );
}

main();