import "./index.css";
import { useState, useEffect } from "react";

import Navbar from "../Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useNavigate } from "react-router-dom";
import CreateEventTitle from "../CreateEventTitle/index.js";

import { CodeRounded, DocumentScanner } from "@mui/icons-material";

import Places from "../Places/places";
import ImageUpload from "../ImageUpload";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

function NewEventForm(signOut, user) {
  //Form submission function that reads each input type and adds it to the object to be sent to the server if needed.

  const [tags, setTags] = useState([""]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [coord, setCoord] = useState({ lat: 0, lng: 0 });
  const [url, setUrl] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [createdEventId, setCreatedEventId] = useState(null);
  const [userDB, setUserDB] = useState({ userid: 0 });
  // console.log("these are the coords", coord);

  const navigate = useNavigate();
  // console.log(tags);

  useEffect(() => {
    getUserFromAuth();
  });

  useEffect(() => {
    sendTags(createdEventId);
  }, [createdEventId]);

  useEffect(() => {
    getUserFromDB(authUser);
  }, [authUser]);

  async function getUserFromAuth() {
    let userInfo = await Auth.currentUserInfo();
    setAuthUser(userInfo.attributes.email);
  }

  async function getUserFromDB(email) {
    if (authUser !== null) {
      const res = await fetch(
        `https://turnupdb.herokuapp.com/events/userem/${email}`,
        {
          mode: "cors",
        }
      );
      const data = await res.json();
      setUserDB(data[0]);
    }
  }

  const handleTagChange = (e) => {
    const index = tags.indexOf(e.target.value);
    if (index === -1) {
      setTags([...tags, e.target.value]);
    } else {
      setTags(tags.filter((tag) => tag !== e.target.value));
    }
  };

  function handleName(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setName(value);
  }

  function handleDescription(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setDescription(value);
  }

  function handleSummary(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setSummary(value);
  }

  function handleDate(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    const newVal = Date().toLocaleString(value);
    setDate(newVal);
  }

  function handleUrl(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setUrl(value);
  }
  async function sendTags(eventId) {
    //Tag creation
    if (eventId !== null) {
      for (let i = 0; i < tags.length; i++) {
        await fetch("https://turnupdb.herokuapp.com/events/eventTags", {
          //
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({
            eventid: eventId,
            tagid: Number(tags[i]),
          }), // body data type must match "Content-Type" header
        });
      }
      navigate("/profile");
    }
  }

  async function handleSubmission(e) {
    e.preventDefault();

    const [day, month, year] = date.toLocaleDateString().split("/");

    const adjustedDate = [year, month, day].join("-");
    const adjustedTime = time.toLocaleTimeString();
    //  All elements have been searched, ready to post the data to the server and database.

    let eventObj = 
    // {
    //   eventName: name,
    //   eventDescription: summary,
    //   mainDescription: description,
    //   date: adjustedDate, //date.toLocaleDateString(),
    //   time: adjustedTime, //time.toLocaleTimeString(),
    //   organiser: userDB.userid,
    //   lat: coord.lat,
    //   lng: coord.lng,
    //   address: coord.address,
    //   img: url,
    //   email: userDB.email,
    // };
    {
      eventName: name,
      eventDescription: summary,
      mainDescription: description,
      date: adjustedDate, //date.toLocaleDateString(),
      time: adjustedTime, //time.toLocaleTimeString(),
      organiser: userDB.userid,
      lat: coord.lat,
      lng: coord.lng,
      address: coord.address,
      img: url,
      email: userDB.email,
    };
    console.log("eventObj: ", eventObj);

    const response = await fetch(`https://turnupdb.herokuapp.com/events/all`, {
      //
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(eventObj), // body data type must match "Content-Type" header
    });
    const newEventData = await response.json();
    setCreatedEventId(newEventData.payload[0].eventid);
  }

  return (
    <div className="behind-form">
      <Navbar></Navbar>
      <div className="form-container">
        <div className="outer-div">
          <h1>New Event</h1>

          {/* <CreateEventTitle /> */}
        </div>
        <Places setCoordFunction={setCoord} />
        <div className="add-event-card-body">
          <div className="top-left">
            <TextField
              onChange={handleName}
              className="event-title-box"
              fullWidth
              sx={{
                width: "90%",
                // background: "var(--supporting-blue)",
                // margin: "auto",
                // display: "inline-flex",
              }}
              label="Event title"
              multiline
              rows={2}
              defaultValue=""
              id="titleArea"
              required
              inputProps={{ maxLength: "40" }}
            />

            <TextField
              onChange={handleSummary}
              className="event-summary-box"
              fullWidth
              sx={{
                width: "90%",
                // height: "9.2rem",
                // background: "var(--supporting-blue)",
              }}
              label="Event Summary"
              multiline
              rows={3}
              defaultValue=""
              id="summaryArea"
              required
              inputProps={{ maxLength: "80" }}
            />

            <TextField
              onChange={handleDescription}
              className="event-description-box"
              fullWidth
              sx={{
                width: "90%",
                // background: "var(--supporting-blue)",
              }}
              label="Event Description"
              multiline
              rows={5}
              defaultValue=""
              id="decriptionArea"
              required
            />
            {/* <div className="buffer"> </div> */}
          </div>
          <div className="top-right">
            {/* <Places setCoordFunction={setCoord} /> */}
            <div className="date-time-container">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Event date"
                  orientation="portrait"
                  openTo="day"
                  value={date}
                  inputFormat="dd.MM.yyyy"
                  onChange={(newDate) => {
                    setDate(newDate);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ backgroundColor: "white" }} {...params} />
                  )}
                  // sx={{
                  //   width: "auto",
                  //   height: "auto",
                  // }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  // ampmInClock="false"
                  label="Start time"
                  orientation="portrait"
                  openTo="hours"
                  inputFormat="hh:mm"
                  value={time}
                  onChange={(newTime) => {
                    setTime(newTime);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ backgroundColor: "white" }} {...params} />
                  )}
                  // sx={{
                  //   width: "auto",
                  //   height: "auto",
                  // }}
                />
              </LocalizationProvider>
            </div>
            <div className="tag-area-box">
              <FormControl>
                <FormLabel>Event Tags</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    label="Pet-Friendly"
                    control={<Checkbox value={1} />}
                    onChange={handleTagChange}
                  />
                  <FormControlLabel
                    label="18+"
                    control={<Checkbox value={2} />}
                    onChange={handleTagChange}
                  />
                  <FormControlLabel
                    label="Outdoors"
                    control={<Checkbox value={3} />}
                    onChange={handleTagChange}
                  />
                  <FormControlLabel
                    label="Parking"
                    control={<Checkbox value={4} />}
                    onChange={handleTagChange}
                  />
                  <FormControlLabel
                    label="Family-Friendly"
                    control={<Checkbox value={5} />}
                    onChange={handleTagChange}
                  />
                  <FormControlLabel
                    label="Accessible"
                    control={<Checkbox value={6} />}
                    onChange={handleTagChange}
                  />
                  <FormControlLabel
                    label="NightLife"
                    control={<Checkbox value={7} />}
                    onChange={handleTagChange}
                  />
                </FormGroup>
              </FormControl>
            </div>
            <TextField onChange={handleUrl} label="Image URL" />
            <div className="buttons">
              <Button
                sx={{
                  margin: "auto",
                }}
                variant="contained"
                size="large"
                color="error"
                type="submit"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  margin: "auto",
                }}
                variant="contained"
                type="submit"
                size="large"
                onClick={handleSubmission}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(NewEventForm);
