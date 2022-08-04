import React, { useState } from "react";
import { EventCard } from "../EventCard";

import "./styles.css";
function Searchbar({ setUserInput }) {
  const [input, setInput] = useState("");

  function handleInput(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setInput(value);
    // console.log(value);
  }
  //

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
