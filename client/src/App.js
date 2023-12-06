import './App.css';
import Post from "./Components/Post";
import Header from './Components/Header';
import {Routes, Route} from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/ResgisterPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/cadastro' element={<RegisterPage />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;