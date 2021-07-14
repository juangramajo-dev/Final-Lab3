import React from 'react';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Box, Typography, Button} from '@material-ui/core'

import DialpadIcon from '@material-ui/icons/Dialpad';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',

        },
    },
}));





const CrearArticulo = () => {

    const [nuevoCodigo, setnuevoCodigo] = useState('');
    const [nuevoNombre, setnuevoNombre] = useState('');
    const [nuevaMarca, setnuevaMarca] = useState('');
    const [nuevaCategoria, setnuevaCategoria] = useState('')
    const [nuevoDistribuidor, setnuevoDistribuidor] = useState('')
    const [nuevoBarcode, setnuevoBarcode] = useState('')
    const [nuevoStock, setNuevoStock] = useState('')
    const [nuevoPrecio, setnuevoPrecio] = useState('')
    const [nuevaDescripcion, setnuevaDescripcion] = useState('')

    const [articulos, setArticulos] = useState([])

    //Funcion para limpiar los inputs despues de cargarlos
    const resetValues = () => {
        setnuevoCodigo('');
        setnuevoNombre('');
        setnuevaMarca('');
        setnuevaCategoria('');
        setnuevoDistribuidor('');
        setnuevoBarcode('');
        setNuevoStock('');
        setnuevoPrecio('');
        setnuevaDescripcion('');
    }

    // Post a API para crear tarea
    const onNuevoArticulo = async () => {
        // Post a API para crear tarea
        const response = await fetch('http://localhost:4000/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigo: nuevoCodigo,
                nombre: nuevoNombre,
                marca: nuevaMarca,
                categoria: nuevaCategoria,
                distribuidor: nuevoDistribuidor,
                barcode: nuevoBarcode,
                stock: nuevoStock,
                enabled: 1,
                precio: nuevoPrecio,
                descripcion: nuevaDescripcion
            })
        })
        if (response.ok) {
            const data = await response.json()
            setArticulos([...articulos, data.data])
            alert('Articulo agragdo con éxito!')
        } else {
            alert('Error al agregar una tarea')
        }

    }

    const classes = useStyles();
    return (

        <Grid container >
            <Box w-100 display="flex" ml={25} justifyContent="center" >

                <Typography variant="h4" align="center" gutterBottom>
                    Crear nuevo producto
                </Typography>
            </Box>

            <Grid item xs={12} sm={6} md={12}>

                <Box>

                    <div className={classes.margin} value={nuevoCodigo} onChange={(e) => setnuevoCodigo(e.target.value)}>

                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <DialpadIcon color='secondary' />
                            </Grid>
                            <Grid item>
                                <TextField required id="input-with-icon-grid-required" label="Código interno" />
                            </Grid>
                        </Grid>

                    </div>
                </Box>

                <Box>
                    <div className={classes.margin} value={nuevoNombre} onChange={(e) => setnuevoNombre(e.target.value)} >
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AssignmentIcon color='secondary' />
                            </Grid>
                            <Grid item>
                                <TextField required id="input-with-icon-grid-required" label="Nombre del Producto" />
                            </Grid>
                        </Grid>
                    </div>
                </Box>

                <Box>
                    <div className={classes.margin} value={nuevaMarca} onChange={(e) => setnuevaMarca(e.target.value)}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <LocalOfferIcon color='secondary' />
                            </Grid>
                            <Grid item>
                                <TextField required id="input-with-icon-grid-required" label="Marca del producto" />
                            </Grid>
                        </Grid>
                    </div>
                </Box>

                <Box>
                    <div className={classes.margin} value={nuevoBarcode} onChange={(e) => setnuevoBarcode(e.target.value)}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <ViewWeekIcon color='secondary' />
                            </Grid>
                            <Grid item>
                                <TextField required id="input-with-icon-grid-required" label="Código de Barras" />
                            </Grid>
                        </Grid>
                    </div>
                </Box>


                <Box>
                    <div className={classes.margin} value={nuevoPrecio} onChange={(e) => setnuevoPrecio(e.target.value)}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AttachMoneyIcon color='secondary' />
                            </Grid>
                            <Grid item>
                                <TextField required id="input-with-icon-grid-required" label="Precio" />
                            </Grid>
                        </Grid>
                    </div>
                </Box>

                <Box>
                    <div className={classes.margin} value={nuevoStock} onChange={(e) => setNuevoStock(e.target.value)}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <ShowChartIcon color='secondary' />
                            </Grid>
                            <Grid item>
                                <TextField required id="input-with-icon-grid-required" label="Stock" />
                            </Grid>
                        </Grid>
                    </div>
                </Box>

                <Box>
                    <div className={classes.margin} value={nuevaDescripcion} onChange={(e) => setnuevaDescripcion(e.target.value)} placeholder='Descripcion'>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <DescriptionIcon color='secondary' />
                            </Grid>
                            <Grid item>
                                <TextField required id="input-with-icon-grid-required" label="Descripción" />
                            </Grid>
                        </Grid>
                    </div>
                </Box>

            </Grid>


            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box mt={8} ml={4} display="flex" justifyContent="center">
                    <div className={classes.margin}
                    >
                        <Button onClick={onNuevoArticulo} color="secondary" variant="contained" fullWidth>
                            Crear producto
                        </Button>

                    </div>
                </Box>
            </Grid>

        </Grid>




    );
}
export default CrearArticulo
