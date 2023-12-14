import React, { useState, useEffect, useContext } from "react"
import {Link} from 'react-router-dom';
import { UserContext } from "../UserContext";

export default function Header() {

    const {setUserInfo, userInfo} = useContext(UserContext);

    //useEffect fo fetch the credentials from the server 
    
    useEffect(() => {
       fetch('http://localhost:4000/perfil', {
        credentials: 'include',
       }).then(response => {
        response.json().then(userInfo => {
            setUserInfo(userInfo);
        })
       })
    }, [])

    function logout(){
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST'
        })
        setUserInfo(nul)
    }

    const username = userInfo?.username;

    return (
        <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
        {username && (
            <>
                <span>Olá, {username}</span>
                <Link to="/publicar">Publicar novo post</Link>
                <Link onClick={logout}>Logout</Link>
            </>
        )}
        {!username && (
            <>
                <Link to="/login">Login</Link>
                <Link to="/cadastro">Cadastro</Link>
            </>
        )}
        </nav>
      </header>
    )
}