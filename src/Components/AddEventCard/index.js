import "./index.css";
import { useState } from "react";

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
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

import { DocumentScanner } from "@mui/icons-material";

import Places from "../Places/places";


export default function NewEventForm({ onClick }) {
  //Form submission function that reads each input type and adds it to the object to be sent to the server if needed.

  const [value, setValue] = useState("");
  const [tags, setTags] = useState([""]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  console.log(tags);
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
    const newVal = Date().toLocaleString(value)
    setDate(newVal);
  }
  

  function handleTime(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setTime(value);
  }

  let user = {
    username: "Jordan",
    email: "jordan@jordan.com",
    img: "https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg",
  };

  let eventObj = {
    eventName: name,
    eventDescription: summary,
    mainDescription: description,
    date: date,
    time: time,
    organiser: user.username,
    lat: 0,
    lng: 0,
    address: "placeholder",
    img: "url to go here, ask untrodden member",
    email: user.email,
  };

  async function handleSubmission(e) {
    e.preventDefault();
    // ADAPT ALL OF THE BELOW TO MATCH OUR DATA
    document.querySelector(".event-form-container").classList.add("hidden");

    console.log(eventObj);

    //    /Grabs the 6 current tags to idenitfy checked status. happy to help checkbox is also included but
    //is ignored as is handled later.
    // let tagArr = document.getElementsByClassName("tag-checkbox");
    // for (let i = 0; i < tagArr.length - 1; i++) {
    //   if (tagArr[i].checked) {
    //     noteObj.tags = [...noteObj.tags, tagArr[i].name];
    //     newResourceObj.tags = [...newResourceObj.tags, tagArr[i].name];
    //   }
    // }

    // let tagObj = {tagArr}

    //  All elements have been searched, ready to post the data to the server and database.
    const response = await fetch(`https://turnupdb.herokuapp.com/events/all/`, {
      // 
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(eventObj), // body data type must match "Content-Type" header
    });
    console.log("Submission complete");

    return response.json();
  }

  // if (document.getElementById("resources-input").value !== "") {
  //   await fetch(`http://localhost:3001/resource`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newResourceObj),
  //   });
  // }
  // if (document.getElementById("happy-to-help-input").checked) {
  //   await fetch(`http://localhost:3001/help?email=${user.email}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newResourceObj),
  //   });
  // }
  //  Resets form and then reloads page
  // document.querySelector("#notes-input-field").reset();
  // window.location.reload();
  // }
  function hideForm() {
    document.querySelector(".event-form-container").classList.add("hidden");
  }

  function test() {
    console.log(eventObj);
    console.log(document.getElementsByClassName("event-title-box").value);
  }

  return (
    <div>
      <Navbar></Navbar>
      <section className="event-form-container">
        <form
          id="event-input-field"
          onSubmit={(e) => {
            handleSubmission(e);
          }}
        >
          <div className="create-event-card-container">
            <div className="title-sum-desc-container">
              <TextField

                onChange={handleName}

                className="event-title-box"
                sx={{
                  width: "40rem",
                  height: "5rem",
                  background: "var(--supporting-blue)",
                }}
                label="Event title:"
                multiline
                rows={2}
                cols={100}
                defaultValue=""
                id="titleArea"
                required
                inputProps={{ maxLength: "40" }}
              />

              <TextField

                onChange={handleSummary}

                className="event-summary-box"
                sx={{
                  width: "40rem",
                  height: "9.2rem",
                  background: "var(--supporting-blue)",
                }}
                label="Event Summary:"
                multiline
                rows={5}
                cols={100}
                defaultValue=""
                id="summaryArea"
                required
                inputProps={{ maxLength: "80" }}
              />

              <TextField

                onChange={handleDescription}

                className="event-description-box"
                sx={{
                  width: "40rem",
                  height: "15rem",
                  background: "var(--supporting-blue)",
                }}
                label="Event Description:"
                multiline
                rows={9}
                cols={100}
                defaultValue=""
                id="decriptionArea"
                required
              />

              <Box>
                <Box className="tag-area-box">
                  <FormControl>
                    <FormLabel>Event Tags</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        label="Pet-Friendly"
                        control={<Checkbox value="pet-friendly" />}
                        onChange={handleTagChange}
                      />
                      <FormControlLabel
                        label="18+"
                        control={<Checkbox value="18+" />}
                        onChange={handleTagChange}
                      />
                      <FormControlLabel
                        label="Outdoors"
                        control={<Checkbox value="outdoors" />}
                        onChange={handleTagChange}
                      />
                      <FormControlLabel
                        label="Parking"
                        control={<Checkbox value="parking" />}
                        onChange={handleTagChange}
                      />
                      <FormControlLabel
                        label="Family-Friendly"
                        control={<Checkbox value="family-friendly" />}
                        onChange={handleTagChange}
                      />
                    </FormGroup>
                  </FormControl>
                </Box>
              </Box>
            </div>

            <div className="date-time-container">
              <div className="date">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    orientation="landscape"
                    openTo="day"
                    value={date}
                    inputFormat="dd.MM.yyyy"
                    onChange={(newDate) => {
                      setDate(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>

              <div className="time">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticTimePicker
                    // ampmInClock="false"
                    orientation="landscape"
                    openTo="hours"
                    inputFormat="hh:mm"
                    value={time}
                    onChange={(newTime) => {
                      setTime(newTime);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <Button
            sx={{ top: "3rem", left: "3rem" }}
            variant="contained"
            type="submit"
            onClick={test}
          >
            Submit
          </Button>
        </form>
        <a href="/profile">
          <Button
            sx={{ bottom: "26rem", right: "4.5vh" }}
            id="exit-button-form"
            variant="contained"
            aria-label="Cancel and hide current event submission form"
            onClick={onClick}
          >
            X
          </Button>
        </a>
      </section>

      <Places />

    </div>
  );
}

