import React, { Component } from "react";
import ReactDOM from "react-dom";
import './main.scss';
import Header from './components/header/header.js';
import App from './components/app/app.js';
import Footer from './components/footer/footer.js'





ReactDOM.render(<>
    <Header/>
    <section className='main-width' style={{height:'500px'}}><App/></section>
    <Footer/>
    </>, document.getElementById('app'));