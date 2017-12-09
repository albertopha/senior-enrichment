import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';
import { destroyCampus } from '../reducers';

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

    clickHandler(campusId) {
        store.dispatch(destroyCampus(campusId));
    }

    render(){
        const allCampuses = this.state.campuses;
        return (
            <div id="campuseslist" className="row">
                {
                    allCampuses.map(campus => {
                        return(
                            <div className="col-xs-4" id="allcampuses" key={campus.id}>
                                <div className="thumbnail" >
                                    <Link to={`/campuses/${campus.id}`}>
                                        <img className="campusesImg" src={ campus.imageUrl } />
                                        <div className="caption">
                                            <h5>
                                                <span>{ campus.name }</span>
                                            </h5>
                                            <small>{ campus.description }</small>
                                        </div>
                                    </Link>
                                    <button className="btn btn-default btn-xs" onClick={() => this.clickHandler(campus.id)}>
                                        <span value={campus.id} >Delete</span>
                                    </button>
                                    <button className="btn btn-default btn-xs">
                                        <span>
                                            <Link to={`/edit/campus/${campus.id}`}>Edit</Link>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}