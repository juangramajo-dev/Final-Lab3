import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Hidden, makeStyles } from '@material-ui/core'
import Navbar from './Navbar'
import Cajon from './Cajon'
import CrearArticulo from './CrearArticulo'
import ListarProductos from './ListarProductos'
import Inicio from './Inicio'



const estilos = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },

}))
const Contenedor = () => {

    const [Abrir, setAbrir] = React.useState(false)
    const accionAbrir = () => {
        setAbrir(!Abrir)
    }

    const classes = estilos()
    return (

        <div className={classes.root}>
                <Router>

                <Navbar accionAbrir={accionAbrir} />
                <Hidden xsDown>
                    <Cajon
                        variant="permanent"
                        open={true}
                    />
                </Hidden>

                <Hidden smUp>
                    <Cajon
                        variant="temporary"
                        open={Abrir}
                        onClose={accionAbrir}
                    />
                </Hidden>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Switch>
                        <Route path='/listarproductos'>
                            <ListarProductos/>
                        </Route>

                        <Route path='/crearproducto'>
                            <CrearArticulo />
                        </Route>

                        <Route path='/editarproducto' >
                            <h1>Editar</h1>
                        </Route>

                        <Route path='/' exact>
                            <Inicio/>
                        </Route>
                    </Switch>
                </div>
        </Router>
            </div>
    )
}

export default Contenedor
