import logo from "../../Assets/turnuplogo.svg";
import * as React from "react";
import "./styles.css";
import Promovid from "../../Assets/turnUp-v5-promo.mp4";
import Drawer from "../Drawer";
import poster from "../../Assets/poster.jpg";

export default function LandingPage({ handleOpen }) {
  return (
    <>
      <div className="container">
        <div className="homepage">
          <video loop autoPlay muted className="vid" poster={poster}>
            <source src={Promovid} type="video/mp4" />
          </video>
          <div className="content">
            <img
              width={"40%"}
              height={"auto"}
              src={logo}
              alt="turnup logo"
              className="logo"
            ></img>
            <h4 className="slogan">
              Free local events, all you have to do is turn up.
            </h4>
            <a href="/explore">
              <button className="sign-up">Get Started</button>
            </a>
          </div>
          <Drawer />
        </div>
      </div>
    </>
  );
}
