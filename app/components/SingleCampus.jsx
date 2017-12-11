import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import { fetchCampus, putStudent } from '../reducers';

export default class SingleCampus extends Component {
    constructor(){
        super();
        this.state = store.getState();
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler (studentId, campusId) {
        const { selectedCampus } = this.state;
        store.dispatch(putStudent(studentId, {campusId: null}));
    }

    fetchingCampus(campusId) {
        store.dispatch(fetchCampus(campusId));
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));        
        const campusId = this.props.match.params.campusId;
        this.fetchingCampus(campusId);
    }

    componentWillReceiveProps(nextProps){
        const nextCampusId = nextProps.match.params.campusId;
        const currentCampusId = this.props.match.params.campusId;
        if(nextCampusId !== currentCampusId){
            this.fetchingCampus(nextCampusId);
        }
    }

    componentWillUnmount(){
        this.unsubscribe();
    }
    
    render(){
        const { selectedCampus, students } = this.state;
        const studentsFromCampus = students.filter(student => student.campusId === selectedCampus.id);

        return (
        <div className="singlecampus">
            {
                <div>
                    <h3>{ selectedCampus.name }</h3>
                </div>
            }
            {
                
                studentsFromCampus && studentsFromCampus.map(selectedStudent => {
                    return (
                        <div key={selectedStudent.id}>
                            <ul >
                                <li><Link to={`/students/${selectedStudent.id}`}>{ selectedStudent.name }</Link>
                                    <button className="btn btn-default btn-xs" onClick={() => this.clickHandler(selectedStudent.id, selectedCampus.id)}>
                                        <span value={selectedStudent.id} >remove</span>
                                    </button>
                                </li>
                                
                            </ul>
                        </div>
                    )
                })
            }
            <br/>
            <p> Description: </p>
            <small>{selectedCampus.description}</small>            
        </div>
        )
    }
};