import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@rjsf/core';
import { Theme as MuiTheme } from 'rjsf-material-ui';

const Form = withTheme(MuiTheme);


const Translator = require('bazinga-translator');
const Routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';
const axios = require('axios');

Routing.setRoutingData(Routes);

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

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

let yourForm;

class App extends Component {

    deleteElementHandler(idElement) {
        axios.delete(Routing.generate('api_delete_link') + "?id="+idElement)
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateElementHandler(element) {
        axios.put(Routing.generate('api_update_link'), element)
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    createElementHandler(element) {
        axios.post(Routing.generate('api_create_link'), element)
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onSubmitHandler = ({formData}, e) => {
        this.state.formData.map((elem) => {
            let elementFound = false;
            const maxElement = formData.length;
            for (let i = 0; i < maxElement; ++i) {
                if (elem.id === formData[i].id) {
                    if (elem.linkType !== formData[i].linkType ||
                        elem.uriLink !== formData[i].uriLink) {
                        this.updateElementHandler(formData[i]);
                    }
                    elementFound = true;
                    break;
                }
            }
            if (!elementFound) {
                this.deleteElementHandler(elem.id);
            }
        });
        formData.map((elem) => {
            if (!elem.id) {
                this.createElementHandler(elem);
            }
        });
        this.setState({open: false});
    };

    onRegisterClickHandler = () => {
        if (yourForm) {
            yourForm.submit();
        }
    };

    onCancelHandler = ({formData}, e) => {
        this.setState({open: false});
    };

    handleClickOpen = () => {
        this.setState({open: true});
        this.loadElement();
    };

    handleClose = () => {
        this.setState({open: false});
    };

    loadElement() {
        axios.get(Routing.generate('api_search_links'))
            .then((response) => {
                this.setState({formData: response.data.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.loadElement();
    }

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            schema: {
                "type": "array",
                "items": {
                    type: "object",
                    "required": [
                        "linkType",
                        "uriLink"
                    ],
                    properties: {
                        linkType: {
                            title: Translator.trans('index.link.linkType.title'),
                            type: "string",
                            enum: ["1", "2", "3", "4", "5"],
                            enumNames: [
                                Translator.trans('index.link.linkTypeName.1'), Translator.trans('index.link.linkTypeName.2'),
                                Translator.trans('index.link.linkTypeName.3'), Translator.trans('index.link.linkTypeName.4'),
                                Translator.trans('index.link.linkTypeName.5')
                            ]
                        },
                        uriLink: {
                            title: Translator.trans('index.link.uriLink'),
                            type: "string"
                        }
                    }
                }
            },
            uiSchema: {
                "ui:options": {
                    "addButtonLabel": Translator.trans('btn.add'),
                    orderable: false
                }
            },
            formData: [
            ]
        }
    }

    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                <DialogTitle id="customized-dialog-title" className="text-center" onClose={this.handleClose}>
                    {Translator.trans('index.link.title')}
                </DialogTitle>
                <DialogContent dividers>

                    <Form schema={this.state.schema}
                          formData={this.state.formData}
                          uiSchema={this.state.uiSchema}
                          onSubmit={this.onSubmitHandler}
                          ref={(form) => {yourForm = form;}}
                    >
                        <button type="submit" className="d-none">Submit</button>
                    </Form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelHandler} color="secondary">
                        {Translator.trans('btn.cancel')}
                    </Button>
                    <Button autoFocus onClick={this.onRegisterClickHandler} color="primary">
                        {Translator.trans('btn.submit')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default App;