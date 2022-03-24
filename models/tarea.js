//documentacion oficial --> https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require('uuid');

/**
 * Clase para crear una tarea de manera independiente, solo sirve para manejar una tarea
 */
class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    //el constructor se va a ajecutar cuando creemos una nueva instacia de nuestra Tarea
    constructor( desc ){
        this.id = uuidv4();
        //Asignamos a la instancia de la clase en su variable 'desc' a la 'desc' que recibamos como argumento
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;