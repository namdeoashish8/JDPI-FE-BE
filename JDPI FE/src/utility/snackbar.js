import { enqueueSnackbar } from "notistack"


const snackbar = (type, message)=>{
    if( type== 'success' || type== 'warning' || type== 'error' || type== 'info' ){
    enqueueSnackbar(message, {variant:type, anchorOrigin:{vertical: 'top', horizontal: 'right'}})
    return;
    }
    enqueueSnackbar(message, {variant:'default', anchorOrigin:{vertical: 'top', horizontal: 'right'}})
}

export default snackbar;