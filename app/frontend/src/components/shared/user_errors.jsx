import React from 'react';
import { useSelector } from 'react-redux';

export default function UserErrors() {
    const userErrors = useSelector(state => state.errors.users);

    return userErrors.map((error, idx) => (
        <li key={idx} className="session-error-message">{error}.</li>
    ));
}
