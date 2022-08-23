import "./styles.css";

function Searchbar({ setUserInput }) {
  function handleInput(event) {
    const value = event.target.value;
    setUserInput(value);
  }

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
