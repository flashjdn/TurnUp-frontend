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
import {
  attendedEventsArr,
  organisedEventsArr,
} from "../../lib/Constants/constants";
import { createContext } from "react";

export const UserContext = createContext();

function Profile() {
  const cors = {
    mode: "cors",
  };

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
  const [listType, setListType] = useState("");

  const [friends, setFriends] = useState([{ friend: 1 }]);

  const [organisedEvents, setOrganisedEvents] = useState(organisedEventsArr);
  const [attendedEvents, setAttendedEvents] = useState(attendedEventsArr);
  const [toggleVariant, setToggleVariant] = useState(false);

  useEffect(() => {
    getOrgansiedAttendedAndFriendsEvents(user.userid);
    loadUserPosition();
  }, [user]);

  useEffect(() => {
    toggleEvents(false);
    getUserFromAuth();
    getUser("");
  }, []);

  const getUser = async (email) => {
    if (email !== undefined && email !== "") {
      const res = await fetch(
        `https://turnupdb.herokuapp.com/events/userem/${email}`,
        cors
      );
      const data = await res.json();
      setUser(data[0]);
    }
  };
  async function getUserFromAuth() {
    let userInfo = await Auth.currentUserInfo();
    getUser(userInfo.attributes.email);
  }

  async function getOrgansiedAttendedAndFriendsEvents(userId) {
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
    setListType("attended");
    setFriends(friendResData);
  }

  function toggleEvents(bool) {
    if (bool === true) {
      setToggleVariant(false);
      setListDisplay(organisedEvents);
      setListType("organised");
    } else {
      setToggleVariant(true);
      setListDisplay(attendedEvents);
      setListType("attended");
    }
  }

  function loadUserPosition() {
    navigator.geolocation.getCurrentPosition(positionFound);
    async function positionFound(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setProfileUserLocation({ lat: lat, lng: lng });

      function positionNotFound(err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <Mask loaded={user.userid === 0 ? false : true} />
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
              <div className="friend-search-bar">
                <input
                  className="friend-search-input"
                  placeholder="Add friend"
                  size="small"
                ></input>
                <Button variant="contained" sx={{ backgroundColor: "#006390" }}>
                  Add
                </Button>
              </div>
              <FriendsList friendsArr={friends} />
            </div>
          </div>
          <div className="profile-right-side">
            {toggleVariant ? (
              <h3>Events you're going to:</h3>
            ) : (
              <h3>Events you organise:</h3>
            )}

            <div className="crea-atten-buttons">
              <Button
                variant={toggleVariant ? "disabled" : "contained"}
                onClick={() => toggleEvents(false)}
                sx={toggleVariant ? {} : { backgroundColor: "#006390" }}
              >
                Attending Events
              </Button>
              <Button
                variant={toggleVariant ? "contained" : "disabled"}
                onClick={() => toggleEvents(true)}
                sx={toggleVariant ? { backgroundColor: "#006390" } : {}}
              >
                Organised Events
              </Button>
            </div>
            <div className="unleash-the-events">
              {profileUserLocation.lat ? (
                <EventList
                  eventsArr={listDisplay}
                  userLoc={profileUserLocation}
                  whatType={listType}
                  user={user}
                />
              ) : (
                <div className="loading">
                  <LinearProgress
                    sx={{
                      selfAlign: "center",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthenticator(Profile);
