import React, {useEffect} from 'react';

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CommonFeedback from "../UI/Feedback/CommonFeedback";

const axios = require('axios');

const Translator = require('bazinga-translator');
const Routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';
Routing.setRoutingData(Routes);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 0,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paperHeight: {
        height: 'calc((100vh - (70px + 1.5em + 130px + 40px)))',
        maxHeight:  'calc((100vh - (70px + 1.5em + 130px + 40px)))',
        backgroundColor: '#FFFFFF',
        color: '#000000',
    },
    button: {
        padding: 0,
        transitionDuration: '0.4s',
        color: '#000000',
        textTransform: "none",
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: '#FFFFFF',
        }
    },
    buttonHeight: {
        height: 'calc((100vh - (70px + 130px + 40px + (3*24px) + 1.5em))/3)',
    },
    buttonSelect: {
        backgroundColor: theme.palette.primary.main,
        color: '#FFFFFF',
    },
    cardContent: {
        width: '100%',
        height: '100%',
        maxHeight:  'calc((100vh - (70px + 130px + 40px + 1.5em + 120px)))',
        overflow: 'auto',
    },
    cardHeader :{
        backgroundColor: theme.palette.primary.main,
        color: '#FFFFFF',
        fontSize: '1rem',
        lineHeight: '80px',
    },
    noPaddingTB : {
        paddingTop : '0px !important',
        paddingBottom: '0px !important',
        // textTransform: 'uppercase',
    },
    checkbox: {
       // color: theme.palette.secondary.main,
        '&$checked': {
            color: theme.palette.secondary.main,
        },
    },
    container : {
        display: 'flex',
        flexGrow: '1',
        height:'33%',
        '& .MuiGrid-item': {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
    },
    line : {
        margin: 0,
        paddingBottom: '24px'
    },
    cardAction : {
        // backgroundColor: theme.palette.primary.main,
        width: '100%',
        textAlign: 'right',
        display: 'block',
    },
    cardActionButton: {
        fontSize: '1rem',
        color: '#FFFFFF',
    },
    sectionContent : {
        marginTop: '12px',
        width: '100%',
        height: '100%',
        maxHeight:  'calc(100vh - 67px - 1.5em - 130px - 40px)',
        overflow: 'auto',
        overflowX: 'hidden',
    }

}));

const seniorityList = [
    {value : '1', label :Translator.trans('resume.list.seniority.choices.1')},
    {value : '2', label :Translator.trans('resume.list.seniority.choices.2')},
    {value : '3', label :Translator.trans('resume.list.seniority.choices.3')},
    {value : '4', label :Translator.trans('resume.list.seniority.choices.4')}
];

