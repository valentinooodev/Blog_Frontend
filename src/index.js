import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/pages/header'
import Footer from './components/pages/footer'
import Register from './components/pages/auth/register'
import Login from "./components/pages/auth/login";
import Logout from "./components/pages/auth/logout"
import Single from './components/pages/posts/single';
import Search from './components/pages/posts/search';
import Admin from './Admin'
import Create from './components/pages/admin/create'
import Edit from './components/pages/admin/edit'
import Delete from './components/pages/admin/delete'



const routing = (
    <BrowserRouter>
        <React.StrictMode>
            <Header/>
            <Routes>
                <Route exact path="/" element={<App/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/admin/create" element={<Create/>}/>
                <Route path="/admin/edit/:id" element={<Edit/>}/>
                <Route path="/admin/delete/:id" element={<Delete/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/post/:slug" element={<Single/>} />
                <Route path="/search" element={<Search/>} />
            </Routes>
            <Footer/>
        </React.StrictMode>
    </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
