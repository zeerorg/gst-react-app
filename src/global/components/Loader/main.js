import React from 'react';
import DotComponent from "./Dot";
import '../../../static/css/main.css'

export default class Loader extends React.Component {

    constructor(props) {
        super(props);
        this.numDots = 5;
        if(props.numDots)
            this.numDots = props.numDots;
    }

    render() {
        let dots = [];
        for(let x=0; x<this.numDots; x++){
            dots.push(<DotComponent delay={x} key={x} />)
        }
        return (
            <React.Fragment>
                {dots}
            </React.Fragment>
        )
    }

}