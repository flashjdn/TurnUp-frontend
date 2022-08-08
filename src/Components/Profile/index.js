
import Navbar from "../Navbar";
import EventList from "../EventList/index.js";
import FriendsList from "../FriendsList";
import { useState } from "react";
import "./index.css";
import { Button } from "@mui/material";
import { withAuthenticator } from "@aws-amplify/ui-react";
import dummyFriends from "../../lib/dummyFriends";


//COMMENT FOR TESTING PURPOSES

function Profile() {
  const [organisedEvents, setOrganisedEvents] = useState([
    {
      eventName: "Long Gameboy Advance enthusiasts meeting",
      eventDescription: "Come see this long boi.",
      mainDescription:
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.",
      eventImg:
        "https://images.nintendolife.com/c23e0dc684e6f/wide-gba.large.jpg",
      eventTags: ["dog friendly", "lgbt", "clean toilets"],
      eventDistance: "2km away",
      eventTime: "tomorrow",
      rating: 5,
      organiser: "Ben",
      email: "Ben@gmail.com",
      address: "6 Crocs Close",
    },
    {
      eventName: "The Melonator World Tour",
      eventDescription: "Embrace the melon, be the melon.",
      mainDescription:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ",
      eventImg:
        "https://runt-of-the-web.com/wordpress/wp-content/uploads/2016/04/melonator.jpg",
      eventTags: ["dog friendly", "lgbt", "clean toilets", "accessibility"],
      eventDistance: "km away",
      eventTime: "in 2 days",
      rating: 4,
      organiser: "John",
      email: "JohnCena@hotmail.com",
      address: "14 Anis Lane",
    },
    {
      eventName: "The return of the banana",
      eventDescription: "Banana bending workshop included.",
      mainDescription:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth",
      eventImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzY_Ofzzp1UTUR3hEGVPOu3urAajfCg2oRg&usqp=CAU",
      eventTags: ["dog friendly", "lgbt", "workshop"],
      eventDistance: "10km away",
      eventTime: "in 3 days",
      rating: 3,
      organiser: "Jesus",
      email: "jesus.ch@gmail.com",
      address: "10 Hanus Lane",
    },
  ]);

  const [attendedEvents, setAttendedEvents] = useState([
    {
      eventId: 3,
      eventName: "Nick Cage fanclub party",
      eventDescription: "Bring your own Nicholas Cage cardboard cutout.",
      mainDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      eventImg:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dailydot.com%2Fwp-content%2Fuploads%2Fa00%2Fb2%2Fb32e0d39036e2891848a4eed4ee81b72.jpg&f=1&nofb=1",
      eventTags: ["Nick Cage", "lgbt", "meeting"],
      eventDistance: "5km away",
      eventTime: "in 3 days",
      rating: 5,
      organiser: "John",
      email: "John@hotmail.com",
      address: "24 Folders Lane",
      lat: 47.592604513995454,
      lng: 3.53192040563478,
    },
    {
      eventId: 5,
      eventName: "Landfill sightseeing adventure",
      eventDescription: "Don't touch anything. Thieves will be prostituted.",
      mainDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      eventImg:
        "https://thumbs.dreamstime.com/b/pollution-concept-garbage-pile-trash-dump-landfill-birds-flying-around-91233936.jpg",
      eventTags: ["museum", "lgbt", "dog friendly"],
      eventDistance: "2km away",
      eventTime: "in 5 days",
      rating: 5,
      organiser: "Al Cohol DeNaturated",
      email: "a.c.DeNaturated@hotmail.com",
      address: "1 Landfill Alley",
      lat: 52.23300178597648,
      lng: 20.904440714145675,
    },
    {
      eventId: 6,
      eventName: "Seated Gentle Excercise (online)",
      eventDescription: "No violent movement and loud noises please.",
      mainDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      eventImg:
        "https://www.shape.com/thmb/q4wBNX2YPFL86grF-6_kgo7JX5A=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/happybabypose-edit_0-f9f1011e631d4954b4eeea6b43743776.png",
      eventTags: ["excercise", "online", "meeting"],
      eventDistance: "5km away",
      eventTime: "in 3 days",
      rating: 3,
      organiser: "Diana Imogen Crave",
      email: "D.I.Crave@gmail.com",
      address: "online",
      lat: 52.235042924247765,
      lng: 20.886735810419843,
    },
    {
      eventId: 7,
      eventName: "Siberian food cookery school",
      eventDescription:
        "The magical thing about siberian food is that you'll only need a plate",
      mainDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      eventImg:
        "https://i.pinimg.com/originals/8d/b1/64/8db164c57814f594461b7a56b9522eee.jpg",
      eventTags: ["cooking", "accessible", "meeting", "recurring"],
      eventDistance: "5km away",
      eventTime: "in 3 days",
      rating: 1,
      organiser: "Ignacy123",
      email: "I.Lovski@hotmail.com",
      address: "24 Folders Lane",
      lat: 53.821110541196994,
      lng: -3.0136801746060935,
    },
  ]);

  const [user, setUser] = useState({
    id: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5GNLQ5Rq4_uCHZY7yxKiYXxjkkhro_aIbGQ&usqp=CAU",
    username: "Billie",
    email: "billie@microsoft.com",
  });

  const [attendedButtVariant, setAttendedButtVariant] = useState("disabled");
  const [organisedButtVariant, setOrganisedButtVariant] = useState("contained");
  const [listDisplay, setListDisplay] = useState([
    {
      eventId: 7,
      eventName: "Siberian food cookery school",
      eventDescription:
        "The magical thing about siberian food is that you'll only need a plate",
      mainDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      eventImg:
        "https://i.pinimg.com/originals/8d/b1/64/8db164c57814f594461b7a56b9522eee.jpg",
      eventTags: ["cooking", "accessible", "meeting", "recurring"],
      eventDistance: "5km away",
      eventTime: "in 3 days",
      rating: 1,
      organiser: "Ignacy123",
      email: "I.Lovski@hotmail.com",
      address: "24 Folders Lane",
      lat: 53.821110541196994,
      lng: -3.0136801746060935,
    },
  ]);

  const [friendsList, setFriendsList] = useState(undefined);
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
    console.log("I can se you clicking that card. Stop it.");
  }

  //FUNCTION TEMPLATE TO FETCH FRIENDS
  async function FetchFriends() {
    let response = await fetch(`urlurlurl ${user.userId}`);
    let json = await response.json();
    let dataArr = json.data;
    //further in this function we need to have an if statement that checks if the user has any friends to begin with and if not, use setFriendsList to define it as undefined and offer him an add friend button that can be rendered on a card
    //if the user has friends it just renders his list of friends
  }

  return (
    <div>
  <NewEventForm />
       {/* <Navbar></Navbar>
        <div className="profile-container">
        <div className="profile-left-side">
        <div className="profile-info">
            <img
              src={user.image}
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
            <EventList eventsArr={listDisplay} onClick={seeYouClicking} />
          </div>
        </div>

      </div>
      {/* {isClicked ? <NewEventForm onClick={onClickEventForm} /> : null} */}
    </div>

  );
}

export default withAuthenticator(Profile);
