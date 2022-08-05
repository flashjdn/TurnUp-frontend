import "./index.css";

function FriendsAttending({ attendingFriends }) {
  return (
    <div>
      <div className="friends-text">Attending: </div>
      <div className="attending-scrollbar">
        {" "}
        {attendingFriends.map((item, index) => {
          return (
            <img
              src={item.profilePic}
              alt="a persons face"
              className="small-profile-pic"
            />
          );
        })}
      </div>
    </div>
  );
}

export default FriendsAttending;
