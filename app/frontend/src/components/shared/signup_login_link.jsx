import React from 'react'
import { Link } from 'react-router-dom'

export default function SignupLoginLink({ text, linkText, href }) {
    return (
        <section className="signup-login-link">
            <p>{text}</p>
            <Link to={href}>{linkText}</Link>
        </section>
    )
}


