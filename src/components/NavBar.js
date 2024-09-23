import { React, useState } from "react";
import './NavBar.css';
import DropDown from "./DropDown";



import logo from "../images/logo.png"
import countries from "../Countries.json";


const NavBar = (props) => {
    const [value, setValue] = useState(null)
    return (
        <div className="topnav">
            <a className="navbar-brand" href="/"><img src={logo} alt="logo"/></a>
            <div className="navline">
                <a>|</a>
            </div>
            <a href="/#cases">Statistics</a>
            <div className="navline">
            <a>|</a>
            </div>
            <a href="/#graphs">Graphs</a>
            <div className="searchBar">
                <DropDown
                prompt='Search country...'
                options={countries}
                id='code'
                label='name'
                value={value}
                onChange={(val) => setValue(val)}
                />
    
            </div>
            


        </div>

    )
}

export default NavBar;