import "./styles.css";


function Searchbar({ setUserInput }) {


  function handleInput(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;

    setUserInput(value);
    // console.log(value);
  }
  //

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        onChange={handleInput}
      />
    </div>
  );
}

export default Searchbar;
