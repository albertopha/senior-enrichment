import React, { Component } from 'react';
import store from '../store';
import { postStudents } from '../reducers';

export default class CreateStudent extends Component {
    constructor(){
        super();
        this.state = { ...store.getState(), newFNameEntry: '', newLNameEntry:'',
    newEmailEntry: '', newGpaEntry: -1, newCampusID: 1};

        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.handleLNameChange = this.handleLNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGpaChange = this.handleGpaChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFNameChange(event) {
        const val = event.target.value;
        this.setState({newFNameEntry: val});
    }

    handleLNameChange(event) {
        const val = event.target.value;
        this.setState({newLNameEntry: val});
    }

    handleEmailChange(event) {
        const val = event.target.value;
        this.setState({newEmailEntry: val});
    }

    handleGpaChange(event) {
        const val = event.target.value;
        this.setState({newGpaEntry: val});
    }

    handleSelectChange(event){
        const val = event.target.value;
        this.setState({newCampusID: val});
    }

    handleSubmit(event){
        event.preventDefault();
        const {newFNameEntry, newLNameEntry, newEmailEntry, newGpaEntry, newCampusID} = this.state;
        store.dispatch(postStudents({firstName: newFNameEntry, lastName: newLNameEntry,
            email: newEmailEntry, gpa: newGpaEntry, campusId: newCampusID}));
        this.setState({newFNameEntry: ''});
        this.setState({newLNameEntry: ''});
        this.setState({newEmailEntry: ''});
        this.setState({newGpaEntry: -1});
        this.setState({newCampusID: 1});
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render(){
        const { campuses } = this.state;
        return (
            <form id="new-student-form" onSubmit={this.handleSubmit}>
                <div className="input-group input-group-lg">
                    <input
                        className="form-control"
                        type="text"
                        name="firstname"
                        value={this.state.newFNameEntry}
                        onChange={this.handleFNameChange}
                        placeholder="Enter Your First Name"
                    />
                    <input
                    className="form-control"
                    type="text"
                    name="lastname"
                    value={this.state.newLNameEntry}
                    onChange={this.handleLNameChange}
                    placeholder="Enter Your Last Name"
                    />
                    <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={this.state.newEmailEntry}
                    onChange={this.handleEmailChange}
                    placeholder="Enter Your Email"
                    />
                    <input
                    className="form-control"
                    type="number"
                    name="gpa"
                    value={this.state.newGpaEntry}
                    onChange={this.handleGpaChange}
                    placeholder="Enter Your GPA"
                    />
                    <select
                    className="form-control"
                    name="campuses"
                    required
                    onChange={this.handleSelectChange}>
                    {
                        campuses && campuses.map(campus => (
                        <option key={campus.id} value={campus.id}>{campus.name}</option>
                        ))
                    }
                    </select>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">Create Student</button>
                    </span>
                </div>
            </form>
        )
    }
}