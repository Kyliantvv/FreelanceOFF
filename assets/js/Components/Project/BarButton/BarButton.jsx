import React, {Component} from "react";
import Button from './Button/button';
import Aux from "../../../hoc/Auxiliary/Auxiliary";

class BarButton extends Component {


    render(){
        return (
        <Aux>
            <div className="col-12">
                <div className="row mb-4">
                    <div className="col-12 d-flex justify-content-center">
                        <Button {...this.props.project}/>
                        <Button {...this.props.outsourcing}/>
                    </div>
                </div>
            </div>
        </Aux>
        )
    }
}

export default  BarButton;