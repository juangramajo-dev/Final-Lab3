const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('db.sqlite',(err) =>{
    if (err) {
        console.error('No se pudo conectar a al BD '+err.message)
        throw err
    }
    else {
        console.log('Conectado a la base de datos')
        db.run('CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, nombre TEXT, marca TEXT, categoria TEXT, distribuidor TEXT, barcode INTEGER, stock INTEGER, enabled INTEGER, precio FLOAT, descripcion TEXT)',(err) => {
            if (err){
                console.log('Error al crear la tabla "items" '+ err.message);
                console.log('Tabla items ya existe!');
                console.log(" ");
            }else{
                console.log('Tabla items creada exitosamente');
            }
        });
        db.run('CREATE TABLE historial (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, tmovimiento TEXT, cantidad INTEGER)',(err) => {
            if (err){
                console.log('Error al crear la tabla "historial" '+ err.message);
                console.log('Tabla historial ya existe!');
                console.log(" ");
            }else{
                console.log('Tabla historial creada exitosamente');
            }
        });
        db.run('CREATE TABLE usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, password TEXT, nombre TEXT, apellido TEXT, rol INTEGER)',(err) => {
            if (err){
                console.log('Error al crear la tabla "usuarios" '+ err.message);
                console.log('Tabla usuarios ya existe!');
                console.log(" ");
            }else{
                console.log('Tabla usuarios creada exitosamente');
            }
        })
    }
});

module.exports = db;