import React, { useState } from "react"

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async  function login(ev) {
        ev.preventDefault();
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        })
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