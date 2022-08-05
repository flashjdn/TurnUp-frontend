import { FriendsCard } from "../FriendsCard";
import "./index.css";

function FriendsList({ friendsArr }) {
  return (
    <div className="friends-cards-container">
      {friendsArr.map((item, index) => {
        return <FriendsCard friend={item} key={index} />;
      })}
    </div>
  );
}

export default FriendsList;
