import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';

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
        const allCampuses = this.state.campuses;
        return (
            <div id="campuseslist" className="row">
                {
                    allCampuses.map(campus => {
                        return(
                            <div className="col-xs-4" id="allcampuses" key={campus.id}>
                                <Link className="thumbnail" to={`/campuses/${campus.id}`}>
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