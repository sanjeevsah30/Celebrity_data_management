import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DeleteDialogBox({
  DeleteBox,
  setDeleteBox,
  onDelete,
  id,
}) {
  const handleClose = () => {
    setDeleteBox(false);
  };

  return (
    <div>
      <Dialog
        open={DeleteBox}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        fullWidth
      >
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              onDelete(id);
              handleClose();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
