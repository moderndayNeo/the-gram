import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
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
        return (
            <div>
                <h2>Sign Up</h2>
                <form>
                    <input type="text" onChange={this.updateValue("username")} value={this.state.username} placeholder="username" />
                    <input type="password" onChange={this.updateValue("password")} value={this.state.password} placeholder="password" />

                    <input type="submit" value="Sign Up" onClick={this.handleSubmit} />
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);