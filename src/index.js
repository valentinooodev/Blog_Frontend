import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import Register from './components/auth/register'
import Login from "./components/auth/login";
import Logout from "./components/auth/logout"
import Single from './components/posts/single';
import Search from './components/posts/search';
import Admin from './Admin'
import Create from './components/admin/create'
import Edit from './components/admin/edit'
import Delete from './components/admin/delete'



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
