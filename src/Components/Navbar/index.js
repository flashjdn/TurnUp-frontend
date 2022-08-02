import "./index.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../../aws-exports";
// import { loadLocation } from "../Explore";
Amplify.configure(awsExports);
Amplify.configure(awsconfig);

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

  async function signOut() {
    try {
      console.log("signing out")
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <div className="page-header">
      <nav id="navigation-bar" className="nav-bar">
        <button className="navbutton">
          <a href="/profile"> PROFILE </a>
        </button>
        <button className="navbutton">
          <a href="/explore"> EXPLORE </a>
        </button>
        <button className="navbutton" onClick={signOut}>
          <a href="/"> SIGN OUT </a>
        </button>
      </nav>
      <a id="menu-icon" className="menu-icon" onClick={onMenuClick}>
        <MenuIcon></MenuIcon>
      </a>
    </div>
  );
}
//<i id="menu-icon" className="material-icons"> </i>
export default Navbar;
