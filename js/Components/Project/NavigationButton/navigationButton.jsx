import React from 'react';
const Translator = require('bazinga-translator');
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPageOutlinedIcon from '@material-ui/icons/FirstPageOutlined';
import LastPageOutlinedIcon from '@material-ui/icons/LastPageOutlined';
import {Widgets} from "@material-ui/icons";


export default function navigation(props) {
    const previous = Translator.trans('widget.navigation.previous');
    const next = Translator.trans('widget.navigation.next');
    const first = Translator.trans('widget.navigation.first');
    const last = Translator.trans('widget.navigation.last');
    const current = Translator.trans('widget.navigation.current');

    return (
        <div className='row'>
            <div className="col">
                <span className="float-right">
                    <IconButton disabled={!props.previous} aria-label={first} title={first} onClick={props.navFirst}>
                        <FirstPageOutlinedIcon />
                    </IconButton>
                    <IconButton disabled={!props.previous} aria-label={previous} title={previous} onClick={props.navPrevious}>
                        <ChevronLeft />
                    </IconButton>
                    <label>{props.current}</label>
                    <IconButton disabled={!props.next} aria-label={next} title={next} onClick={props.navNext}>
                        <ChevronRight />
                    </IconButton>
                    <IconButton disabled={!props.next} aria-label={last} title={last} onClick={props.navLast}>
                        <LastPageOutlinedIcon />
                    </IconButton>
                </span>
            </div>
        </div>
    );
}
