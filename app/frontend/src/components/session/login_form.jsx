import React, { Component } from 'react';

export default class Loginform extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.updateValue = this.updateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateValue(type) {
        return e => {
            this.setState({ [type]: e.currentTarget.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.loginUser(this.state)
            .then(() => console.log('User successfully logged in'));
    }


    render() {
        return (
            <div>
                <form>
                    <input type="text" value={this.state.username} onChange={this.updateValue("username")} placeholder="username" />
                    <input type="password" value={this.state.password} onChange={this.updateValue("password")} placeholder="password" />

                    <input type="submit" onClick={this.handleSubmit} value="Login" />
                </form>

            </div>
        );
    }
}
