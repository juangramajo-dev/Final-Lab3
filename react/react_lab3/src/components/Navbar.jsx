import React from 'react'
import {makeStyles,Typography,Toolbar,AppBar,Button,Box} from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'
import StoreIcon from '@material-ui/icons/Store';


const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
          },
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${240}px)`,
          marginLeft: 240,
        },}
}))

export const Navbar = (props) => {

   const classes = useStyles()
    return (
            <AppBar className={classes.appBar} position="fixed" color="primary">
              <Toolbar>
                  <IconButton  color="inherit" aria-label="menu" className={classes.menuButton} 
                  onClick={()=> props.accionAbrir()}
                  >
                  <MenuIcon/>
                  </IconButton>
                  <Box display="flex"alignContent="flex-end" mr={2}>
                <StoreIcon />
                  </Box>
                <Typography className={classes.title}  variant="h5">
                  Despensa familiar
                </Typography>
              </Toolbar>
            </AppBar>
    )
}
export default Navbar