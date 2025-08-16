import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
const Translator = require('bazinga-translator');

class FilterButton extends Component {
        constructor() {
            super();
            this.state = {
                selectedValue: "0"
            };
        }

    handleFilterChange = (event) => {
        this.setState({selectedValue : event.target.value});
        this.props.callbackRb(event.target.value);
    };
    render() {
        return (
            <div className="d-flex justify-content-end">
                <FormControl component="fieldset" >
                    <RadioGroup style={{display: 'flex', flexDirection: 'row', textAlign: "center"}} aria-label="project type" defaultValue="top" name="pType" value={this.state.selectedValue} onChange={this.handleFilterChange}>
                        <FormControlLabel value="1" control={<Radio />} label={Translator.trans('project.form.projectType.choices.1')} labelPlacement="start" />
                        <FormControlLabel value="0" control={<Radio />} label="" labelPlacement="top"/>
                        <FormControlLabel value="2" control={<Radio />} label={Translator.trans('project.form.projectType.choices.2')} />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

export default FilterButton;