import { Button } from "@mui/material";
import "./index.css";

export const FriendsCard = () => {
  return (
    <>
      <div className="friend-card-one">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5GNLQ5Rq4_uCHZY7yxKiYXxjkkhro_aIbGQ&usqp=CAU"
          className="friend-pic"
          alt="friend-img"
        ></img>{" "}
        <p className="friend-name"> Friend Name</p>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: "#f99244",
            color: "#f99244",
            fontWeight: "bold",
            marginLeft: "0",
            size: "small",
          }}
          className="delete-butt"
        >
          Remove
        </Button>
      </div>
    </>
  );
};
