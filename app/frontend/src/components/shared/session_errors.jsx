import React from 'react';
import { useSelector } from 'react-redux';

export default function SessionErrors() {
    const sessionErrors = useSelector(state => state.errors.session);

    return sessionErrors.map((error, idx) => (
        <li key={idx} className="session-error-message">{error}.</li>
    ));
}
