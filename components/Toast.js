import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const Toast = ({ msg, handleShow, text, button }) => {
   const [open, setOpen] = React.useState(false);
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div>
         {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open responsive dialog
         </Button> */}
         <Dialog
            fullScreen={fullScreen}
            open={true}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title" className={`${text}`}>
               {"Message from e-Learn"}
            </DialogTitle>
            <DialogContent>
               <DialogContentText style={{color:"white"}}>{msg.msg}</DialogContentText>
            </DialogContent>
            <DialogActions>
               <button
                  onClick={(handleClose, handleShow)}
                  className={`px-5 py-2 ${button} rounded-md text-white`}>
                  OK
               </button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default Toast;
