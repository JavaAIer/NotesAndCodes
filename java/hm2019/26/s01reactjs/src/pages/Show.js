import React from 'react';
import HelloWorld from './HelloWorld';

class Show extends React.Component {
    render() {
        return (<HelloWorld name="张三">学习记录</HelloWorld>);
    }
}

export default Show;