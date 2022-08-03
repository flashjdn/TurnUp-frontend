import "./index.css";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";


export default function NewEventForm() {
    //Form submission function that reads each input type and adds it to the object to be sent to the server if needed.
 const [eventValue, setEventValue] = useState("");

function handleDropdownChange(e) {
    setEventValue(e.target.value)
}
async function handleSubmission(e) {
    e.preventDefault()
    // ADAPT ALL OF THE BELOW TO MATCH OUR DATA 
    document.querySelector(".notes-form-container").classList.add("hidden");
    let noteObj = {
      tags: [],
      week: document.getElementById("week-input").value,
      day: document.getElementById("day-input").value,
      note: document.getElementById("noteArea").value,
    };
    let newResourceObj = {
      topicID: eventValue,
      tags: [],
      link: document.getElementById("resources-input").value,
      rating: 3,
    };
//    /Grabs the 6 current tags to idenitfy checked status. happy to help checkbox is also included but
    //is ignored as is handled later.
    let tagArr = document.getElementsByClassName("tag-checkbox");
    for (let i = 0; i < tagArr.length - 1; i++) {
      if (tagArr[i].checked) {
        noteObj.tags = [...noteObj.tags, tagArr[i].name];
        newResourceObj.tags = [...newResourceObj.tags, tagArr[i].name];
      }
    }
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
    document.querySelector("#notes-input-field").reset();
    window.location.reload();
  }
  function hideForm() {
    document.querySelector(".notes-form-container").classList.add("hidden");
  }

return (
    <div className="notes-form-container hidden">
      <section className="form-container">
        <form
          id="notes-input-field"
          onSubmit={(e) => {
            handleSubmission(e);
          }}
        >
          <div id="left-col-NoteForm">
            <div id="week-field">
              <TextField
                label="Week:"
                variant="outlined"
                inputProps={{ min: "1", max: "16", step: "1" }}
                size="small"
                sx={{ width: "20%", backgroundColor: "white" }}
                type="number"
                id="week-input"
                required
              ></TextField>
            </div>
            <div id="day-field">
              <TextField
                label="Day:"
                variant="outlined"
                size="small"
                inputProps={{ min: "1", max: "5", step: "1" }}
                sx={{ width: "20%", backgroundColor: "white" }}
                id="day-input"
                type="number"
                min={1}
                max={5}
                step={1}
                required
              ></TextField>
            </div>
            <div id="topic-field">
              <label htmlFor="topic-input" className="generic-label-form">
                Topic:
              </label>
              <Select
                id="topic"
                sx={{ width: 150, backgroundColor: "white" }}
                onChange={handleDropdownChange}
                value={eventValue}
              >
                <MenuItem value={1}>HTML</MenuItem>
                <MenuItem value={4}>Express</MenuItem>
                <MenuItem value={5}>SQL</MenuItem>
                <MenuItem value={2}>CSS</MenuItem>
                <MenuItem value={3}>Javascript</MenuItem>
                <MenuItem value={6}>Hackathon</MenuItem>
              </Select>
            </div>
             <div id="tags-field">
               <label htmlFor="topic-input" className="generic-label-form">
                 Tags:
               </label>
               <div className="tag-row">
                 <div className="tag-unit">
                  <input
                    type="checkbox"
                    id="video-tag"
                    className="tag-checkbox"
                    name="video"
                  ></input>
                  <label htmlFor="video-tag" className="check-label">
                    Video
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
                     Article
                   </label>
                 </div>
                 <div className="tag-unit">
                   <input
                    type="checkbox"
                    id="image-tag"
                    className="tag-checkbox"
                    name="image"
                  ></input>
                  <label htmlFor="image-tag" className="check-label">
                    Image
                  </label>
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
                    HTML
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
                    CSS
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
                    Javascript
                  </label>
                </div>
              </div>
            </div>
            <div id="resources-field">
              <label htmlFor="resources-input" id="resources-label">
                External resource URL:
              </label>
              <TextField
                variant="standard"
                sx={{ background: "white" }}
                type="url"
                placeholder="  https://example.com"
                pattern="https://.*"
                id="resources-input"
              ></TextField>
            </div>
          </div>
          <div id="right-col-NotesForm">
            <TextField
              sx={{ width: "90%", background: "white" }}
              label="Your Notes:"
              multiline
              rows={20}
              cols={100}
              defaultValue=""
              id="noteArea"
            />
            <div id="happy-to-help-field">
              <label htmlFor="happy-to-help-input">
                Are you happy to be asked for help on this topic?
              </label>
               <input
                type="checkbox"
                id="happy-to-help-input"
                className="tag-checkbox"
              ></input>
            </div>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
        <Button
          id="exit-button-form"
          variant="contained"
          aria-label="Cancel and hide current notes submission form"
          onClick={hideForm}
        >
          X
        </Button>
      </section>
    </div>
  );
}