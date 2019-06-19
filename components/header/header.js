import React, {Component} from "react";


function Logo() {

    return <a className='logo' href='https://www.jordanbpeterson.com/'><img src='../../images/mapIcon.webp'/></a>

}
function Bookmark() {
    return <div className='header_bookmark'> </div>

}

class Header extends Component {

    render() {
        return (
            <header className='main-width'>
                <div className="header_flex">
                    <div className='header_logoArea'><Logo /><p>Peterson IPSUM</p><Bookmark/></div>
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