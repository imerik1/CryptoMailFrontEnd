import React from 'react';

const Password: React.FC = () => {
    return (
        <section>
            <input
                type='password'
                id='password'
                placeholder='Digite sua senha'
                required
            />
            <input
                type='password'
                id='confirmPassword'
                placeholder='Confirme sua senha'
                required
            />
        </section>
    );
};

export default Password;
