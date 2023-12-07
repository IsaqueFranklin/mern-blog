import React, { useState } from "react"
import {Navigate} from 'react-router-dom';

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async  function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        } else {
            alert('Usuário e senha inválidos.')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
                    placeholder="Usuário" 
                    value={username} 
                    onChange={(item) => setUsername(item.target.value)}/>
            <input type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(item) => setPassword(item.target.value)}/>
            <button>Login</button>
        </form>
    );
}