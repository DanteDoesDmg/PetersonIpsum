import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reduxPromise from "redux-promise";
import reducer from "./reducer"

import './main.scss';
import Header from './components/header/header.js';
import {ConnectedApp} from './components/app/configure';
import Footer from './components/footer/footer.js';

const withMiddleware = applyMiddleware(thunk, reduxPromise);
const store = withMiddleware(createStore)(reducer);

ReactDOM.render(<Provider store={store}>
    <Header/>
    <section className='main-width app_section' style={{height:'500px'}}><ConnectedApp/></section>
    <Footer/>
    </Provider>, document.getElementById('page'));