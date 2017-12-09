import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import { fetchCampus, selectCampus } from '../reducers';

export default class SingleCampus extends Component {
    constructor(){
        super();
        this.state = store.getState();
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
        // students.filter(student => student.campusId === selectedCampus.id)
        const { selectedCampus } = this.state;

        return (
        <div className="singlecampus">
            {
                <div>
                    <h3>{ selectedCampus.name }</h3>
                </div>
            }
            {
                
                selectedCampus.students && selectedCampus.students.map(selectedStudent => {
                    return (
                        <div key={selectedStudent.id}>
                            <ul >
                                <li><Link to={`/students/${selectedStudent.id}`}>{ selectedStudent.name }</Link></li>
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