import React from 'react';
import { Link } from 'react-router-dom';

export default function DevelopmentModal({feature}) {
    return (
        <div className="development-modal">
            <div className="container">
                <p>{feature} is currently in development</p>
                <Link to="/">Go Back</Link>
            </div>
        </div>
    );
}
