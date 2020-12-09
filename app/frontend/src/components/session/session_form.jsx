import React, { Component } from 'react'

export default class SessionForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                
                <form>

                    <input type="submit" value="Sign In" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}