const ShortExperience = (props) => {
    let _isMount = true;
    const classes = useStyles();
    const [listSection, setListSection] = React.useState([]);
    const [listSkill, setListSkill] = React.useState([]);
    const [checkedItem, setCheckedItem] = React.useState([]);
    const [buttonSelect, setButtonSelect] = React.useState(null);
    const[sectionName, setSectionName] =  React.useState(null);
    const [showError, setShowError] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [customMessage, setCustomMessage] = React.useState(null);
    const [seniority, setSeniority] = React.useState('');

    const handleToggle = (value) => () => {
        const currentIndex = checkedItem.indexOf(value);
        const newChecked = [...checkedItem];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedItem(newChecked);
    };

    const handleClickSection = (id) => {
        setButtonSelect(id);

    };

    useEffect(() => {
        if(buttonSelect) {
            const reducer = (accumulator, currentValue) => currentValue.id === buttonSelect ? currentValue : accumulator;
            setSectionName(listSection.reduce(reducer, null));
            setCheckedItem([]);
            axios.get(Routing.generate('api_list_skill_by_section', {'id': buttonSelect, 'priority': 1}))
                .then((response) => {
                    if (_isMount) {
                        setListSkill(response.data);
                    }
                })
                .catch((error) => {
                    setShowError(true);
                    console.log(error);
                });
        }
    }, [buttonSelect]);

    useEffect(() => {
        axios.get(Routing.generate('api_list_skill_section'))
            .then((response) => {
                if(_isMount) {
                    if(_isMount) {
                        setListSection(response.data);
                        response.data.length && setButtonSelect(response.data[0].id);
                    }
                }
            })
            .catch((error) => {
                if(_isMount) {
                    setShowError(true);
                    console.log(error);
                }
            });

       return () => {
           _isMount = false;
        };
    }, []);

    const handleNext = () => {
        const formData = new FormData();
        //formData.set("choices", checkedItem);
        for (let i = 0; i < checkedItem.length; i++) {
            formData.append('choices[]', checkedItem[i]);
        }
        formData.set("seniority", seniority);
        axios.post(Routing.generate('api_add_user_skill'), formData)
            .then((response) => {
                window.location = Routing.generate('index_resume.'+ $('html')[0].lang);
            })
            .catch((error) => {
                if(_isMount) {
                    setShowError(true);
                    console.log(error);
                }
            });
    };

    const callSave= () => {
        if(seniority.length !== 0 && checkedItem.length !== 0) {
            handleNext();
        } else {
            setCustomMessage(Translator.trans('resume.feedback.missing'))
        }
    };
    useEffect(() => {
        props.setClick(callSave);
    });

    const FeedBack = (props) =>{
        const handleClick = () => {
            setShowError(false);
            setShowSuccess(false);
            setCustomMessage(null);
        };
        return (
            props.error   ? <CommonFeedback message={Translator.trans('resume.feedback.error')} severity="error" click={handleClick}/>
                :
                props.success ? <CommonFeedback message={Translator.trans("resume.feedback.success")} severity="success" click={handleClick}/>
                    : props.custom ? <CommonFeedback message={props.custom} severity="error" click={handleClick}/>
                    : null
        )
    };

    const ItemMetier = (props) => {
        const item= props.item;
       return (
           <Grid item xs={4} key={item.id} className={[classes.noPaddingTB, classes.buttonHeight].join(' ')}>
            <Paper className={classes.paper}>
                <Button
                    className={[classes.button, classes.buttonHeight, (buttonSelect == item.id ? classes.buttonSelect : '')].join(' ')}
                    onClick={(e) => handleClickSection(item.id)}
                    fullWidth>
                    <Grid container>
                        { item.icon ? <Grid item xs={12}><FontAwesomeIcon icon={["far", item.icon]} size="3x" /></Grid> : null}
                        <Grid item xs={12}><Typography variant="h6">{item.name}</Typography></Grid>
                    </Grid>
                </Button>
            </Paper>
        </Grid>)
    };

    const SubList = (props) => {
        const startIndex = props.startIndex;
        return listSection.map((item, index, list) => {
            return startIndex + 3 > index && index >= startIndex ? <ItemMetier key={`item-${index}`} item={item}/> : null

        });
    };

    const ListMetier = (props) => {
       const viewSection = [];
        for(let i = 0; i < listSection.length; i++){
            i % 3 === 0? viewSection.push(<Grid key={`line-${i}`} container direction="row"  spacing={2} className={classes.line}><SubList startIndex={i}/></Grid>) : null;
        }
        return (
            viewSection.map(item => item)
        );
    };

    return (
        <>
        <FeedBack success={showSuccess} error={showError} custom={customMessage}/>
            <Grid container spacing={3}>
                <Grid item xs={8} className={classes.sectionContent}>
                    {
                        listSection && <ListMetier startIndex={0}/>
                    }
                </Grid>
                <Grid item xs={4}>
                    <Grid item xs={12} className={classes.noPaddingTB}>
                        <Card xs={12} className={[classes.paper , classes.paperHeight].join(' ')}>
                            <CardHeader  className={classes.cardHeader} title={Translator.trans('resume.list.title')} />
                            <CardContent className={classes.cardContent}>
                                <TextField
                                    fullWidth
                                    select
                                    label={Translator.trans('resume.list.seniority.label')}
                                    value={seniority}
                                    onChange={(event) => {setSeniority(event.target.value);}}
                                >
                                    {seniorityList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <List >
                                    {
                                        listSkill.map((item) => {
                                            const labelId = `checkbox-list-label-${item.id}`;
                                            return (
                                                <ListItem key={item.id} role={undefined} dense button onClick={handleToggle(item.id)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            className={classes.checkbox}
                                                            edge="start"
                                                            checked={checkedItem.indexOf(item.id) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{'aria-labelledby': labelId}}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={`${item.name}`}/>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </CardContent>
                            {/*<CardActions className={classes.cardAction}>*/}
                            {/*    <Button disabled={seniority.length === 0 || checkedItem.length === 0} onClick={handleNext} className={classes.cardActionButton} color={"primary"} variant={"contained"}>{Translator.trans('resume.form.submit')}</Button>*/}
                            {/*</CardActions>*/}
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography  className="footFreelance">{Translator.trans('footer.label')}</Typography>
                </Grid>
            </Grid>
</>
    )
};

export default ShortExperience;
