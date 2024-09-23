import React from "react";
import './Footer.css';
import logo from "../images/logo.png";

const Footer = () => {
    return (
        <div className="site-footer">
            <div className="container">
                <div className="row">


                    <div className="col-xs-6 col-md-3">
                        <a className="footer-logo" href="/"><img src={logo}/></a>
                    </div>

                    <div className="col-sm-12 col-md-6">
                        <h6>About</h6>
                        <p className="text-justify">This website was created as a project for VUT FIT subject WAP - Internet Applications.
                            The purpose of the website is to display different statistics and informations about world covid-19 pandemic.</p>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/#cases">Statistics</a></li>
                            <li><a href="/#graphs">Graphs</a></li>
                        </ul>
                    </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">Created by Marek Hrivňák & Nikolas Masica
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">

                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Footer;
