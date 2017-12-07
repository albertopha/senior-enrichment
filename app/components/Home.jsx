import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Campuses from './CampusList';
import Students from './StudentList';
import SingleCampus from './SingleCampus';
import { fetchCampuses, fetchStudents } from '../reducers';
import store from '../store';


export default class Home extends Component {
    componentDidMount(){
        const campusesThunk = fetchCampuses();
        const studentsThunk = fetchStudents();
        store.dispatch(campusesThunk);
        store.dispatch(studentsThunk);
    }
    render(){
        return (
            <Router>
                <div id='home' className="container-fluid">
                    <h1> Welcome to Margaret Hamilton Interplanetary Academy of JavaScript </h1>
                    <ul className="nav nav-tabs">
                        <li><Link to="/campuses">Home</Link></li>
                        <li><Link to="/students">Students</Link></li>
                    </ul>
                    <div className="col-xs-10">
                        <Switch>
                            <Route exact path="/campuses" component={Campuses}/>
                            <Route path="/campuses/:campusId" component={SingleCampus}/>
                            <Route path="/students" component={Students} />
                            <Route component={Campuses}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}