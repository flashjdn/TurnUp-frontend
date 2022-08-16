import logo from "../../Assets/turnuplogo.svg";
import * as React from "react";
import "./styles.css";
import Promovid from "../../Assets/turnUp-v5-promo.mp4";
import Drawer from "../Drawer";
import { Button } from "@mui/material";
import HomeMask from "../HomeMask";
import poster from "../../Assets/poster.jpg"

// Landing page code here

const buttonStyle = {
  "&:hover": {
    backgroundColor: "#a37327",
    boxShadow: "0 5px #666",
    transform: "translateY(10px)",
  },

  ":before": { borderBottomColor: "white" },
  // underline when selected
  ":after": { borderBottomColor: "white" },

  marginTop: "2rem",
  fontSize: "clamp(1.5rem, 3vw, 4rem)",
  /* text-shadow: 2px 2px black; */
  display: "inlineBlock",
  padding: "10px 15px",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  backgroundColor: "#fbb13c",
  // borderStyle: "solid black",
  borderBottom: "none",
  borderRadius: "15px",
  boxShadow: "0 12px #999",
};

export default function LandingPage({ handleOpen }) {
  return (
    <>
    <div className="container">
      <div className="homepage">
        <video loop autoPlay muted className="vid" poster={poster}>
          <source src={Promovid} type="video/mp4"  />
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
            {/* <Button variant="contained" sx={buttonStyle}>
            Get Started
          </Button> */}
          </a>
        </div>
        <Drawer />
      </div>
      </div>
    </>
  );
}
