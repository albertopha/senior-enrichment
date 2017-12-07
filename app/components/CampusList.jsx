import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';

//1. fetch all the classes
//2. attach them to the buttons/links

export default class CampusList extends Component {
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
        const allCampuses = this.state.campuses;
        return (
            <div id="campuseslist" className="row">
                {
                    allCampuses.map(campus => {
                        return(
                            <div className="col-xs-4" key={campus.id}>
                                <Link className="thumbnail" to="/campuses">
                                    <img className="campusesImg" src={ campus.imageUrl } />
                                    <div className="caption">
                                        <h5>
                                            <span>{ campus.name }</span>
                                        </h5>
                                        <small>{ campus.description } songs</small>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}