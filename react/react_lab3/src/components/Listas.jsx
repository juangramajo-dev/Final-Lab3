import React from 'react'
import {List,ListItem,ListItemIcon,ListItemText,Divider} from '@material-ui/core'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles'

import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
export const Listas = () => {


    const refreshlista = ()=>{
        window.location.replace('/listarproductos');
        
    }
    const refreshcrear = ()=>{
        window.location.replace('/crearproducto');
        
    }
    const refresheditar = ()=>{
        window.location.replace('/editarproducto');
       
        
    }
    const refreshinicio = ()=>{
        window.location.replace('/');
       
        
    }

    const useStyles = makeStyles({
        personalizado: {
            textDecoration: 'none',
            color:'#37474f'
        },
      });

      const clases = useStyles()

    return (
        <Router>
        <div>
            <List component='nav'>
                

               
                <NavLink  className={clases.personalizado}  onClick={refreshlista} to= '/listarproductos'>
                <ListItem button>
                    <ListItemIcon>
                        <ListIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Listar productos'/>
                </ListItem>
                </NavLink>

                <NavLink  className={clases.personalizado}  onClick={refreshcrear} to= '/crearproducto'>
                <ListItem button>
                    <ListItemIcon>
                        <AddToPhotosIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Crear producto'/>
                </ListItem>
                </NavLink>

                <NavLink  className={clases.personalizado}  onClick={refresheditar}to= '/editarproducto'>
                <ListItem button>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Editar Producto'/>
                </ListItem>
                </NavLink>
                
<Divider/>

                        <NavLink  className={clases.personalizado} onClick={refreshinicio}to= '/' exact>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Inicio'/>
                        </ListItem>
                        </NavLink>
            </List>
        
        </div>
        </Router>
    )
}

export default Listas
