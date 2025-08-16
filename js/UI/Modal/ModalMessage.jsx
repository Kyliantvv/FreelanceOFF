import React, { Component } from 'react';

import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
const Translator = require('bazinga-translator');


const useStyles = makeStyles((theme) => ({
    scrollList : {
        display : 'block',
        maxHeight: '140px',
        paddingRight: '15px',
        overflowY: 'auto'
    },
    alert : {
        '& .MuiAlert-action > button ' : {
            top: '11px',
            position: "fixed",
            right: '5px',
        }
    }
}));

export default function ModalMessage(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    const vertical = (props.vertical ? props.vertical : 'bottom');
    const horizontal = (props.horizontal ? props.horizontal : 'left');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway' && props.modal) {
            return;
        }
        handleClose2();
    };

    const handleClose2 = () => {
        setOpen(false);
        setTimeout(() => {
            if(props.handleModalClose) {
                props.handleModalClose();
            }
        }, 500);
    };

    return (
        <Snackbar open={open}
                  autoHideDuration={props.time ? props.time : props.severity === 'error' ? null : 2000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical, horizontal }}
                  ContentProps={{
                      'aria-describedby': 'message-id',
                  }}>
            <Alert classes={{root: classes.alert}} severity={props.severity}  onClose={handleClose2}>
                <AlertTitle>{Translator.trans('modal.title.'+props.severity)}</AlertTitle>
                <Box classes={{root: classes.scrollList}}  dangerouslySetInnerHTML={{__html: props.text ? props.text.replaceAll('\r\n', '<br/>') : props.text}}/>
            </Alert>
        </Snackbar>
    )
}

ModalMessage.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    open: PropTypes.bool.isRequired,
    time: PropTypes.number,
    handleModalClose: PropTypes.func,
    vertical: PropTypes.string,
    horizontal: PropTypes.string
};
