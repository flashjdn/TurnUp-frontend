import Navbar from "../Navbar";
import EventList from "../EventList/index.js";
import FriendsList from "../FriendsList";
import { useEffect, useState } from "react";
import "./index.css";
import { Button, LinearProgress } from "@mui/material";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Mask from "../Mask";
import "../Mask/styles.css";
import { Auth } from "aws-amplify";
import { attendedEventsArr, organisedEventsArr } from "../Constants/constants";

function Profile() {
  const cors = {
    mode: "cors",
  };

  const getUser = async (email) => {
    console.log("this is the email ", email);
    if (email !== undefined && email !== "") {
      const res = await fetch(
        `https://turnupdb.herokuapp.com/events/userem/${email}`,
        cors
      );
      const data = await res.json();
      console.log("this is the data: ", data);
      setUser(data[0]);
    }
  };
  async function getUserFromAuth() {
    let userInfo = await Auth.currentUserInfo();
    console.log("user info: ", userInfo);
    getUser(userInfo.attributes.email);
  }

  const [user, setUser] = useState({
    userid: 0,
    img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wired.com%2Fwp-content%2Fuploads%2F2016%2F03%2FMIT-Web-Loading.jpg&f=1&nofb=1",
    username: "loading...",
    email: "loading...",
  });

  const [profileUserLocation, setProfileUserLocation] = useState([
    { lat: null, lng: null },
  ]);

  const [listDisplay, setListDisplay] = useState([]);

  const [friends, setFriends] = useState([{ friend: 1 }]);

  const [organisedEvents, setOrganisedEvents] = useState(organisedEventsArr);
  const [attendedEvents, setAttendedEvents] = useState(attendedEventsArr);

  async function getOrgansiedAttendedAndFriendsEvents(userId) {
    console.log("help me i am sad", userId);
    const organisedRes = await fetch(
      `https://turnupdb.herokuapp.com/events/event-org/${userId}`,
      cors
    );
    const attendedRes = await fetch(
      `https://turnupdb.herokuapp.com/events/att/${userId}`,
      cors
    );
    const friendRes = await fetch(
      `https://turnupdb.herokuapp.com/events/friends/${userId}`,
      cors
    );
    const organisedResData = await organisedRes.json();
    const attendedResData = await attendedRes.json();
    const friendResData = await friendRes.json();

    setOrganisedEvents(organisedResData);
    setAttendedEvents(attendedResData);
    setListDisplay(attendedResData);
    setFriends(friendResData);
  }
  const [toggleVariant, setToggleVariant] = useState(false);

  function toggleEvents(bool) {
    console.log("event toggled", bool);
    if (bool === true) {
      setToggleVariant(false);
      setListDisplay(organisedEvents);
    } else {
      setToggleVariant(true);
      setListDisplay(attendedEvents);
    }
  }

  function loadUserPosition() {
    console.log("start of function for location");
    navigator.geolocation.getCurrentPosition(
      positionFound /*positionNotFound*/
    );
    async function positionFound(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setProfileUserLocation({ lat: lat, lng: lng });

      function positionNotFound(err) {
        console.log(err);
      }
    }
  }
  // window.addEventListener("load", () => {
  //   navigator.geolocation.getCurrentPosition(positionFound, positionNotFound);
  //   async function positionFound(position) {
  //     const lng = position.coords.longitude;
  //     const lat = position.coords.latitude;
  //     setProfileUserLocation({ lat: lat, lng: lng });
  //   }
  //   function positionNotFound(err) {
  //     console.log(err);
  //   }
  // });

  useEffect(() => {
    getOrgansiedAttendedAndFriendsEvents(user.userid);
    loadUserPosition();
    // setListDisplay(organisedEvents);
  }, [user]);

  useEffect(() => {
    toggleEvents(false);
    getUserFromAuth();
    getUser("");
  }, []);

  // further in this function we need to have an if statement that checks if the user has any friends to begin with and if not, use setFriendsList to define it as undefined and offer him an add friend button that can be rendered on a card
  // if the user has friends it just renders his list of friends

  return (
    <>
      <Mask loaded={user.userid === 0 ? false : true} />
      {/* <Mask loaded={profileUserLocation.lat ? true : false} /> */}
      <div>
        <Navbar></Navbar>
        <div className="profile-container">
          <div className="profile-left-side">
            <div className="profile-info">
              <img
                src={user.img}
                alt="users profile"
                className="profile-pic"
              ></img>
              <p>
                <strong className="strong">Username:</strong> {user.username}
              </p>
              <p>
                <strong className="strong">Email:</strong> {user.email}
              </p>
              <a
                className="create-button"
                href="/create-event"
                style={{ textDecoration: "none" }}
              >
                <Button
                  className="create-button"
                  sx={{ backgroundColor: "#fbb02d", color: "black" }}
                  variant="contained"
                >
                  Create Event
                </Button>
              </a>
            </div>
            <div className="friends-list">
              <FriendsList friendsArr={friends} />
            </div>
          </div>
          <div className="profile-right-side">
            {toggleVariant ? (
              <h3>Attending Events:</h3>
            ) : (
              <h3>Organised Events:</h3>
            )}

            <div className="crea-atten-buttons">
              <Button
                variant={toggleVariant ? "disabled" : "contained"}
                onClick={() => toggleEvents(false)}
              >
                Attending Events
              </Button>
              <Button
                variant={toggleVariant ? "contained" : "disabled"}
                onClick={() => toggleEvents(true)}
              >
                Organised Events
              </Button>
            </div>
            <div className="unleash-the-events">
              {profileUserLocation.lat ? (
                <EventList
                  eventsArr={listDisplay}
                  userLoc={profileUserLocation}
                />
              ) : (
                <LinearProgress
                  sx={{
                    selfAlign: "center",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthenticator(Profile);
