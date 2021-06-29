const sqlte3 = require('sqlite3').verbose()

let db = new sqlte3.Database('db.sqlite', (err) => {
    if (err) {
        console.error('No se pudo conectar a la base de datos' + err.message);
        throw err
    }
    else {
        console.log('Conectado a la base de datos');
        db.run(`CREATE TABLE productos(
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo INTEGER,
            nombre TEXT,
            marca TEXT,
            categoria TEXT,
            distribuidor TEXT,
            barcode INTEGER,
            stock UNTEGER,
            enabled INTEGER,
            precio INTEGER,
            descripcion TEXT
            )
        `, (err) => {
            if (err) {
                console.error('Error al crear la tabla ' + err.message);
            }
            else {
                console.log('Tabla creada exitosamente!');
            }
        }
        )
    }
})

module.exports = db