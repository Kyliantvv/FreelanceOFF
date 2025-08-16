import StepBar from "../Resume/StepBar";
import React, {Component} from "react";
import ShortExperience from "../Experience/ShortExperience";
const Translator = require('bazinga-translator');

class IndexMetierC extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <StepBar title={Translator.trans('resume.titleSkill')} subtitle={Translator.trans('resume.subtitleSkill')} onNext={() => this.clickChild()} />
                <ShortExperience  setClick={click => this.clickChild = click} />
            </>
        )
    }
}

export default IndexMetierC;