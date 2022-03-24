const fs = require('fs');//libreria file system, requerida para guardar información a un archivo de texto

//dato que esta funcion se estara llamando desde el app.js podemos suponer que estamos en el root raiz
const archivo = './db/data.json';//Ruta y nombre del archivo donde se guardara el "data"

/**
 * @param {array} data 
 */
const guardarDB = ( data ) => {
    //JSON.stringify convierte un objeto (array) a un JSON de tipo string
    fs.writeFileSync( archivo, JSON.stringify( data ));
}

const leerDB = () => {
    //Verificar si el archivo NO existe
    if ( !fs.existsSync(archivo) ) {
        return null
    }

    //Para leerlo de manera sincrona
    const info = fs.readFileSync(archivo, 'utf-8');
    const data = JSON.parse( info );//Retorna el objeto que se corresponde con el texto JSON entregado
    // console.log(data);
    
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}