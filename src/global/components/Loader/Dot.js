import React from 'react';

export default class DotComponent extends React.Component {
    render() {
        let delay=(0.2*this.props.delay) + "s";
        return (
            <img src={require('../../../static/image/circle.png')}
                 className="myobj"
                 style={{animationDelay: delay}}
                 alt=""
                 />
        )
    }
}