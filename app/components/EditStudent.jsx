import React, { Component } from 'react';
import store from '../store';
import { putStudent, fetchStudent } from '../reducers';

export default class EditStudent extends Component {
    constructor(){
        super();
        this.state = { ...store.getState(), newFNameEntry: '', newLNameEntry:'',
    newEmailEntry: '', newGpaEntry: -1};

        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.handleLNameChange = this.handleLNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGpaChange = this.handleGpaChange.bind(this);
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

    handleSubmit(event){
        event.preventDefault();
        const studentId = this.props.match.params.studentId;
        let newUpdate = {};
        const {newFNameEntry, newLNameEntry, newEmailEntry, newGpaEntry} = this.state;

        if(newFNameEntry !== '') newUpdate = {firstName: newFNameEntry};
        if(newLNameEntry !== '') newUpdate = { ...newUpdate, lastName: newLNameEntry};
        if(newEmailEntry !== '') newUpdate = { ...newUpdate, email: newEmailEntry};
        if(newGpaEntry !== -1) newUpdate = { ...newUpdate, gpa:newGpaEntry};

        store.dispatch(putStudent(studentId, newUpdate));
        this.setState({newFNameEntry: ''});
        this.setState({newLNameEntry: ''});
        this.setState({newEmailEntry: ''});
        this.setState({newGpaEntry: -1});
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render(){
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
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">Done</button>
                    </span>
                </div>
            </form>
        )
    }
}