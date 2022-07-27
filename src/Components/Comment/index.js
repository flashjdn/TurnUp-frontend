import Chip from "@mui/material/Chip/Chip";
import * as React from "react";
import { Typography } from "@mui/material";

export default function Comment({ username, timestamp, content }) {
  const formattedDate = new Date(timestamp);

  //JSX being returned here shows the format of a comment, structure to be amended
  return (
    <div
      style={{
        marginLeft: 30,
        borderTop: "1px solid black",
      }}
    >
      <Typography style={{ fontStyle: "italic" }} variant="h6">
        {username}
      </Typography>
      <Chip size="small" label={formattedDate.toLocaleString()} />
      <p> </p>
      <Typography style= {{marginRight: 100}}>{content}</Typography>
      <p> </p>
    </div>
  );
}
