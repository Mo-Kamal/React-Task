import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { editPost, fetchPosts } from "../../actions";

export default function EditModal(props) {
  const dispatch = useDispatch();
  // console.log(props.editPostId);

  //   const [open, setOpen] = React.useState(false);
  const posts = useSelector((state) => state.posts);

  const postContent = posts?.find((post) => {
    return post.id == props.editPostId;
  });
  const [title, setTitle] = useState(postContent.title);
  const [text, setText] = useState(postContent.body);
  console.log(postContent);
  // console.log(!(postContent == null));

  // useEffect(() => {
  //   if (!(postContent == null)) {
  //     // console.log(postContent.length);
  //     if (postContent.length > 0) {
  //       // console.log(postContent);
  //       setTitle(postContent[0].title);
  //       setText(postContent[0].body);
  //     }
  //   }
  // }, [postContent]);

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    props.setModalDisplay(false);
  };

  const onSubmitHandler = (e) => {
    dispatch(editPost({ id: props.editPostId, title: title, body: text }));
    props.setModalDisplay(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={props.modalDisplay} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <label>Post Title</label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onInput={(e) => setTitle(e.target.value)}
            // label="Post Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            // defaultValue={postContent[0].title}
            // onChange={handleChange}
          />
          <label>Post Text</label>
          <TextField
            multiline={true}
            margin="dense"
            id="name"
            // label="Post Text"
            value={text}
            onInput={(e) => setText(e.target.value)}
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={onSubmitHandler}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
