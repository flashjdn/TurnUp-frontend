import "./index.css";

function FriendsAttending({ attendingGuests }) {
  return (
    <div>
      <div className="friends-text">Attending: </div>
      <div className="attending-scrollbar">
        {" "}
        {attendingGuests.map((item, index) => {
          return (
            <div className="attendee-div">
              <img
                src={item.img}
                alt="a persons face"
                className="small-profile-pic"
              />
              <p className="attendee-name">{item.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsAttending;
