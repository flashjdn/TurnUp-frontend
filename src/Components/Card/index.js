import "./index.css";
import logo from "../../Assets/turnuplogo.svg";
import Image from "../../Assets/road-to-milford-new-zealand-800w.jpeg";

export const Card = () => {
  return (
    <>
      <div className="event-background">
        <h1>Placeholder</h1>
      </div>
      <div>
        <img src={logo} alt="turnup logo" className="event-logo"></img>
        <input type="text" placeholder="Search..." className="input"></input>
      </div>
      <div className="card-list">
        <h1 className="card-one">
          <img src={Image} alt="card-one-pic" className="card-one-image"></img>
          New Zealand White Water Outdoor Adventure
          <p className="card-one-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut </p>
        </h1>
        <h1 className="card-two">
          <img src={Image} alt="card-two-pic" className="card-two-image"></img>
          New Zealand White Water Outdoor Adventure
          <p className="card-two-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut </p>
        </h1>
        <h1 className="card-three">
          <img src={Image} alt="card-three-pic" className="card-three-image"></img>
          New Zealand White Water Outdoor Adventure
          <p className="card-three-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut </p>
        </h1>
      </div>
    </>
  );
};
