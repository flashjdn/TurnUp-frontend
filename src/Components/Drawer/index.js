import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState } from "react";


export default function Drawer() {
  const [drawerState, setDrawerState] = useState(false);

  function handleOpen() {
    setDrawerState(true);
  }

  function handleClose() {
    setDrawerState(false);
  }

// const theme = createTheme()

//   const useStyles = makeStyles({
//     SwipeableDrawer: {
//       backgroundColor: "#fadedd",
//     },
//   });

  return (
    <div>
      <SwipeableDrawer
        open={drawerState}
        onOpen={handleOpen}
        onClose={handleClose}
        anchor="left"
      >
        <h1>Hey this totally works</h1>
      </SwipeableDrawer>
      <button className="about-text" onClick={handleOpen}>
        What is this?
      </button>
    </div>
  );
}
