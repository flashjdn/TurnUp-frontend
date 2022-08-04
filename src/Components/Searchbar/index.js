import React, { useState } from "react";
import { EventCard } from "../EventCard";
import "./styles.css";
function Searchbar({ searchByUserInput, buttonText }) {
  const [input, setInput] = useState("");

  function handleInput(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setInput(value);
    console.log(value)
  }



/*
-   add event listener: filter needs to submit a new search for every change in state (using input state)

-   update state in events list to only render the events with matching titles

*/

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={input}
        onChange={handleInput}
      />
    </div>
  );
}

export default Searchbar;
