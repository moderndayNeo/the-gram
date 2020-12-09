import React, { Component } from 'react';

export default class SessionForm extends Component {
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

        // dispatch request to sign in user on the backend
        // then attach current_user's ID to redux store
        // then redirect
    }

    updateValue(type) {
        return e => (
            this.setState({
                [type]: e.currentTarget.value
            })
        );
    }


    render() {
        return (
            <div>

                <form>
                    <input type="text" onChange={this.updateValue("username")} value={this.state.username} placeholder="username" />
                    <input type="password" onChange={this.updateValue("password")} value={this.state.password} placeholder="password" />

                    <input type="submit" value="Sign In" onClick={this.handleSubmit} />
                </form>
            </div>
        );
    }
}
