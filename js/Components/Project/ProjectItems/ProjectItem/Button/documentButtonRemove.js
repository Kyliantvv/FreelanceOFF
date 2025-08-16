import React from "react";
const Translator = require('bazinga-translator');
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const documentButtonRemove = (props) => {
    const delDoc = Translator.trans('btn.delete');
    return (
        <button
            className="btn btn-outline-elegant btn-rounded waves-effect ml-1"
            title={delDoc}
            onClick={() => props.deleteThisDoc(props.idProj, props.idDoc, props.indexDoc)}
        >
            <FontAwesomeIcon icon="trash" />
        </button>
    )
};

export default documentButtonRemove;