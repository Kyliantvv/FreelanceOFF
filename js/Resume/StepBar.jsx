import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import '../../scss/Index/indexResume.scss';
const styles = theme => ({
    paper: {
        backgroundColor: "#162A4C !important",
        height: '130px',
        marginLeft: '-30px',
        marginRight: '-30px',
        borderRadius: 0
    },
    right: {
        textAlign: 'right',
    },
    grid : {
        padding: ' 0 54px',
        height: '100%',
        alignItems: 'center'
    },
    buttonLabel : {
        color: 'white !important',
        fontFamily: 'NexaXBold',
        fontSize: '15px'
       // textTransform: 'none'
    },
    buttonRoot:{
        backgroundColor: '#0D6EED',
        width: '180px',
        '&:hover': {
            backgroundColor: '#0a53b3',
        }
    }
});

class StepBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonRef: React.createRef(),
            isSubmitting: false,
            submit: null
        };
    }


    setProps = (disabled, submit) => {
        this.state({'isSubmitting' : disabled, 'submit' : submit});
        if(disabled){
            this.state.buttonRef.click();
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper classes={{root: classes.paper}}>
                <Grid container classes={{root: classes.grid}}>
                    <Grid item xs={6} >
                        <Typography  className="NexaBold25White">{this.props.title}</Typography>
                        <Typography  className="NexaBook16White">{this.props.subtitle}</Typography>
                    </Grid>
                    <Grid item xs={6} classes={{root: classes.right}}>
                        <Button
                            ref={this.state.buttonRef}
                          //  disabled={this.state.isSubmitting}
                            onClick = {this.props.onNext}
                            classes={{
                                root: classes.buttonRoot,
                                label: classes.buttonLabel,
                            }}
                        >{Translator.trans('resume.form.submit')}</Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(StepBar);