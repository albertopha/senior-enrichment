import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';
import { destroyStudent } from '../reducers';

export default class StudentList extends Component {
    constructor(){
        super();
        this.state = store.getState();
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler (studentId) {
        store.dispatch(destroyStudent(studentId));
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render(){
        const { students, campuses } = this.state;
        return (
            <div id="studentslist">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Campus</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(student => (
                                <tr key={student.id}>
                                    <td>{ student.id }</td>
                                    <td>{ student.name }</td>
                                    <td>{ campuses.find(campus => campus.id === student.campusId).name }</td>
                                    <td>
                                    <button className="btn btn-default btn-xs" onClick={() => this.clickHandler(student.id)}>
                                        <span value={student.id} >Delete</span>
                                    </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}