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
        <h1>Turn up, for what? 🤨</h1>
        <p>
          Et ipsum tempor ullamco voluptate sunt. Ut id eu occaecat officia
          aliqua excepteur laboris do velit. Veniam minim pariatur qui ex.
          Labore voluptate Lorem fugiat nisi nostrud officia anim nostrud
          voluptate proident nulla in aute. Exercitation incididunt consequat
          occaecat aliquip ipsum fugiat ex do. Ut commodo non quis aute aliqua
          mollit in do nisi nulla.
        </p>
      </SwipeableDrawer>
      <button className="about-text" onClick={handleOpen}>
        What is this?
      </button>
    </div>
  );
}
