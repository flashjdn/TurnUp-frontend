import logo from "../../Assets/turnuplogo.svg";
import * as React from "react";
import "./index.css";
import Promovid from "../../Assets/turnUp-v5-promo.mp4";

// Landing page code here

export default function LandingPage() {
    return (
        <div>
            <video loop autoPlay muted className="vid">
                <source src={Promovid} type='video/mp4' />
            </video>
            <img src={logo} alt="turnup logo" className="logo"></img>
            <div className="text-card">
                <h4 className="slogan">Free local events, all you have to do is turn up.</h4>
                <button className="sign-up">Sign Up!</button>
                <p className="about-text">Click here to see what you're signing up for</p>
            </div>
        </div>
    );
}