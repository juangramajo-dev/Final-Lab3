import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Grid, Box, Typography, Button, TextField } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const EditarProducto = () => {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div>


            <button type="button" onClick={handleOpen}>
                react-transition-group
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
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
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default EditarProducto
