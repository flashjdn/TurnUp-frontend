import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import sendComment from "../../Models/sendComment";

export default function ReplyButton({ post_id, loadComments }) {
  //controls the opening and closing of the REPLY modal
  // console.log("post id", post_id);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [comment, setComment] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //**************** */

  function handleUserInput(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setUser(value);
  }

  function handleCommentInput(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setContent(value);
  }

  function handleClick() {
    // console.log("comment before", comment);
    setContent("");
    setUser("");
    setComment({
      username: user,
      content: content,
      post_id: post_id,
    });
    sendComment(post_id, user, content).then(() => {
      loadComments();
    });
    setOpen(false);
  }

  //*************** */
  // console.log("comment after", comment);
  return (
    <div style={{ position: "relative" }}>
      <Button
        style={{ position: "absolute", right: 10, bottom: 20 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Reply
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>What would you like to say?</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleUserInput}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="string"
            fullWidth
            variant="standard"
            multiline
            value={user}
          />
          <TextField
            onChange={handleCommentInput}
            autoFocus
            margin="dense"
            id="reply"
            label="Comment"
            type="string"
            fullWidth
            variant="standard"
            multiline
            value={content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
