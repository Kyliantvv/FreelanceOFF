import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from "@material-ui/core/Slide";
import {Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import withStyles from "@material-ui/core/styles/withStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default function ModalUI(props) {

    const [open, setOpen] = React.useState(props.open);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        //disableBackdropClick
        if (reason === "backdropClick") {
            return false;
        }
        //disableEscapeKeyDown
        if (reason === "escapeKeyDown") {
            return false;
        }

        setOpen(false);
        setTimeout(() => {
            props.handleModalClose();
        }, 500);

    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            maxWidth={"xl"}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {props.title ? <DialogTitle id="alert-dialog-slide-title" onClose={handleClose}>{props.title}</DialogTitle> : null }
            <DialogContent dividers>
                {props.child}
            </DialogContent>
        </Dialog>
    )
}

ModalUI.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool.isRequired,
    handleModalClose: PropTypes.func,
    child: PropTypes.object.isRequired
};
