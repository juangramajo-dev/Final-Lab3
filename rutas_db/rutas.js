const e = require('express')
const express = require('express')
const app = express()
const port = 3003

const productos = require('./datos')

//!----------CONEXIÓN A LA BASE DE DATOS-------
const db = require('./database')

app.use(express.json())


//!-----------POSTS----------------

//!--------Crear items-----------

app.post('/newprod', (req, res) => {
    console.log('POST en /newprod');
    console.log(req.body);
   
  // *  idAux = 0;
  // *  productos.forEach(e => {
  // *    e.id > idAux ? idAux = e.id:null;
  // *});
  // *  nuevoPost = {
  // *    id:idAux+1,
  // *    codigo:idAux+100,
  // *    nombre:req.body.nombre,
  // *    marca:req.body.marca,
  // *    categoria:req.body.categoria,
  // *    distribuidor:req.body.distribuidor,
  // *    barcode:req.body.barcode,
  // *    stock:req.body.stock,
  // *    enabled:req.body.enabled,
  // *    precio:req.body.precio,
  // *    descripcion:req.body.descripcion,
  // *//   }
  // *  productos.push(nuevoPost)
  // *  res.send(nuevoPost)
    const sql = 'INSERT INTO productos (codigo,nombre,marca,categoria,distribuidor,barcode,stock,enabled,precio,descripcion) VALUES(?,?,?,?,?,?,?,?,?,?)'
const params = [req.body.codigo,req.body.nombre,req.body.marca,req.body.categoria,req.body.distribuidor,req.body.barcode,req.body.stock,req.body.enabled,req.body.precio,req.body.descripcion]
db.run(sql,params, function (err){
  if(err){
    console.error('Error al crear el producto' + err.message)
    res.send({mensaje: 'Ha ocurrido un error: '+ err.message})
    return
  }
  else {
    const data = {
      id: this.lastID,
      codigo:req.body.codigo,
      nombre:req.body.nombre,
      marca:req.body.marca,
      categoria:req.body.categoria,
      distribuidor:req.body.distribuidor,
      barcode:req.body.barcode,
      stock:req.body.stock,
      enabled:req.body.enabled,
      precio:req.body.precio,
      descripcion:req.body.descripcion,
    }
    productos.push(data)
    res.send({
      mensaje: 'ok',
      data: data
    })
  }
})
})

//!-------- Modificar items-----------
app.post('/modprod/:id', (req, res) => {
 console.log('POST en /modprod');
const sql = 'UPDATE productos SET codigo = ?,nombre = ?,marca = ?,categoria = ?,distribuidor = ?,barcode = ?,stock = ?,enabled = ?,precio = ?,descripcion = ?'
const params = [req.body.codigo,req.body.nombre,req.body.marca,req.body.categoria,req.body.distribuidor,req.body.barcode,req.body.stock,req.body.enabled,req.body.precio,req.body.descripcion]

db.run(sql,params, function (err){
  if(err){
    console.error('Error al crear el producto' + err.message)
    res.send({mensaje: 'Ha ocurrido un error: '+ err.message})
    return
  }
  else {
    res.send({
      mensaje: 'ok',
      data: {
      codigo:req.body.codigo,
      nombre:req.body.nombre,
      marca:req.body.marca,
      categoria:req.body.categoria,
      distribuidor:req.body.distribuidor,
      barcode:req.body.barcode,
      stock:req.body.stock,
      enabled:req.body.enabled,
      precio:req.body.precio,
      descripcion:req.body.descripcion,
    }
    })
  }
})
})


//!-------- Modificar Ingreso y egreso de items( cantidad)-----------




//!-----------GETS----------------

//!--------Ver total de items-----------

app.get('/prod', (req, res) => {
    console.log('GET en /prod');   
    const sql = 'SELECT * FROM productos'
const params = []
db.all(sql,params,  (err , data)=>{
  if(err){
    console.error('Error al traer los productos' + err.message)
    res.send({mensaje: 'Ha ocurrido un error: '+ err.message})
    return
  }
  else {     
    res.send({
      mensaje: 'ok',
      data: data
    })
  }
})
})
  



//!--------Ver items por id-----------
  app.get('/prod/:id', (req, res) => {
      console.log('GET en /prod');   
      const sql = 'SELECT * FROM productos WHERE Id = ?'
  const params = [req.params.id]
  db.all(sql,params, (err , data)=>{
    if(err){
      console.error('Error al traer los productos' + err.message)
      res.send({mensaje: 'Ha ocurrido un error: '+ err.message})
      return
    }
    else {     
      res.send({
        mensaje: 'ok',
        data: data
      })
    }
  })
  })

//!--------Ver / raiz-----------


app.get('/', (req, res) => {
  res.send('NO HAY NADA EN ESTA PAGINA - DIRIJASE A "/ayuda" PARA VER LAS RUTAS EXISTENTES')
})

app.get('/ayuda', (req, res) => {
  const ayuda = `----RUTAS EXISTENTES----
  [POST]Crear un nuevo producto          -  /newprod
  [PUT]Modificar un producto             -  /modProd/(Id)
  [GET]Ver lista de todos los productos  -  /prod
  [GET]Ver producto por su Id            - /prod/(Id) `

  
  res.send(ayuda)
})

  

app.listen(port, () => {
  console.log(`Moastrando resultados en: http://localhost:${port}`)
})



