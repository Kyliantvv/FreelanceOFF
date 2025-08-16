import React, {Component} from "react";
import {DropzoneArea} from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
const axios = require('axios');
import Grid from "@material-ui/core/Grid";

const Translator = require('bazinga-translator');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';
import ModalMessage from "../UI/Modal/ModalMessage";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
const Routes = require('../../../public/js/fos_js_routes.json');
Routing.setRoutingData(Routes);

const styles = theme => ({
    paper: {
        padding: '12px',
    },
    unFlex : {
        display: 'block',
        textAlign: 'center',
    }
});
class IntegreUser extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            files : null,
            showConfirmation: false,
            severity: "success",
            message: "",
            loading: false,
        }
    }

    componentDidMount(){
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    submitFile = () => {
        if(!this.state.files || this.state.files.length === 0){
            this.setState({severity : 'warning' , message : Translator.trans('widget.freelance.grid.integration.missing'), showConfirmation : true });
            return;
        }
        this.setState({loading: true});
        let nb = 0;
        this.state.files.map( file => {
            const formData = new FormData();
            formData.append("Files", file);
            nb++;
            axios.post(
                Routing.generate('api_integre_freelance'),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
                .then(result => {
                    if (this._isMounted) {
                        nb--;
                        const resultFileIntegration =result.data[0];
                        if(resultFileIntegration.status) {
                            this.setState({
                                severity: 'success',
                                message: Translator.trans('widget.freelance.grid.integration.feedback.1', {'name' : resultFileIntegration.file}),
                                showConfirmation: true
                            });

                        } else {
                            this.setState({
                                severity: 'error',
                                message: Translator.trans('widget.freelance.grid.integration.feedback.2', {'name' : resultFileIntegration.file}),
                                showConfirmation: true
                            });
                        }
                        if (nb === 0) {
                            this.setState({loading: false});
                        }
                    }
                })
                .catch((error) => {
                    if (this._isMounted) {
                        nb--;
                        this.setState({severity: 'error', message: error.message, showConfirmation: true});
                        if (nb === 0) {
                            this.setState({loading: false});
                        }
                    }
                });
        });
    };

    handleModalClose = () => {
        this.setState({showConfirmation: false, message: ''});
    };

    render(){
        const { classes } = this.props;
        return (
            <>
                {this.state.showConfirmation && <ModalMessage modal={true} text={this.state.message} severity={this.state.severity} handleModalClose={this.handleModalClose} open={true} vertical={'bottom'} horizontal={'center'}/>}
                <Paper elevation={0} className={classes.paper}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <DropzoneArea
                                dropzoneText={Translator.trans('widget.freelance.grid.integration.files')}
                                // acceptedFiles={['text/csv','text/plain','application/vnd.ms-excel']}
                                maxFileSize={5242880}
                                onChange={(files) =>  this.setState({files : files})}
                                showPreviews={false}
                                showFileNames={true}
                                getFileLimitExceedMessage ={ filesLimit => Translator.trans('widget.freelance.grid.integration.dropzone.fileLimit',{filesLimit: filesLimit})}
                                getFileAddedMessage ={ fileName => Translator.trans('widget.freelance.grid.integration.dropzone.fileAdd',{fileName: fileName})}
                                getFileRemovedMessage ={ fileName => Translator.trans('widget.freelance.grid.integration.dropzone.fileDelete',{fileName: fileName})}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.unFlex}>
                            <Button color={"primary"} onClick={this.submitFile} variant="contained">{Translator.trans('widget.freelance.grid.integration.btn.send')}</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        )
    }
}


export default (withStyles(styles)(IntegreUser));