import { cyan, teal,blueGrey,purple,red } from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({

    palette:{
        primary:{
            main: red[400]
        },
        secondary:{
            main: red[800]
        }
    }


})

export default theme;
