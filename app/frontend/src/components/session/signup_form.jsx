import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            bio: '',
            email: '',
            name: ''
            // username: 'omar',
            // password: 'thewire',
            // bio: 'great actor',
            // email: 'omar@example.com',
            // name: 'Omar'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.createNewUser(this.state)
            .then(() => this.props.history.push('/'));
    }

    updateValue(type) {
        return e => (
            this.setState({
                [type]: e.target.value
            })
        );
    }


    render() {
        let { errors } = this.props;
        return (
            <div>
                {errors.map((error, idx) => (<li key={idx}>{error}</li>))}

                <h2>Sign Up</h2>
                <form>
                    <input type="text" onChange={this.updateValue("username")} value={this.state.username} placeholder="username" />
                    <br />
                    <input type="password" onChange={this.updateValue("password")} value={this.state.password} placeholder="password" />

                    <br />
                    <input type="text" onChange={this.updateValue("name")} value={this.state.name} placeholder="name" />
                    <br />
                    <input type="text" onChange={this.updateValue("bio")} value={this.state.bio} placeholder="bio" />
                    <br />
                    <input type="text" onChange={this.updateValue("email")} value={this.state.email} placeholder="email" />
                    <br />

                    <input type="submit" value="Sign Up" onClick={this.handleSubmit} />
                    <br />
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);