import React from "react"
import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev) {
        
        ev.preventDefault();
        
        const response = await fetch('http://localhost:4000/cadastro', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
        });
        if (response.status === 200) {
            alert('O cadastro foi bem-sucedido!');
          } else {
            alert('O cadastro falhou miseravelmente.');
          }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Cadastro</h1>
            <input 
                type="text" 
                placeholder="Usuário" 
                value={username} 
                onChange={ev => setUsername(ev.target.value)}
            />
            <input 
                type="password" 
                placeholder="Senha" 
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button>Cadastrar</button>
        </form>
    )
}