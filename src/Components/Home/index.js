import logo from "../../Assets/turnuplogo.svg";
import * as React from "react";
import "./index.css";

// Landing page code here

export default function LandingPage() {
  return (
    <div>
      {/* <video></video> */}
      <img src={logo} alt="turnup logo"></img>
      <p>Free local events, all you have to do is turn up.</p>
      <button className="sign-up">Sign Up!</button>
      <p>Click here to see what you're signing up for</p>
    </div>
  );
}
