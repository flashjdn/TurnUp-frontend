import { Button } from "@mui/material";
import "./index.css";

export const FriendsCard = ({ friend }) => {
  return (
    <>
      <div className="friend-card-one">
        <img
          src={friend.profilePic}
          className="friend-pic"
          alt="friend-img"
        ></img>{" "}
        <p className="friend-name">{friend.friendName}</p>
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
