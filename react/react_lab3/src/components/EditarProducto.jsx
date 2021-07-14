import React, { useState, useEffect } from 'react';
import {Modal, TextField, Button} from '@material-ui/core';
import MaterialTable from "material-table";
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';

const columns= [
  { title: 'ID', field: 'id' },
  { title: 'Codigo', field: 'codigo' },
  { title: 'Nombre', field: 'nombre' },
  { title: 'Marca', field: 'marca' },
  { title: 'Categoria', field: 'categoria' },
  { title: 'Distribuidor', field: 'distribuidor' },
  { title: 'Cod.Barras', field: 'barcode', type: 'numeric' },
  { title: 'Stock', field: 'stock', type: 'numeric' },
  { title: 'Precio', field: 'precio', type: 'numeric' },
  { title: 'Descripcion', field: 'descripcion' },
];
const baseUrl='http://localhost:4000/items';


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function EditarProducto() {
  const styles= useStyles();
const [items, setItems] = useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [articuloSeleccionado, setArticuloSeleccionado]=useState({
      id: "",
    codigo: "",
    nombre: "",
    marca: "",
    categoria: "",
    distribuidor: "",
    barcode: "",
    stock: "",
    precio: "",
    descripcion: "",
    
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setArticuloSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  useEffect(() => {
    fetch('http://localhost:4000/items').then((response) => {
        response.json().then((data) => {
            console.log(data.mensaje)
            setItems(data.data)
        })
    })
}, [])

  const peticionPost=async()=>{
    await axios.post(baseUrl, articuloSeleccionado)
    .then(response=>{
      setItems(items.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+articuloSeleccionado.id, articuloSeleccionado)
    .then(response=>{
      var dataNueva= items;
      dataNueva.map(articulo=>{
        if(articulo.id===articuloSeleccionado.id){
            articulo.codigo=articuloSeleccionado.codigo;
            articulo.nombre=articuloSeleccionado.nombre;
          articulo.marca=articuloSeleccionado.marca;
          articulo.categoria=articuloSeleccionado.categoria;
          articulo.distribuidor=articuloSeleccionado.distribuidor;
          articulo.barcode=articuloSeleccionado.barcode;
          articulo.stock=articuloSeleccionado.stock;
          articulo.precio=articuloSeleccionado.precio;
          articulo.descripcion=articuloSeleccionado.descripcion;
        }
      });
      setItems(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+articuloSeleccionado.id)
    .then(response=>{
        setItems(items.filter(articulo=>articulo.id!==articuloSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarArticulo=(articulo, caso)=>{
    setArticuloSeleccionado(articulo);
    (caso==="Editar")?abrirCerrarModalEditar()
    :
    abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }


  const bodyInsertar=(
      <div className={styles.modal}>
          <h3>Agregar nuevo producto</h3>
          <TextField className={styles.inputMaterial} label="Codigo" name="codigo" onChange={handleChange} />

          <br />
          <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} />
          <br />
          <TextField className={styles.inputMaterial} label="Marca" name="marca" onChange={handleChange} />
          <br />
          <TextField className={styles.inputMaterial} label="Categoria" name="categoria" onChange={handleChange} />

          <TextField className={styles.inputMaterial} label="Distribuidor" name="distribuidor" onChange={handleChange} />

          <TextField className={styles.inputMaterial} label="Cod.Barras" name="barcode" onChange={handleChange} />

          <TextField className={styles.inputMaterial} label="Stock" name="stock" onChange={handleChange} />
          
          <TextField className={styles.inputMaterial} label="Precio" name="precio" onChange={handleChange} />

          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion" onChange={handleChange} />


          <br /><br />
          <div align="right">
              <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
              <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
          </div>
      </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar producto</h3>
      <TextField className={styles.inputMaterial} label="Codigo" name="codigo" onChange={handleChange} value={articuloSeleccionado&&articuloSeleccionado.codigo}/>
      <br />
      <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={articuloSeleccionado&&articuloSeleccionado.nombre}/>          
<br />
<TextField className={styles.inputMaterial} label="Marca" name="marca" onChange={handleChange} value={articuloSeleccionado&&articuloSeleccionado.marca}/>
      <br />
<TextField className={styles.inputMaterial} label="Categoria" name="categoria" onChange={handleChange} value={articuloSeleccionado&&articuloSeleccionado.categoria}/>

<TextField className={styles.inputMaterial} label="Distribuidor" name="distribuidor" onChange={handleChange} value={articuloSeleccionado&&articuloSeleccionado.distribuidor}/>

<TextField className={styles.inputMaterial} label="Cod.Barras" name="barcode" onChange={handleChange} value={articuloSeleccionado&&articuloSeleccionado.barcode}/>

<TextField className={styles.inputMaterial} label="Stock" name="stock" onChange={handleChange} value={articuloSeleccionado&&articuloSeleccionado.stock}/>

<TextField className={styles.inputMaterial} label="Precio" name="precio" onChange={handleChange} value={articuloSeleccionado&&articuloSeleccionado.precio}/>

<TextField className={styles.inputMaterial} label="Descripcion" name="descripcion" onChange={handleChange} value={articuloSeleccionado&&articuloSeleccionado.descripcion}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar al producto <b>{articuloSeleccionado && articuloSeleccionado.nombre}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button  color='primary' onClick={()=>abrirCerrarModalInsertar()}>Agregar nuevo producto</Button>
      <br /><br />
     <MaterialTable
          columns={columns}
          data={items}
          title="Lista de Productos"  
          actions={[
            { 
              icon: 'edit',
              iconProps: {color:'primary'},
              tooltip: 'Editar articulo',
              onClick: (event, rowData) => seleccionarArticulo(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar articulo',
              iconProps: {color:'primary'},

              onClick: (event, rowData) => seleccionarArticulo(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            header:{
              actions: "Acciones"
              
            },
            toolbar:{
                searchTooltip:'Buscar',
                searchPlaceholder:'Buscar'
            },
            pagination:{
                labelRowsSelect:'Filas',
                labelDisplayedRows:'{from} de {to} de {count} en total',
                labelRowsPerPage:'Filas por página:',
                firstAriaLabel:'Primera página',
                firstTooltip:'Primera página',
                previousAriaLabel:'Página anterior',
                previousTooltip:'Página anterior',
                nextAriaLabel:'Página siguiente',
                nextTooltip:'Página siguiente',
                astAriaLabel:'Última página',
                lastTooltip:'Última página',
            }
           
            } 
          }
        />

            
        <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        
        <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
    </div>
  );
}

export default EditarProducto;
