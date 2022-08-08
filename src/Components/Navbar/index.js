import "./index.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Amplify, Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@mui/material";
// import awsExports from "../../aws-exports";
// import { loadLocation } from "../Explore";
// Amplify.configure(awsExports);
// Amplify.configure(awsconfig);
import logo from "../../Assets/turnuplogo.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  function onMenuClick() {
    console.log("executing");
    var navbar = document.getElementById("navigation-bar");
    var responsive_class_name = "responsive";
    navbar.classList.toggle(responsive_class_name);
    console.log(navbar.classList);
  }

  /* const navToggle = document.querySelector(".nav-toggle");
  //const navLinks = document.querySelectorAll(".nav__link");
  navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
    });
  });*/

  // function redirectExplore() {
  //   window.location.href = "/explore";
  // }
  const navigate = useNavigate();

  async function signOut() {
    try {
      console.log("signing out");
      await Auth.signOut().then(navigate("/"));
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <div className="page-header">
      <div className="logo-background">
        <img src={logo} alt="turnup logo" className="navbar-logo"></img>
      </div>
      <nav id="navigation-bar" className="nav-bar">
        <Button
          className="navbutton"
          onClick={() => navigate("/profile")}
          sx={{
            color: "white",
            fontFamily: '"Raleway", sans-serif',
            fontWeight: "Bold",
          }}
          size="large"
        >
          PROFILE
        </Button>
        <Button
          className="navbutton"
          onClick={() => navigate("/explore")}
          sx={{
            color: "white",
            fontFamily: '"Raleway", sans-serif',
            fontWeight: "Bold",
          }}
          size="large"
        >
          EXPLORE
        </Button>

        <Button
          className="navbutton"
          onClick={signOut}
          sx={{
            color: "white",
            fontFamily: '"Raleway", sans-serif',
            fontWeight: "Bold",
          }}
          size="large"
        >
          SIGN OUT
        </Button>
      </nav>
      <a id="menu-icon" className="menu-icon" onClick={onMenuClick}>
        <MenuIcon></MenuIcon>
      </a>
    </div>
  );
}
//<i id="menu-icon" className="material-icons"> </i>
export default Navbar;
