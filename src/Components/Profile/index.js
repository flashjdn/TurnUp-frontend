import Navbar from "../Navbar";
import EventList from "../EventList/index.js";
import FriendsList from "../FriendsList";
import { useEffect, useState } from "react";
import "./index.css";
import { Button } from "@mui/material";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Mask from "../Mask";
import "../Mask/styles.css";
import { Auth } from "aws-amplify";


//COMMENT FOR TESTING PURPOSES

//HAS TO BE FETCHED FROM THE BACKEND WITH THE HELP OF AUTHENTICATOR, FOR NOW HARDCODED:

function Profile() {
  //state that holds info about the user

  const [userEmail, setUserEmail] = useState("");
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
    { lat: 1, lng: 1 },
  ]);

  const [attendedButtVariant, setAttendedButtVariant] = useState("disabled");
  const [organisedButtVariant, setOrganisedButtVariant] = useState("contained");
  const [friends, setFriends] = useState([{ friend: 1 }]);

  const [organisedEvents, setOrganisedEvents] = useState([
    {
      eventid: 1,
      eventname: "The Melonator World Tour",
      eventdescription: "Embrace the melon, be the melon.",
      mainDescription:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ",
      img: "https://runt-of-the-web.com/wordpress/wp-content/uploads/2016/04/melonator.jpg",
      eventtags: ["dog friendly", "lgbt", "clean toilets", "accessibility"],
      date: "2022-08-11",
      time: "18:00:00",
      rating: 4,
      organiser: 2,
      email: "sarah@gmail.com",
      address: "23 Holly Lane",
      lat: 47.602508712234524,
      lng: 3.5412595468827868,
    },
  ]);
  const [attendedEvents, setAttendedEvents] = useState([
    {
      eventId: 5,
      eventName: "Landfill sightseeing adventure",
      eventDescription: "Don't touch anything. Thieves will be prostituted.",
      mainDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      img: "https://thumbs.dreamstime.com/b/pollution-concept-garbage-pile-trash-dump-landfill-birds-flying-around-91233936.jpg",
      eventTags: ["museum", "lgbt", "dog friendly"],
      date: "2022-08-09",
      time: "09:00:00",
      rating: 5,
      organiser: 3,
      email: "a.c.DeNaturated@hotmail.com",
      address: "1 Landfill Alley",
      lat: 52.23300178597648,
      lng: 20.904440714145675,
    },
  ]);
  const [listDisplay, setListDisplay] = useState([]);
  //function that fetches all the user information provided it has the userId, if we want to retrieve the info by email or username, we need to change it in the back end too.
  const getUser = async (email) => {
    console.log("this is the email ", email);
    if (email !== undefined && email !== "") {
      const res = await fetch(
        `https://turnupdb.herokuapp.com/events/userem/${email}`,
        {
          mode: "cors",
        }
      );
      const data = await res.json();
      console.log("this is the data: ", data);
      setUser(data[0]);
    }
  };
  useEffect(() => {
    getUserFromAuth();
    getUser(userEmail);
  }, []);
  useEffect(() => {
    getOrganisedEvents(user.userid);
    getAttendedEvents(user.userid);
    getFriends(user.userid);
  }, [user]);

  window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(positionFound, positionNotFound);
    async function positionFound(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setProfileUserLocation({ lat: lat, lng: lng });
    }
    function positionNotFound(err) {
      console.log(err);
    }
  });

  const getOrganisedEvents = async (organiserId) => {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/event-org/${organiserId}`,
      {
        mode: "cors",
      }
    );
    const data = await res.json();
    setOrganisedEvents(data);
  };

  const getAttendedEvents = async (attendeeId) => {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/att/${attendeeId}`,
      {
        mode: "cors",
      }
    );
    const data = await res.json();
    setAttendedEvents(data);
  };

  function changeToAttended() {
    setListDisplay(attendedEvents);
    setAttendedButtVariant("disabled");
    setOrganisedButtVariant("contained");
  }

  function changeToOrganised() {
    setListDisplay(organisedEvents);
    setOrganisedButtVariant("disabled");
    setAttendedButtVariant("contained");
  }

  function seeYouClicking() {
    console.log("I can see you clicking that card. Stop it.");
  }

  //FUNCTION TEMPLATE TO FETCH FRIENDS
  async function getFriends(userId) {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/friends/${userId}`,
      {
        mode: "cors",
      }
    );
    const data = await res.json();
    // further in this function we need to have an if statement that checks if the user has any friends to begin with and if not, use setFriendsList to define it as undefined and offer him an add friend button that can be rendered on a card
    // if the user has friends it just renders his list of friends
    setFriends(data);
  }

  return (


    <>
      {/* <Mask loaded={(user.userid === 4) ?  true : false} /> */}
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
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <a href="/create-event" style={{ textDecoration: 'none' }}>
                <Button variant="contained">Create Event</Button>
              </a>
            </div>
            <div className="friends-list">
              <FriendsList friendsArr={friends} />
            </div>
          </div>
          <div className="profile-right-side">
            {organisedButtVariant === "contained" ? (
              <h2>Attending Events:</h2>
            ) : (
              <h2>Organised Events:</h2>

            )}

            <div className="crea-atten-buttons">
              <Button variant={attendedButtVariant} onClick={changeToAttended}>
                Attending Events
              </Button>
              <Button
                variant={organisedButtVariant}
                onClick={changeToOrganised}
              >
                Organised Events
              </Button>
            </div>
            <div className="unleash-the-events">
              {profileUserLocation === [] ? null : (
                <EventList
                  eventsArr={listDisplay}
                  onClick={seeYouClicking}
                  userLoc={profileUserLocation}
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
