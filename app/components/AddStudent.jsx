import React, { Component } from 'react';
import store from '../store';
import { fetchCampus, fetchStudent, putStudent, putCampus, selectStudent, selectCampus } from '../reducers';

export default class AddStudent extends Component{
    constructor(){
        super();
        this.state = store.getState();
        this.handleSelectCampus = this.handleSelectCampus.bind(this);
        this.handleSelectStudent = this.handleSelectStudent.bind(this);
    }

    handleSelectCampus(event){
        const campusId = event.target.value;
        store.dispatch(fetchCampus(campusId));
    }

    handleSelectStudent(event){
        const studentId = event.target.value;
        store.dispatch(fetchStudent(studentId));
    }

    handleSubmit(event){
        event.preventDefault();
        const { selectedStudent, selectedCampus } = store.getState();

        store.dispatch(putStudent(selectedStudent.id, { campusId: selectedCampus.id }));
        store.dispatch(selectStudent({}));
        store.dispatch(selectCampus({}));
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
            <div className="thumbnail" >
                <form id="add-student-form" onSubmit={this.handleSubmit}>
                    <select
                        className="add-student-select-control"
                        name="add-student"
                        required
                        onChange={this.handleSelectStudent}>
                        {
                            students && students.map(student => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                            ))
                        }
                    </select>
                    <br/><br/><br/><br/>
                    <select
                    className="choose-campus-select-control"
                    name="choose-campus"
                    required
                    onChange={this.handleSelectCampus}>
                    {
                        campuses && campuses.map(campus => (
                        <option key={campus.id} value={campus.id}>{campus.name}</option>
                        ))
                    }
                    </select>
                    <button className="btn btn-default" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
            