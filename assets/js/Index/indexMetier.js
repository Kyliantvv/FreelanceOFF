import React from 'react';
import ReactDOM from 'react-dom';


import ErrorBoundary from "../shared/ErrorBoundary";
import IndexMetierC from "./IndexMetierC";


document.addEventListener('DOMContentLoaded', function() {

    const app = (
            <ErrorBoundary>
                <IndexMetierC/>
            </ErrorBoundary>
    );

    ReactDOM.render(app, document.getElementById('root'));

});