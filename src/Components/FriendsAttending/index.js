import "./index.css";

function FriendsAttending({ attendingFriends }) {
  return (
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
  );
}

export default FriendsAttending;
