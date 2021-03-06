import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Campuses from './CampusList';
import Students from './StudentList';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import CreateStudent from './CreateStudent';
import CreateCampus from './CreateCampus';
import EditCampus from './EditCampus';
import EditStudent from './EditStudent';
import AddStudent from './AddStudent';
import Footer from './Footer';
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
            <div id="home-main">
                <div id='home' className="container-fluid">
                    <h1> Welcome to Margaret Hamilton Interplanetary Academy of JavaScript </h1>
                    <ul className="nav nav-tabs">
                        <li><Link to="/campuses">Home</Link></li>
                        <li><Link to="/students">Students</Link></li>
                    </ul>
                    <div className="col-xs-10">
                        <Switch>
                            <Route exact path="/campuses" component={Campuses}/>
                            <Route exact path="/create/students" component={CreateStudent} />
                            <Route exact path="/create/campuses" component={CreateCampus} />
                            <Route exact path="/edit/campus/:campusId" component={EditCampus} />
                            <Route exact path="/edit/student/:studentId" component={EditStudent} />                                                        
                            <Route exact path="/campuses/addperson" component={AddStudent} />
                            <Route exact path="/campuses/:campusId" component={SingleCampus}/>
                            <Route exact path="/students" component={Students} />
                            <Route exact path="/students/:studentId" component={SingleStudent} />
                            <Route component={Campuses}/>
                        </Switch>
                    </div>
                </div>
                <Footer />                
            </div>
        )
    }
}