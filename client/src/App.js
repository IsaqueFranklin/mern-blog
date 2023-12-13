import React from 'react';
import './App.css';
import Post from "./Components/Post";
import Header from './Components/Header';
import {Routes, Route} from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PublicarPost from './Pages/PublicarPost';
import PostPage from './Pages/PostPage';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/cadastro' element={<RegisterPage />} />
          <Route path='/publicar' element={<PublicarPost />} />
          <Route path='/post/:id' element={<PostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;