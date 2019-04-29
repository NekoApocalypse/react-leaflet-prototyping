import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { observer } from 'mobx-react';

// const styles = {}

const SimpleModal = observer((props) => {
  const { handleClose, open } = props;
  return (
    <Dialog aria-labelledby="simple-modal-title" open={open} onClose={handleClose}>
      <DialogTitle id="simple-modal-title">Sample Modal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is an example dialog.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

export default SimpleModal;
