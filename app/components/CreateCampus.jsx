import React, { Component } from 'react';
import store from '../store';
import { postCampus } from '../reducers';

export default class CreateCampus extends Component {
    constructor(){
        super();
        this.state = { ...store.getState(), newName: '', newImgUrl:'',
        newDescription: ''};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleDescriptionChange =this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const newName = event.target.value;
        this.setState({newName});
    }

    handleImgChange(event){
        const newImgUrl = event.target.value;
        this.setState({newImgUrl});
    }

    handleDescriptionChange(event){
        const newDescription = event.target.value;
        this.setState({newDescription});
    }

    handleSubmit(event){
        event.preventDefault();
        const { newName, newImgUrl, newDescription } = this.state;
        if(newImgUrl === '') store.dispatch(postCampus({name: newName, description: newDescription}));
        else {
            store.dispatch(postCampus({name: newName, imageUrl: newImgUrl, description: newDescription}));
        }
        this.setState({newName: ''});
        this.setState({newImgUrl: ''});
        this.setState({newDescription: ''});
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render(){
        return(
            <form id="new-campus-form" onSubmit={this.handleSubmit}>
                <div className="input-group input-group-lg">
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.state.newName}
                        onChange={this.handleNameChange}
                        placeholder="Enter Campus Name"
                    />
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
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">Create Campus</button>
                    </span>
                </div>
        </form>
        )
    }
}