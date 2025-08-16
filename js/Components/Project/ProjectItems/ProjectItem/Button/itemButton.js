import React from "react";

const itemButton = (props) => {

    return (
        <span className={props.class}
              onClick={props.click}
              title={props.title}>
            <i className={props.iconClass}/>
        </span>
    )
};

export default  itemButton;