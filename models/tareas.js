//documentacion oficial https://www.npmjs.com/package/colors
require('colors');

const Tarea = require('./tarea');

class Tareas {
    _listado = {};//propiedad de tipo objeto

    //getter para retornar un nuevo arreglo
    get listadoArr(){
        const listado = [];//Arreglo

        //Retornar todas las llaves que tenga el objeto "_listado", creando un arreglo que va a iterar usando el forEach
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];//Extraer tarea y obtenerla por medio de cada llave que encuentre en el objeto "_listado"
            //Insertar en el arreglo "listado" las tareas
            listado.push( tarea );
        });

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){
        if ( this._listado[id] ) {
            delete this._listado[id];//El operador 'delete' elimina una propiedad de un objeto.
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
        
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();//Solo para dar un salto de linea y que se vea en consola
        this.listadoArr.forEach( (tarea, index) => {
            const i = `${index + 1 + '.'}`.green;
            const { desc, completadoEn } = tarea;//desctructuramos
            const estado = ( completadoEn )
                ? 'Completada'.green//si es diferente de null
                : 'Pendiente'.red;//si es null

            console.log(`${ i } ${ desc } :: ${ estado }`);
            //console.log(`${ i.toString().green + '.'.green } ${ tarea.desc } :: ${ tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red }`);
        })
    }

    listarPendientesCompletadas( completadas = true ){
        console.log();//Solo para dar un salto de linea y que se vea en consola
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                ? 'Completada'.green//si es diferente de null
                : 'Pendiente'.red;//si es null
            
            if (completadas) {//mostrar completadas 'true'
                if (completadoEn){//completadoEn sea diferente a 'null' para que el if() lo tome como "true"
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }                
            } else {//mostrar pendientes 'false'
                if (!completadoEn){//completadoEn sea null, esto daria "false" pero al negarlo da "true"
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }
        })
    }

    /**
     * Recibe un arreglo de ids, donde realiza el proceso de si estan completadas o no.
     * @param {array} ids 
     */
    toggleCompletadas( ids = [] ){
        //Si viene un id en el arrelode ids, significa que se debe de marcar como completada
        ids.forEach( id => {
            const tarea = this._listado[id];//Extraer esa propiedad por el ID
            if ( !tarea.completadoEn ) {//Si esta en NULL, solo asi podra ser actualizada a completada
                tarea.completadoEn = new Date().toISOString();
            }    
        });
        
        //Marcar como NO COMPLETADAS todas las tareas "id" que no vengan en este arreglo de Ids
        this.listadoArr.forEach( tarea => {
            //Evaluar si la "tarea.id" no esta en "ids"
            if ( !ids.includes( tarea.id ) ) {//Si en el arreglo de "ids", si no existe la "tarea.id"
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;