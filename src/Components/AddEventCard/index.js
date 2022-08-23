import "./index.css";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
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
import Places from "../Places/places";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

function NewEventForm(signOut, user) {
  //states keeping track of each aspect of the created event:
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

  const navigate = useNavigate();

  useEffect(() => {
    getUserFromAuth();
  });

  useEffect(() => {
    getUserFromDB(authUser);
  }, [authUser]);

  //this use effect prompts the page to send tags to the database only after it receives the id of the newly created event
  useEffect(() => {
    sendTags(createdEventId);
  }, [createdEventId]);

  //The functions bellow retrieve user info frim Cognito auth and from turnUp Data Base
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

  //The functions bellow track user inputs and change the states above accordingly.
  const handleTagChange = (e) => {
    const index = tags.indexOf(e.target.value);
    if (index === -1) {
      setTags([...tags, e.target.value]);
    } else {
      setTags(tags.filter((tag) => tag !== e.target.value));
    }
  };

  function handleName(event) {
    const value = event.target.value;
    setName(value);
  }

  function handleDescription(event) {
    const value = event.target.value;
    setDescription(value);
  }
  function handleSummary(event) {
    const value = event.target.value;
    setSummary(value);
  }

  function handleUrl(event) {
    const value = event.target.value;
    setUrl(value);
  }

  //the functions below are responsible for sending the new event and tags to relevant tables in the back end
  async function sendTags(eventId) {
    if (eventId !== null) {
      for (let i = 0; i < tags.length; i++) {
        await fetch("https://turnupdb.herokuapp.com/events/eventTags", {
          method: "POST",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({
            eventid: eventId,
            tagid: Number(tags[i]),
          }),
        });
      }
      navigate("/profile");
    }
  }

  async function handleSubmission(e) {
    e.preventDefault();

    //date comes in dd/mm/yyyy format and it has to be rearranged with the code below
    const [day, month, year] = date.toLocaleDateString().split("/");
    const adjustedDate = [year, month, day].join("-");
    const adjustedTime = time.toLocaleTimeString();

    let eventObj = {
      eventName: name,
      eventDescription: summary,
      mainDescription: description,
      date: adjustedDate,
      time: adjustedTime,
      organiser: userDB.userid,
      lat: coord.lat,
      lng: coord.lng,
      address: coord.address,
      img: url,
      email: userDB.email,
      rating: 3,
    };

    const response = await fetch(`https://turnupdb.herokuapp.com/events/all`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(eventObj),
    });
    const newEventData = await response.json();
    setCreatedEventId(newEventData.payload[0].eventid);
  }

  return (
    <div className="behind-form">
      <Navbar></Navbar>
      <div className="form-container">
        <div className="outer-div">
          <h2>New Event</h2>
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
              }}
              label="Event Description"
              multiline
              rows={5}
              defaultValue=""
              id="decriptionArea"
              required
            />
          </div>
          <div className="top-right">
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
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
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
