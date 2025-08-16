import StepBar from "../Resume/StepBar";
import ShortResume from "../Resume/ShortResume";
import React, {Component} from "react";
const Translator = require('bazinga-translator');

class IndexResumeC extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <StepBar title={Translator.trans('resume.titleResume')} subtitle={Translator.trans('resume.subtitleResume')} onNext={() => this.clickChild()} />
                <ShortResume  setClick={click => this.clickChild = click} />
            </>
        )
    }
}

export default IndexResumeC;