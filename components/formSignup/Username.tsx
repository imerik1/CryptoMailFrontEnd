import React from 'react';

const Username: React.FC = () => {
    return (
        <input
            type='text'
            id='username'
            placeholder='Digite seu nome de usuário'
            required
        />
    );
};

export default Username;
