'use client';

import { useState, useEffect } from 'react';
import InputPassword from '../InputPassword/InputPassword';

interface ComfirmedPasswordProp {
    setComfirmedPassword: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function InputComfirmedPassword({setComfirmedPassword}: ComfirmedPasswordProp) {
    const [passwordValue, setPasswordValue] = useState<string | null>(null);
    const [comfirmedPasswordValue, setComfirmedPasswordValue] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (passwordValue == comfirmedPasswordValue) {
            setError(false);
            setComfirmedPassword(passwordValue);
        } else {
            setError(true);
            setComfirmedPassword(null);
        }
    }, [passwordValue, comfirmedPasswordValue]);

    return (
        <>
            <InputPassword
                setPasswordValue={setPasswordValue}
                labelText='Придумайте пароль:'
                duration='0.6s'
                showError={true}
            />
            <InputPassword
                setPasswordValue={setComfirmedPasswordValue}
                labelText='Повторите пароль:'
                duration='0.8s'
                showError={false}
                externalError={error}
            >
                Ошибка: пароли не совпадают.
            </InputPassword>
        </>
    );
}