import React, {Component} from "react";
import LogoImg from '../../images/mapsOfMeaning.png';

function Logo() {

    return <a className='logo' href='https://www.jordanbpeterson.com/'><img src='./images/mapsOfMeaning.png'/></a>

}
function Bookmark() {
    return <div className='header_bookmark'> </div>

}

class Header extends Component {

    render() {
        return (
            <header className='main-width'>
                <div className="header_flex">
                    <div className='header_logoArea'><Logo /><h1>Jordan B. Peterson IPSUM</h1><Bookmark/></div>
                        <div className='header_nav_container'><ul className='header_nav'>
                            <li><a href='#'>IPSUM</a></li>
                            <li><a href='#'>IMAGES</a></li>
                            <li><a href='#'>ABOUT</a></li>
                        </ul></div>
                </div>
            </header>
        )
    }
}

export default Header