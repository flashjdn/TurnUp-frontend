import Accordion from "@mui/material/Accordion/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Typography from "@mui/material/Typography/Typography";
import * as React from "react";

export default function Card({
  eventId,
  eventName,
  eventDate,
  eventTime,
  eventLat,
  eventLon,
  eventLoc,
  description,
  eventOrganiser,
  accessibility,
  images,
  tags,
}) {
  const formattedDate = new Date(eventDate);

  /**********************************DUMMY DATA ALERT************************************************** */
  //WE CAN USE A STATE THAT FETCHES TAGS (OR WHATEVER WE WANT TO PUT IN THE CARD) AND SET IT TO TRUE UNTIL THE FETCH IS COMPLETED
  //HERE ARE THE TEMPORARY VARIABLES, reverse their values to see different stuff on the cards
  const isLoading = true;
  const isRetrieved = false;
  //________________________________________________________________________________________________________

  return (
    <Accordion>
      <AccordionSummary
        style={{
          marginTop: 30,
          backgroundColor: "#4dd8f2",
        }}
      >
        <div>
          <Typography style={{ fontStyle: "bold" }} variant="h4">
            {eventName}
          </Typography>
          <Typography style={{ fontStyle: "italic" }} variant="subtitle1">
            Organiser: {eventOrganiser}
          </Typography>
          <Chip
            variant="filled"
            size="small"
            label={formattedDate.toLocaleDateString()}
            style={{ marginBottom: 10 }}
          />
          <Typography style={{ margin: 10 }} variant="h6">
            {eventLoc}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ backgroundColor: "rgba(77, 216, 242, 0.7)" }}>
        {isLoading && <CircularProgress />}
        {isRetrieved && <p>What the hell are you doing here?</p>}
      </AccordionDetails>
    </Accordion>
  );
}
//testio vestio
