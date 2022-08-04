import "./index.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function NewEventForm() {
  //Form submission function that reads each input type and adds it to the object to be sent to the server if needed.
  const [eventValue, setEventValue] = useState("");


  const [day, setDay] = useState("");

  const handleChange = (e) => {
    setDay(e.target.value);
  };

  // function handleDropdownChange(e) {
  //     setEventValue(e.target.value)
  // }
  // async function handleSubmission(e) {
  //     e.preventDefault()
  //     // ADAPT ALL OF THE BELOW TO MATCH OUR DATA 
  //     document.querySelector(".notes-form-container").classList.add("hidden");
  //     let noteObj = {
  //       tags: [],
  //       week: document.getElementById("week-input").value,
  //       day: document.getElementById("day-input").value,
  //       note: document.getElementById("noteArea").value,
  //     };
  //     let newResourceObj = {
  //       topicID: eventValue,
  //       tags: [],
  //       link: document.getElementById("resources-input").value,
  //       rating: 3,
  //     };
  // //    /Grabs the 6 current tags to idenitfy checked status. happy to help checkbox is also included but
  //     //is ignored as is handled later.
  //     let tagArr = document.getElementsByClassName("tag-checkbox");
  //     for (let i = 0; i < tagArr.length - 1; i++) {
  //       if (tagArr[i].checked) {
  //         noteObj.tags = [...noteObj.tags, tagArr[i].name];
  //         newResourceObj.tags = [...newResourceObj.tags, tagArr[i].name];
  //       }
  //     }
  //All elements have been searched, ready to post the data to the server and database.
  // await fetch(`http://localhost:3001/notes?email=${user.email}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(noteObj),
  // });
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
  //Resets form and then reloads page
  //   document.querySelector("#notes-input-field").reset();
  //   window.location.reload();
  // }
  function hideForm() {
    document.querySelector(".notes-form-container").classList.add("hidden");
  }



  return (
    <section className="event-form-container">
      <form
        id="event-input-field"
        onSubmit={(e) => {
          // handleSubmission(e);
        }}
      >
        <div id="left-col-NoteForm">
          <div id="day-field">
            <Select
              label="Day:"
              variant="outlined"
              size="small"
              inputProps={{ min: "1", max: "5", step: "1" }}
              sx={{ width: "10vh", bottom: "1rem", backgroundColor: "white" }}
              id="day-input"
              type="input"
              value={day}
              onChange={handleChange}
            >
              <MenuItem value={1}>Monday</MenuItem>
              <MenuItem value={2}>Tuesday</MenuItem>
              <MenuItem value={3}>Wednesday</MenuItem>
              <MenuItem value={4}>Thursday</MenuItem>
              <MenuItem value={5}>Friday</MenuItem>
              <MenuItem value={6}>Saturday</MenuItem>
              <MenuItem value={7}>Sunday</MenuItem>
            </Select >

            <TextField
              variant="outlined"
              size="small"
              inputProps={{ min: "1", max: "5", step: "1" }}
              sx={{ width: "11vh", bottom: "1rem", backgroundColor: "white" }}
              id="date-input"
              type="date"
              required
            ></TextField>
            <TextField
              variant="outlined"
              size="small"
              inputProps={{ min: "1", max: "5", step: "1" }}
              sx={{ width: "10vh", bottom: "1rem", backgroundColor: "white" }}
              id="time-input"
              type="time"
              required
            ></TextField>
          </div>
          <div id="accessibility-field">
            <label htmlFor="accessibility-input" className="accessibility-label-form">
              Accessibility:
            </label>
          </div>
          <div id="tags-field">
            <div className="tag-row">
              <div className="tag-unit">
                <input
                  type="checkbox"
                  id="video-tag"
                  className="tag-checkbox"
                  name="video"
                ></input>
                <label htmlFor="video-tag" className="check-label">
                  Pet Friendly
                </label>
              </div>
              <div className="tag-unit">
                <input
                  type="checkbox"
                  id="article-tag"
                  className="tag-checkbox"
                  name="article"
                ></input>
                <label htmlFor="article-tag" className="check-label">
                  Wheelchair Access
                </label>
              </div>
              <div className="tag-unit">
              </div>
            </div>
            <div className="tag-row">
              <div className="tag-unit">
                <input
                  type="checkbox"
                  id="html-tag"
                  className="tag-checkbox"
                  name="html"
                ></input>
                <label htmlFor="tag1-tag" className="check-label">
                  18+
                </label>
              </div>
              <div className="tag-unit">
                <input
                  type="checkbox"
                  id="css-tag"
                  className="tag-checkbox"
                  name="css"
                ></input>
                <label htmlFor="tag2-tag" className="check-label">
                  Parking
                </label>
              </div>
              <div className="tag-unit">
                <input
                  type="checkbox"
                  id="js-tag"
                  className="tag-checkbox"
                  name="javascript"
                ></input>
                <label htmlFor="tag3-tag" className="check-label">
                  Family-Friendly
                </label>
              </div>
            </div>
          </div>
          <div id="event-field">
            <label htmlFor="event-input" id="event-label">
              Event Description
            </label>
          </div>
        </div>
        <div id="right-col-EventForm">
          <TextField
            sx={{ width: "50rem", height: "27rem", background: "var(--supporting-blue)", }}
            label="Event Description:"
            multiline
            rows={20}
            cols={100}
            defaultValue=""
            id="decriptionArea"
          />
          <div>
          </div>
          <Button
            sx={{ top: "6rem" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
      <Button
        sx={{ bottom: "25rem", left: "12.5vh" }}
        id="exit-button-form"
        variant="contained"
        aria-label="Cancel and hide current event submission form"
        onClick={hideForm}
      >
        X
      </Button>
    </section>
  );
}

// test