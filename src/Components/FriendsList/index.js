import { FriendsCard } from "../FriendsCard";
import "./index.css";

function FriendsList() {
    return (
        <div className="cards-container">
            <FriendsCard />
            <FriendsCard />
            <FriendsCard />
            <FriendsCard />
        </div>
    );
}

export default FriendsList;