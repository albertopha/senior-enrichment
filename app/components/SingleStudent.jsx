import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';
import { fetchStudent } from '../reducers';

export default class singleStudent extends Component {
    constructor(){
        super();
        this.state = store.getState();
    }

    fetchingStudent(studentId) {
        store.dispatch(fetchStudent(studentId));
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        const studentId = this.props.match.params.studentId;
        this.fetchingStudent(studentId);
    }

    componentWillReceiveProps(nextProps){
        const nextStudentId = nextProps.match.params.studentId;
        const currentStudentId = this.props.match.params.studentId;
        if(nextStudentId !== currentStudentId){
            this.fetchingStudent(nextStudentId);
        }
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render(){        
        const { selectedStudent, campuses } = this.state;
        let correspondCampus = campuses.find(eachCampus => eachCampus.id === selectedStudent.campusId);
        
        return (
            <div id="singleStudent">
                {
                    <div>
                        <h3>{ selectedStudent.name }</h3>
                        <li>Email:  { selectedStudent.email }</li>
                        <li>GPA:  { selectedStudent.gpa }</li><br/>
                    </div>
                }
                <h4>Campus</h4>
                {
                    correspondCampus && 
                    <Link to={`/campuses/${correspondCampus.id}`}>{correspondCampus.name}</Link>
                }
            </div>
        )
    }
}