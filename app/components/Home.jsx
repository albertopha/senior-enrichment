import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Campuses from './CampusList';
import { fetchCampuses, fetchStudents } from '../reducers';
import store from '../store';


export default class Home extends Component {
    componentDidMount(){
        const campuses = fetchCampuses();
        const students = fetchStudents();
        store.dispatch(campuses);
        store.dispatch(students);
    }
    render(){
        return (
            <Router>
                <div id='home' className="container-fluid">
                    <h1> Welcome to Margaret Hamilton Interplanetary Academy of JavaScript </h1>
                    <ul className="nav nav-tabs">
                        <li><Link to="LINK_TO_FILL">Home</Link></li>
                        <li><Link to="LINK_TO_FILL">Students</Link></li>
                    </ul>
                    <div className="col-xs-10">
                        <Switch>
                            <Route component={Campuses}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}