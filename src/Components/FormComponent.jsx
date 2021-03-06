import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import XmemeService from "../service/XmemeService";
import { useState } from "react";
import "react-awesome-button/dist/styles.css";
import { AwesomeButton } from "react-awesome-button";
import styles from "../theme-blue.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";

const schema = yup.object().shape({
  name: yup.string().required(),
  caption: yup.string().required(),
  url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required(),
});

export default function FormComponent() {
  const { addToast } = useToasts();
  const initialState = {
    name: "",
    caption: "",
    url: "",
    id: "",
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [meme, setMeme] = useState(initialState);
  const saveMemes = () => {
    console.log("Im here");
    var data = {
      name: meme.name,
      url: meme.url,
      caption: meme.caption,
      id: meme.id,
    };
    XmemeService.submitMemes(data);
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMeme({ ...meme, [name]: value });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AwesomeButton type="primary" ripple onPress={handleClickOpen}>
        Submit 🚀
      </AwesomeButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Hey👋</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Start your Meme Making Journey😀Publish Your meme Now😍
          </DialogContentText>

          <Form>
            <Form.Group controlId="GiveName">
              <Form.Label>Name*</Form.Label>
              <Form.Control
                type="text"
                id="Name"
                placeholder="Enter Your Name"
                onChange={handleInputChange}
                ref={register}
                value={meme.name}
                name="name"
              />
              {errors.name && <h7>Name is required</h7>}
            </Form.Group>

            <Form.Group controlId="Give Caption">
              <Form.Label>Caption*</Form.Label>
              <Form.Control
                id="caption"
                type="text"
                placeholder="Give some Funny Caption"
                onChange={handleInputChange}
                ref={register}
                value={meme.caption}
                name="caption"
              />
              {errors.name && <h6>Caption is required</h6>}
            </Form.Group>

            <Form.Group controlId="GiveUrl">
              <Form.Label>URL*</Form.Label>
              <Form.Control
                id="caption"
                type="text"
                placeholder="Enter Image Url with Http"
                onChange={handleInputChange}
                ref={register}
                value={meme.url}
                name="url"
              />
              {errors.name && <h6>Enter Valid URL</h6>}
            </Form.Group>
            <DialogActions>
              <Button
                variant="outline-danger"
                type="cancel"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="outline-primary"
                type="submit"
                onClick={handleSubmit(saveMemes)}
              >
                Submit
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
