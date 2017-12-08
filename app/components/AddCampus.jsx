import React, { Component } from 'react';
import store from '../store';

export default class AddCampus extends Component {
    constructor(){
        super();
        this.state = store.getState();
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render(){
        return(
            <h1>Hello Campus</h1>
        )
    }
}