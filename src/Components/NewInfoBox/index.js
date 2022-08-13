export function NewInfoBox() {
  return (
    <div className="new-user-box">
      <label htmlFor="username-input">Type in your username:</label>
      <input
        name="username-input"
        type="text"
        placeholder="Your username"
      ></input>
    </div>
  );
}
