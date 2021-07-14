import React from 'react'
import { useEffect, useState } from "react";
import { Icon,  IconButton, Radio ,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';


import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        marginBottom: '50px',

    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,

    },
    searching: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    export: {
        backgroundColor: '#e64a19',
        color: '#fff',
        padding: '15px 42px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inlineBlock',
        fontSize: '17px',
        marginTop: '30px',
        marginBottom: '10px',
        border: '2px solid #e64a19',
        transitionDuration: '0.5s',

        '&:hover': {
            backgroundColor: '#fff',
            color: '#e64a19',
            cursor: 'pointer',

        }

    },


}));



const ListarProductos = () => {


    

            
        
      const [checkeado,setCheackeado] = useState(1)
      console.log(checkeado)



      const handleCheckeado=e=>{
        setCheackeado(e.target.value);
      }

    
      
    //************  BARRA DE BUSQUEDA ************//}


    const [items, setItems] = useState([]);
    const [tablaArticulo, setTablaArticulo] = useState([]);
    const [busqueda, setBusqueda] = useState("");


    useEffect(() => {
        fetch('http://localhost:4000/items').then((response) => {
            response.json().then((data) => {
                console.log(data.mensaje)
                setItems(data.data)
                setTablaArticulo(data.data)

            })
        })
    }, [])

    const handleChangeNombre = e => {
        setBusqueda(e.target.value);
        filtrarNombre(e.target.value);
    }
    const handleChangeDescripcion = e => {
        setBusqueda(e.target.value);
        filtrarDescripcion(e.target.value);
    }
    

    const filtrarNombre = (terminoBusqueda) => {
        var resultadosBusqueda = tablaArticulo.filter((elemento) => {
            if (elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setItems(resultadosBusqueda);
    }
    const filtrarDescripcion = (terminoBusqueda) => {
        var resultadosBusqueda = tablaArticulo.filter((elemento) => {
            if (elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setItems(resultadosBusqueda);
    }
   
    

    const classes = useStyles();

    return (
        <div>
            {                //************ TITULO ************//
            }
            <Box w-100 display="flex" justifyContent="center" >
                <Typography variant="h4" align="center" gutterBottom>
                    Lista de productos
                </Typography>
            </Box>

            {                //************ RENDERIZADO DE BARRA DE BUSQUEDA ************//
            }
            <Box className={classes.searching}>

                <Paper component="form" className={classes.root}>

                    <InputBase
                        className={classes.input}
                        placeholder="Buscar por nombre de artículo o descripción"
                        inputProps={{ 'aria-label': 'Buscar por nombre de artículo"' }}
                        value={busqueda}
                        onChange={handleChangeNombre}

                    />
                    
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />

                </Paper>
            </Box>
                       {//************ RARIO BUTTON ************//
}
            {/* <Box mx={10}>

                <FormControl component="fieldset">
                    <FormLabel  component="legend">Busqueda</FormLabel>
                    <RadioGroup row aria-label="buscar" value={checkeado} onChange={handleCheckeado}>
                        <FormControlLabel value='1' cheaked={checkeado === 1 ? {handleChangeNombre} : {handleChangeDescripcion}} control={<Radio />} label="Buscar por nombre" />
                        <FormControlLabel value='2' cheaked={checkeado === 2 ? {handleChangeDescripcion} : {handleChangeNombre}} control={<Radio />} label="Buscar por descripción" />
                    </RadioGroup>
                </FormControl>
            </Box> */}

          

          
            {                //************ TABLA ************//
            }
            <Typography variant='text'  ></Typography>
            <TableContainer>
                <Table id='articulos'>
                    <TableHead>
                        <TableRow>

                            <TableCell>ID</TableCell>
                            <TableCell>Codigo</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Distribuidor</TableCell>
                            <TableCell>Cod.Barras</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Descripcion</TableCell>
                            <TableCell>Editar</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {items.map((articulo) => (
                            <TableRow>

                                <TableCell>{articulo.id}</TableCell>
                                <TableCell>{articulo.codigo}</TableCell>
                                <TableCell>{articulo.nombre}</TableCell>
                                <TableCell>{articulo.marca}</TableCell>
                                <TableCell>{articulo.categoria}</TableCell>
                                <TableCell>{articulo.distribuidor}</TableCell>
                                <TableCell>{articulo.barcode}</TableCell>
                                <TableCell>{articulo.stock}</TableCell>
                                <TableCell>${articulo.precio}</TableCell>
                                <TableCell>{articulo.descripcion}</TableCell>

                                <IconButton aria-label="editar" color="primary">
                                    <EditIcon />
                                </IconButton>
                            </TableRow>
                        ))}

                    </TableBody>

                </Table>

  
            </TableContainer>

            <div align='center'>


                <ReactHTMLTableToExcel
                    id='ExportExcel'
                    table='articulos'
                    filename='Lista De Articulos'
                    sheet='pagina1'
                    buttonText='Exportar en Excel'
                    className={classes.export}
                >
                </ReactHTMLTableToExcel>

            </div>
        </div>
    )
}

export default ListarProductos
