import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }


    render() {
        const { open, handleClose, headertitle,maxWidth } = this.props
        return (
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="sm"
                    fullWidth
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">

                        {headertitle}
                    </DialogTitle>

                    <hr />
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>

                    <hr />
                    <DialogActions>

                        {/* <Button onClick={handleClose}>Disagree</Button> */}
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default dialog;
