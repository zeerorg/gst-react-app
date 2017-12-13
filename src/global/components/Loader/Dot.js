import React from 'react';

export default class DotComponent extends React.Component {
    render() {
        let delay=(0.1*this.props.delay) + "s";
        return (
            <img src="http://www.clker.com/cliparts/p/1/9/C/O/f/black-dot-hi.png" 
                 className="myobj"
                 style={{animationDelay: delay}}
                 alt=""
                 >
            </img>
        )
    }
}