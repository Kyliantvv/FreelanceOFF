import React from 'react';
import ReactDOM from 'react-dom';


import ErrorBoundary from "../shared/ErrorBoundary";
import ShortResume from "../Resume/ShortResume";
import StepBar from "../Resume/StepBar";
import IndexResumeC from "./IndexResumeC";


document.addEventListener('DOMContentLoaded', function() {


    const app = (

            <ErrorBoundary>
                <IndexResumeC/>
            </ErrorBoundary>
    );

    ReactDOM.render(app, document.getElementById('root'));

});