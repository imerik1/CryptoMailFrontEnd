import React from 'react';

const Email: React.FC = () => {
    return (
        <input
            type='email'
            id='email'
            placeholder='Digite seu e-mail'
            required
        />
    );
};

export default Email;
