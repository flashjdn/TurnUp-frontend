import { FriendsCard } from "../FriendsCard";
import "./index.css";

function FriendsList() {
  return (
    <div className="friends-cards-container">
      <FriendsCard />
      <FriendsCard />
      <FriendsCard />
      <FriendsCard />
    </div>
  );
}

export default FriendsList;
