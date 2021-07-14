const express = require('express')
const cors = require ('cors')
const app = express()
const port = 4000

//COnexion a la Base de Datos
const db = require('./database')

//Direccion de escucha para la API
app.listen(port, () => {
    console.log(`API funcionando en http://localhost:${port}`)
})

app.use(express.json());
app.use(cors());

//Accediendo al parametro de consulta
app.get('/', (req, res) => {
    console.log('GET en /');
    console.log('query= ');
    console.log(req.query);
    res.send('Hola Mundo desde Express!');
})



//-----------------
//CRUD en items
//-----------------

//crear un item 'C'
app.post('/items', (req, res) => {
    console.log('POST en /items');
    const sql = 'INSERT INTO items (codigo, nombre, marca, categoria, distribuidor, barcode, stock, enabled, precio, descripcion) VALUES (?,?,?,?,?,?,?,?,?,?)'

    const params = [req.body.codigo,
    req.body.nombre,
    req.body.marca,
    req.body.categoria,
    req.body.distribuidor,
    req.body.barcode,
    req.body.stock,
    req.body.enabled,
    req.body.precio,
    req.body.descripcion]

    db.run(sql, params, function (err, result) {
        if (err) {
            console.log('Error al crear el item' + err.message)
            return
        }
        else {
            const data = {
                id: this.lastID,
                codigo: req.body.codigo,
                nombre: req.body.nombre,
                marca: req.body.marca,
                categoria: req.body.categoria,
                distribuidor: req.body.distribuidor,
                barcode: req.body.barcode,
                stock: req.body.stock,
                enabled: req.body.enabled,
                precio: req.body.precio,
                descripcion: req.body.descripcion
            }
            res.send(data)
        }
    })
})

//Listar todas los items 'R'
app.get('/items', (req, res) => {
    console.log('GET en /items')
    const sql = 'SELECT * FROM items'
    const params = []
    db.all(sql, params, (err, filas) => {
        if (err) {
            console.log('Error al leer los items' + err.message)
            return
        }
        else {
            res.send({
                mensaje: 'Items leidos!',
                data: filas
            })
        }
    })
})

//Actualizar un item 'U'
//en toda la su totalidad
app.put('/items/:codigo', (req, res) => {
    console.log('Put en /items/' + req.params.codigo)
    const sql = 'UPDATE items SET nombre=?,marca=?, categoria=?, distribuidor=?, barcode=?, stock=?, enabled=?, precio=?, descripcion=? WHERE codigo=?'
    const params = [req.body.nombre,
    req.body.marca,
    req.body.categoria,
    req.body.distribuidor,
    req.body.barcode,
    req.body.stock,
    req.body.enabled,
    req.body.precio,
    req.body.descripcion,
    req.params.codigo]

    db.run(sql, params, (err, result) => {
        if (err) {
            console.log('Error al modificar el item' + err.message)
            return
        }
        else {
            res.send({
                mensaje: 'Item modificado!',
                data: {
                    codigo: req.params.codigo,
                    nombre: req.body.nombre,
                    marca: req.body.marca,
                    categoria: req.body.categoria,
                    distribuidor: req.body.distribuidor,
                    barcode: req.body.barcode,
                    stock: req.body.stock,
                    enabled: req.body.enabled,
                    precio: req.body.precio,
                    descripcion: req.body.descripcion
                }
            })
        }
    })
})

// 'U' -> Modificar item por campo
//     -> modificar nombre
app.put('/items/:codigo/nombre', (req, res) => {
    console.log('Put en /items/' + req.params.codigo)
    const sql = 'UPDATE items SET nombre=? WHERE codigo=?'
    const params = [req.body.nombre,req.params.codigo]

    db.run(sql, params, (err, result) => {
        if (err) {
            console.log('Error al modificar el item' + err.message)
            return
        }
        else {
            res.send({
                mensaje: 'Item modificado!',
                data: {                    
                    nombre: req.body.nombre,                    
                }
            })
        }
    })
})



//Eliminar un item 'D'
app.delete('/items/:codigo', (req, res) => {
    console.log('Delete en /items/' + req.params.id)
    const sql = 'DELETE FROM items WHERE id=?'
    const params = [req.params.codigo]

    db.run(sql, params, (err) => {
        if (err) {
            console.log('Error al BORRAR el item ' + err.message)
            res.send({
                mensaje: 'Error' + err.message
            })
            return
        } else {
            res.send({
                mensaje: 'Item eliminado!'
            })
        }
    })

})

//Listar un item por codigo
app.get('/items/:codigo', (req, res) => {
    console.log('GET en /items/' + req.params.codigo)

    const sql = 'SELECT * FROM items WHERE codigo=?'
    const params = [req.params.codigo]

    db.get(sql, params, (err, result) => {
        if (err) {
            console.log('Error al listar el item ' + params + ": " + err.message)
            return
        }
        else {
            if (result) {
                res.send({
                    mensaje: 'Item leido',
                    data: result
                })
            } else {
                res.send({
                    mensaje: "No existe el codigo!"
                })
            }
        }
    })
})