import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "./index.css";

export const FriendsCard = ({ friend }) => {
  const [friendData, setFriendData] = useState({
    img: "",
    username: "",
  });
  async function getOneFriend(friendId) {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/user/${friendId}`,
      {
        mode: "cors",
      }
    );
    const data = await res.json();
    // further in this function we need to have an if statement that checks if the user has any friends to begin with and if not, use setFriendsList to define it as undefined and offer him an add friend button that can be rendered on a card
    // if the user has friends it just renders his list of friends
    setFriendData(data[0]);
  }
  useEffect(() => {
    getOneFriend(friend.friend);
  }, []);

  return (
    <>
      <div className="friend-card-one">
        <img src={friendData.img} className="friend-pic" alt="friend-img"></img>{" "}
        <div className="friend-name-div">
          <p className="friend-name">{friendData.username}</p>
        </div>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: "#f99244",
            color: "#f99244",
            fontWeight: "bold",
            size: "small",
            marginLeft: "0",
          }}
          className="delete-butt"
        >
          Remove
        </Button>
      </div>
    </>
  );
};
