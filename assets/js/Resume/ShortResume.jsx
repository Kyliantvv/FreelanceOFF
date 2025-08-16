import React, {useEffect, useState} from 'react';

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {TextField} from 'formik-material-ui';
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

import PersonIcon from '@material-ui/icons/Person';

import FormikAutocomplete from "../UI/Field/FormikAutocomplete";
import CommonFeedback from "../UI/Feedback/CommonFeedback";

import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';

import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';
import CardActions from "@material-ui/core/CardActions";
const Translator = require('bazinga-translator');
const Routes = require('../../../public/js/fos_js_routes.json');

Routing.setRoutingData(Routes);
const axios = require('axios');

Yup.setLocale({
    // use constant translation keys for messages without values
    mixed: {
        required: ({field}) => (Translator.trans('error.field.string.required')),
        nullable: ({field}) => (Translator.trans('error.field.string.required')),
    },
    // use functions to generate an error object that includes the value from the schema
    number: {
        min: ({ min }) => (Translator.trans('error.field.number.min', {'min': min})),
        max: ({ max }) => (Translator.trans('error.field.number.max', {'max': max})),
        nullable: ({field}) => (Translator.trans('error.field.string.required')),
    },
    string: {
        min: ({ min }) => (Translator.trans('error.field.string.tooShort', {'min': min})),
        max: ({ max }) => (Translator.trans('error.field.string.tooLong', {'max': max})),
        email: ({email}) => (Translator.trans('error.field.string.email', {'email': email})),
        nullable: ({field}) => (Translator.trans('error.field.string.required')),
    },
});

const SignupSchema = Yup.object().shape({
    title: Yup.string()
        .required()
        .max(50)
        .nullable(),
    city: Yup.string()
        .required()
        .max(100)
        .nullable(),
    description: Yup.string()
        .required()
        .nullable(),
    tjm: Yup.number()
        .required()
        .nullable()
        .max(99999999.99)
});

const useStyles = makeStyles((theme) => ({
    paper: {
        // backgroundColor: theme.palette.primary.main,
        // color: '#FFFFFF',
        width: '80%',
        margin: 'auto',
        minHeight: '410px',
        alignItems: 'center',
    },
    typo: {
        padding: "16px",
        //  color: "#FFFFFF",
    },
    footer : {
        textAlign: 'right',
        display: 'none',
    },
    button : {
         display: 'none',
    },
    buttonBox : {
        marginRight : '15px',
        display: 'inline',
        color: 'white !important',
        fontFamily: 'NexaXBold',
        fontSize: '17px',
        backgroundColor: '#0D6EED',
        width: 'fit-content'
    },
    circular: {
        "& .MuiCircularProgress-colorPrimary": {
            // color: "#FFFFFF !important",
        },

        "& .MuiCircularProgress-root": {
            display: 'block',
            margin: 'auto',
            top: '180px',
            position: 'relative',
        }
    },
    chipsRoot: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        fontSize: '1.5rem',
        padding: '0',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    chipRoot: {
        fontSize: '1.5rem'
    },
    littlePadding: {
        padding: '16px 0 0 16px',
    },
    noPadding: {
        padding: '0',
    }
}));

