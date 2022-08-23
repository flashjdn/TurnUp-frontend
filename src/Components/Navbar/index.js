import "./styles.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@mui/material";
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

  function redirectExplore() {
    window.location.href = "/explore";
  }
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
          size="medium"
        >
          PROFILE
        </Button>
        <Button
          className="navbutton"
          onClick={redirectExplore}
          sx={{
            color: "white",
            fontFamily: '"Raleway", sans-serif',
            fontWeight: "Bold",
          }}
          size="medium"
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
          size="medium"
        >
          SIGN OUT
        </Button>
      </nav>
      <a id="menu-icon" href="#" className="menu-icon" onClick={onMenuClick}>
        <MenuIcon></MenuIcon>
      </a>
    </div>
  );
}
export default Navbar;
