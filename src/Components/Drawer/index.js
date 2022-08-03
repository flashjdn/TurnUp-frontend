import SwipeableDrawer from '@mui/material/SwipeableDrawer';

export default function Drawer(prop) {
  return (
    <SwipeableDrawer open={prop}>
      <h1>Hey this totally works</h1>
    </SwipeableDrawer>
  )
}