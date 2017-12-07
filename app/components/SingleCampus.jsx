import React, { Component } from 'react';
import store from '../store';
import { fetchCampus } from '../reducers';

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
        const { students, selectedCampus } = this.state;

        return (
        <div className="singlecampus">
            {
                <div>
                    <h3>{ selectedCampus.name }</h3>
                </div>
            }
            {
                students.filter(student => student.campusId === selectedCampus.id)
                .map(selectedStudent => {
                    return (
                        <ul key={selectedStudent.id}>
                            <li>{ selectedStudent.name }</li>
                        </ul>
                    )
                })
            }
        </div>
        )
    }
};