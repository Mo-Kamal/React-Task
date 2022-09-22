import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../actions";
import { FormLabel } from "@mui/material";

export default function EditModal(props) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const postContent = posts?.find((post) => {
    return post.id == props.editPostId;
  });
  const [title, setTitle] = useState(postContent.title);
  const [text, setText] = useState(postContent.body);

  const handleClose = () => {
    props.setModalDisplay(false);
  };

  const onSubmitHandler = (e) => {
    dispatch(editPost({ id: props.editPostId, title: title, body: text }));
    props.setModalDisplay(false);
  };

  return (
    <div>
      <Dialog open={props.modalDisplay} onClose={handleClose}>
        <DialogTitle
          sx={{
            paddingBottom: 2,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          Edit Post
        </DialogTitle>
        <DialogContent>
          <FormLabel
            sx={{
              // paddingBottom: 2,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Post Title
          </FormLabel>
          <TextField
            sx={{
              paddingBottom: 3,
              // paddingTop: 10,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 2,
            }}
            autoFocus
            margin="dense"
            id="name"
            onInput={(e) => setTitle(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
            value={title}
          />
          <FormLabel
            sx={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Post Text
          </FormLabel>
          <TextField
            multiline={true}
            margin="dense"
            id="name"
            value={text}
            onInput={(e) => setText(e.target.value)}
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontSize: 18 }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ fontSize: 18 }} type="submit" onClick={onSubmitHandler}>
            SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
