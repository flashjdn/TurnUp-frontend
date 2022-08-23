import { Button } from "@mui/material";
import "./index.css";
import { TextField } from "@aws-amplify/ui-react";
export function NewInfoBox({ closingFunction, newUserEmail }) {
  async function handleSubmit(e) {
    e.preventDefault();
    let userObj = {
      userName: document.getElementById("new-username-input").value,
      img: document.getElementById("new-profile-pic-input").value,
      email: newUserEmail,
    };

    await fetch(`https://turnupdb.herokuapp.com/events/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    closingFunction();
  }

  return (
    <div className="new-user-popup">
      <div className="new-user-inside-box">
        <div className="new-user-text">
          <h2>...just one more step</h2>
          <p>
            It's great to have you with us! Please provide us with your username
            and a picture and let's begin.{" "}
          </p>
        </div>
        <form id="new-user-form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            inputProps={{ min: "1", max: "16", step: "1" }}
            sx={{ width: "20%", backgroundColor: "white" }}
            type="text"
            id="new-username-input"
            size="large"
            required
          ></TextField>

          <TextField
            label="Profile image url:"
            inputProps={{ min: "1", max: "16", step: "1" }}
            sx={{ width: "20%", backgroundColor: "white" }}
            type="text"
            id="new-profile-pic-input"
            size="large"
            required
          ></TextField>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
