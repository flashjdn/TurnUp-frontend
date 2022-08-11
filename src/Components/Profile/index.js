import Navbar from "../Navbar";
import EventList from "../EventList/index.js";
import FriendsList from "../FriendsList";
import { useEffect, useState } from "react";
import "./index.css";
import { Button } from "@mui/material";
import { withAuthenticator } from "@aws-amplify/ui-react";
import dummyFriends from "../../lib/dummyFriends";

//COMMENT FOR TESTING PURPOSES

//HAS TO BE FETCHED FROM THE BACKEND WITH THE HELP OF AUTHENTICATOR, FOR NOW HARDCODED:

function Profile() {
  //state that holds info about the user
  const userId = 4;
  const [user, setUser] = useState({
    userid: 3,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5GNLQ5Rq4_uCHZY7yxKiYXxjkkhro_aIbGQ&usqp=CAU",
    username: "Billie",
    email: "billie@microsoft.com",
  });

  const [profileUserLocation, setProfileUserLocation] = useState([]);

  const [attendedButtVariant, setAttendedButtVariant] = useState("disabled");
  const [organisedButtVariant, setOrganisedButtVariant] = useState("contained");

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
  const getUser = async (id) => {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/user/${id}`,
      {
        mode: "cors",
      }
    );
    const data = await res.json();
    setUser(data[0]);
  };
  useEffect(() => {
    getUser(userId);
  }, []);

  useEffect(() => {
    getOrganisedEvents(user.userid);
    getAttendedEvents(user.userid);

    console.log("Org in useffect: ", organisedEvents);
    console.log("Att in useffect ", attendedEvents);
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
      `https://turnupdb.herokuapp.com/events/event-org/2`,
      {
        mode: "cors",
      }
    );
    console.log("res fetched", res);
    const data = await res.json();
    console.log("organised fetched", data);
    setOrganisedEvents(data);
  };

  const getAttendedEvents = async (attendeeId) => {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/att/${attendeeId}`,
      {
        mode: "cors",
      }
    );
    console.log("attended fetched");
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
  // async function FetchFriends() {
  //   let response = await fetch(`urlurlurl ${user.userid}`);
  //   let json = await response.json();
  //   let dataArr = json.data;
  //further in this function we need to have an if statement that checks if the user has any friends to begin with and if not, use setFriendsList to define it as undefined and offer him an add friend button that can be rendered on a card
  //if the user has friends it just renders his list of friends
  //}

  return (
    <div>
      <Navbar></Navbar>
      <div className="profile-container">
        <div className="profile-left-side">
          <div className="profile-info">
            {console.log("loaded user: ", user)}
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
            <a href="/create-event">
              <Button variant="contained">Create Event</Button>
            </a>
          </div>
          <div className="friends-list">
            <FriendsList friendsArr={dummyFriends} />
          </div>
        </div>
        <div className="profile-right-side">
          {organisedButtVariant === "contained" ? (
            <h2>Events you attend:</h2>
          ) : (
            <h2>Events you organise:</h2>
          )}

          <div className="crea-atten-buttons">
            <Button variant={attendedButtVariant} onClick={changeToAttended}>
              Events you attend
            </Button>
            <Button variant={organisedButtVariant} onClick={changeToOrganised}>
              Events you organise
            </Button>
          </div>
          <div className="unleash-the-events">
            {console.log("attendedEvents at the moment: ", attendedEvents)}
            {console.log("organisedEvents at the moment: ", organisedEvents)}
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
  );
}

export default withAuthenticator(Profile);
