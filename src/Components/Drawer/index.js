import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState } from "react";
import "./styles.css";

export default function Drawer() {
  const [drawerState, setDrawerState] = useState(false);

  function handleOpen() {
    setDrawerState(true);
  }

  function handleClose() {
    setDrawerState(false);
  }
  //something very small, yet again

  return (
    <div className="drawer-wrapper">
      <SwipeableDrawer
        open={drawerState}
        onOpen={handleOpen}
        onClose={handleClose}
        anchor="bottom"
        PaperProps={{
          sx: {
            maxWidth: "100%",
            backgroundColor: "var(--secondary)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2% 2% 0% 2%",
            padding: "5px 15px 5px 15px",
            textAlign: "justify",
            borderRadius: "10px",
            fontSize: "clamp(1rem, 3vw, 2rem)",
          },
        }}
      >
        <h1 className="for-what">Turn up, for what? 🤨</h1>
        <p className="about-us">
          Find free events near you, invite your friends, turn up!
        </p>
        <p className="about-us">
          Or if you're looking to put on a free event, set up an account and use our create event form to add the details for other users to find and get in contact with you!
        </p>
      </SwipeableDrawer>
      <button className="about-text" onClick={handleOpen}>
        What is this?
      </button>
    </div>
  );
}