const ShortResume = (props) => {
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const buttonSubmit = React.createRef();
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userSkills, setUserSkills] = useState(null);
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [optionSearch, setOptionSearch] = useState([]);

    React.useEffect(() => {
        let active = true;

        if (!search || search.length <3) {
            return undefined;
        }

        axios.get(Routing.generate('api_search_skill_to_section', {name : search}))
            .then(result => {
                if (active && result.data) {
                    setOptionSearch(result.data);
                }
            })
            .catch((error) => {
                setShowError(true);
            });

        return () => {
            active = false;
        };
    }, [search]);

    useEffect(() => {
        let active = true;
        axios.get(Routing.generate('api_get_resume'))
            .then(result => {
                var resume = result.data;
                if(active && resume) {
                    setUserSkills(
                        resume.userSkills.map((userskill) => {
                            return (
                                <Box
                                    p={2}
                                    className={classes.buttonBox}
                                    variant="contained"
                                    color="primary"
                                    key={userskill.id}
                                >
                                    {userskill.idSkillToSection.idSkill.skillName}
                                </Box>
                            );
                        })
                    );
                    resume.userSkills = [];
                    resume.newUserSkills = [];
                    for (var item in resume) {
                        if (resume[item] === null) {
                            resume[item] = '';
                        }
                    }
                    setInitialValues(resume);
                    axios.get(Routing.generate('api_search_skill_to_section', {name : '-1'}))
                        .then(result => {
                            if (active && result.data) {
                                setOptionSearch(result.data);
                            }
                        })
                        .catch((error) => {
                            setShowError(true);
                        });
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setShowError(true);
            });
        return () => {
            active = false;
        };
    }, []);
    const FeedBack = (props) =>{
        const handleClick = () => {
            setShowError(false);
            setShowSuccess(false);
        };
        return (
            props.error   ? <CommonFeedback message={Translator.trans('resume.feedback.error')} severity="error" click={handleClick}/>
                :
                props.success ? <CommonFeedback message={Translator.trans("resume.feedback.success")} severity="success" click={handleClick}/>
                    : null
        )
    };

    const handleSubmit = (values, { setSubmitting }) => {
        const createClient = Routing.generate('api_update_short_resume');
        const localValues = {...values};
        localValues.newUserSkills = localValues.newUserSkills.map(skill => {
            return skill.id;
        });
        localValues.tjm = `${localValues.tjm}`;
        axios.put(createClient, localValues)
            .then(result => {
                setSubmitting(false);
                setShowSuccess(true);
                window.location = Routing.generate('index_presentation.'+ $('html')[0].lang);
            })
            .catch((error) => {
                setSubmitting(false);
                setShowError(false);
            });
    };

    const callSave= () => {
        buttonSubmit.current.click();
    };
    useEffect(() => {
        props.setClick(callSave);
    });

    return (

        initialValues === null ?
            loading ?
                <div  className={classes.circular}><CircularProgress /></div>
                :
                <Typography variant="h6" className={classes.typo} >{Translator.trans('resume.error.fetch')}</Typography>
            :
            <Box mx={3} mt={2}>
                <Card>
                    <CardContent>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={handleSubmit}
                        >
                            {({submitForm, isSubmitting, touched, errors}) => (
                                <Form>
                                    <FeedBack success={showSuccess} error={showError}/>
                                    <Grid container spacing={3} alignItems="center">
                                        <Grid item xs={12}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Typography variant="body1" gutterBottom>{Translator.trans('resume.titleCompetence')}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box mb={4}>
                                                    {userSkills}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            max={50}
                                                            name="title"
                                                            type="text"
                                                            label={Translator.trans('resume.form.title')}
                                                            fullWidth
                                                            variant='outlined'
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            row={4}
                                                            name="description"
                                                            type="text"
                                                            multiline
                                                            rows={4}
                                                            label={Translator.trans('resume.form.description')}
                                                            fullWidth
                                                            variant='outlined'
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="city"
                                                            type="text"
                                                            label={Translator.trans('resume.form.city')}
                                                            fullWidth
                                                            variant='outlined'
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="tjm"
                                                            type="number"
                                                            label={Translator.trans('resume.form.tjm')}
                                                            fullWidth
                                                            variant='outlined'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        €
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            multiple={true}
                                                            fullWidth
                                                            name='newUserSkills' component={FormikAutocomplete}
                                                            label={Translator.trans('resume.form.skill')}
                                                            textFieldProps={{ fullWidth: true, margin: 'normal', variant: 'outlined' }}
                                                            onInputChange={(event, value, reason) => setSearch(value) }
                                                            getOptionLabel={(option) => { return option.value ? option.value: []}}
                                                            options={optionSearch ? optionSearch.sort((a, b) => -b.group.localeCompare(a.group)) : optionSearch}
                                                            groupBy={(option) => option.group}
                                                            disableCloseOnSelect
                                                            getOptionSelected={(option, value) => {
                                                                if (value === null || value.length === 0) {
                                                                    return true;
                                                                } else if (value.valueId === option.valueId && value.groupId === option.groupId) {
                                                                    return true;
                                                                }
                                                            }
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className={classes.footer}>

                                            <Button
                                                className={classes.button}
                                                ref={buttonSubmit}
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={submitForm}
                                            >
                                                {Translator.trans('resume.form.submit')}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                    <CardActions>
                        <Typography  className="footFreelance">{Translator.trans('footer.label')}</Typography>
                    </CardActions>
                </Card>
            </Box>
    )
};

export default  ShortResume;