import React from 'react';

class HelloWorld extends React.Component {
    render() {
        return (
            <div>Hello World，name = {this.props.name}，内容={this.props.children}</div>
        );
    }
}

export default HelloWorld;