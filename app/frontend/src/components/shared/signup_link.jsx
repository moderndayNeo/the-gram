import React from 'react'
import { Link } from 'react-router-dom'

export default function SignupLink() {
    return (
        <section className="login-link">
            <p>Don't have an account?</p>
            <Link to="/signup">Sign up</Link>
        </section>
    )
}
