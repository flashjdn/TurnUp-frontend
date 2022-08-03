import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState, useEffect } from 'react';

export default function Drawer(drawer) {

  const [state, setState] = useState(true);

  function toggleDrawer() {
    drawer = false;
    console.log(drawer)
    // console.log("this function is running")
    // setState(!state)
    // drawer = state;
  }

  useEffect(() => {

    console.log(state);
  }, [state]);

  return (

    <SwipeableDrawer
      open={drawer}
      onClose={toggleDrawer}

    >
      <button onClick={toggleDrawer}>X</button>

      <h1>Hey this totally works</h1>

    </SwipeableDrawer >
  )
}
