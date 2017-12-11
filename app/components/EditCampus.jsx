import React, { Component } from 'react';
import store from '../store';
import {Link} from 'react-router-dom';
import {  fetchStudent, fetchCampus, putCampus } from '../reducers';
 
export default class EditCampus extends Component{
    constructor(){
        super();
        this.state = { ...store.getState(), newImgUrl:'',
        newDescription: ''};

        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleDescriptionChange =this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    fetchingCampus(campusId) {
        store.dispatch(fetchCampus(campusId));
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        const campusId = this.props.match.params.campusId;
        this.fetchingCampus(campusId);
    }

    handleImgChange(event){
        const newImgUrl = event.target.value;
        this.setState({newImgUrl});
    }

    handleDescriptionChange(event){
        const newDescription = event.target.value;
        this.setState({newDescription});
    }

    handleSelectChange(event){
        const addStudent = event.target.value;
        store.dispatch(fetchStudent(addStudent));
    }

    handleSubmit(event){
        event.preventDefault();
        const campusId = this.props.match.params.campusId;
        
        const { selectedCampus, newName, newImgUrl, newDescription } = this.state;
        let campusToUpdate = {...selectedCampus};
        
        if(newImgUrl !== '') campusToUpdate = {...campusToUpdate, imageUrl:newImgUrl};
        if(newDescription !== '') campusToUpdate = {...campusToUpdate, description: newDescription};

        store.dispatch(putCampus(campusId, campusToUpdate));

        this.setState({newImgUrl: ''});
        this.setState({newDescription: ''});
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render(){
        const { students } = this.state;

        return (
            <form id="update-campus-form" onSubmit={this.handleSubmit}>
            <div className="input-group input-group-lg">
                <input
                className="form-control"
                type="text"
                name="imgurl"
                value={this.state.newImgUrl}
                onChange={this.handleImgChange}
                placeholder="Enter ImgUrl"
                />
                <input
                className="form-control"
                type="text"
                name="description"
                value={this.state.newDescription}
                onChange={this.handleDescriptionChange}
                placeholder="Enter Description"
                />
                <button className="btn btn-default" type="submit">Done</button>
                <button className="btn btn-default" type="submit">
                    <Link to="/campuses/addperson">Add Person</Link>
                </button>
            </div>
    </form>
        )
    }
}