import { FriendsCard } from "../FriendsCard";
import "./index.css";

function FriendsList({ friendsArr }) {
  if (friendsArr.length !== 0) {
    return (
      <div className="friends-cards-container">
        {friendsArr.map((item, index) => {
          return <FriendsCard friend={item} key={index} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="friends-cards-container">
        <p className="no-friends">You don't have any friends yet!</p>
      </div>
    );
  }
}

export default FriendsList;
