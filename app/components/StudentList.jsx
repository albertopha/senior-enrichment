import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';

export default class StudentList extends Component {
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
        console.log('checking the state', this.state);
        const allStudents = this.state.students;
        return (
            <div id="studentslist">
                <h1> Hi I'm a student </h1>
            </div>
        )
    }
}