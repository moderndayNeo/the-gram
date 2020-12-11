import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginLink() {
    return (
        <section className="login-link">
            <p>Have an account?</p>
            <Link to="/login">Log In</Link>
        </section>
    )
}
