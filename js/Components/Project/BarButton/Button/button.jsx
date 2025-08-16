import React from "react";


const buttonBar = (props) => (

    <span className= {props.classes} title={props.title} onClick={props.click}>
            <i className={props.icon}/>
    </span>

);

export default buttonBar;