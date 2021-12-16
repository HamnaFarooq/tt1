import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { getAllProjects } from "../../store/action/project";
import { shareProject } from "../../store/action/project";
// const nodemailer=require('nodemailer')
// const mailGun=require('nodemailer-mailgun-transport')
// var api_key='d3dc735ba7238a8327b568755e9d21ea-45f7aa85-dddb7d46'
// var domain='sandbox9e41edac87014c00807064fe2d86cf7e.mailgun.org'
// var mailgun=require('mailgun-js')({apiKey:api_key,domain:domain})
// const sendmail=require('../../mail')
require("dotenv").config();
const nodemailer = require("nodemailer");
const Mail = require("nodemailer/lib/mailer");

const useStyles = makeStyles((theme) => ({
  dimensions: {
    width: "750px",
    height: "450px",
    borderRadius: "3%",
  },
  ButtonRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  typograhpyRoot: {
    width: "100%",
    maxWidth: 500,
  },
  textFieldRoot: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
}));

const styles = {
  row: { display: "flex", flexDirection: "row" },
  projectBar: {
    display: "flex",
    backgroundColor: "#042f66",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingLeft: 12,
  },
};

export default function ShareMenu({ handleClose }) {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [sharelink, setsharelink] = useState("");

  const projectObj = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const classes = useStyles();

  const [age, setAge] = useState("");
  const [shareType, setShareType] = useState("");


  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value);
  };

  const handlesharelink = (e) => {
    setsharelink(e.target.value);
  };

  console.log("sharelink :>> ", sharelink);
  console.log("userEmail :>> ", userEmail);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  const mailsend = () => {
    let mailOptions = {
      from: "abdurrehmanzab@gmail.com",
      to: userEmail,
      subject: "Invite",
      text: sharelink,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Mail Sent!");
      }
    });
  };

  const executeShareAndHandleClose = () => {
    dispatch(shareProject(age._id, userEmail,shareType));
    handleClose();

    mailsend();
  };

  const data = [
    { id: 0, name: "Project 1", tasks: [{ id: 0, name: "Task 1" }] },
    {
      id: 1,
      name: "Project 2",
      tasks: [
        { id: 0, name: "Task 1" },
        { id: 1, name: "Task 2" },
      ],
    },
    {
      id: 2,
      name: "Project 3",
      tasks: [
        { id: 0, name: "Task 1" },
        { id: 1, name: "Task 2" },
        { id: 2, name: "Task 3" },
      ],
    },
  ];

  return (
    <Paper
      elevation={3}
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: 500,
      }}
    >
      <div style={styles.projectBar}>
        <Typography>Share project</Typography>
        <IconButton
          style={{ color: "white" }}
          fontSize="small"
          onClick={handleClose}
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ ...styles.row, alignItems: "center" }}>
            <Typography variant="body2">Select Projects</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
            >
              {projectObj.projects.projects.map((project) => (
                <div key={project._id}>
                  <MenuItem value={age.name}>
                    <Button value={age.name} onClick={() => setAge(project)}>
                      {project.name}
                    </Button>
                  </MenuItem>
                </div>
              ))}
            </Select>
          </div>
          <div style={{ ...styles.row, alignItems: "center" }}>
            <Typography variant="body2">Select Type</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={shareType}
            >
              {["viewer","editor"].map((item,index) => (
                <div key={indexedDB}>
                  <MenuItem value={item}>
                    <Button value={item} onClick={() => setShareType(item)}>
                      {item}
                    </Button>
                  </MenuItem>
                </div>
              ))}
            </Select>
          </div>
          <Typography style={{ padding: 8 }} variant="body1">
            Share Link
          </Typography>
          <div style={styles.row}>
            <TextField
              size="small"
              name="sharelink"
              onChange={handlesharelink}
              fullWidth
              id="outlined-basic"
              label={
                age?.name
                  ? `${age.name} will be shared`
                  : "Select project to share"
              }
              variant="outlined"
            />
            {/* <Button style={{ marginLeft: 8 }} variant="outlined">Editor</Button>
            <Button style={{ marginLeft: 8 }} variant="outlined">Copy</Button> */}
          </div>
          <Typography style={{ padding: 8 }} variant="body1">
            Email/Note
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              multiline
              label="Add single email you want to send to"
              variant="outlined"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {/* <Button style={{ marginLeft: 8, maxHeight: 40 }} variant="outlined">Viewer</Button> */}
            <Button
              style={{ marginLeft: 8, maxHeight: 40 }}
              variant="outlined"
              onClick={() => executeShareAndHandleClose()}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
  // return (
  //   // style={{ left: '610px', position:"relative", top: "120px" }

  //     <div style={{  }}>
  //   <div className={classes.root}>
  //     <Paper elevation={3} className={classes.dimensions}/>

  //     {/* <div className={classes.ButtonRoot}> */}
  //     <div style={{ left: '-600px', position:"relative", top: "10px" }}>
  //       <FormControl className={classes.formControl}>
  //           {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

  //
  //       </FormControl>
  //    </div>

  //     <div style={{ left: '-600px', position:"relative", top: "10px" }}>

  //     </div>

  //     <div style={{ left: '-1030px', position:"relative", top: "200px" }}>
  //       <Typography
  //       // style={{ left: '-1030px', position:"relative", top: "200px" }}
  //       classes={classes.typograhpyRoot} variant="body1" display="block" gutterBottom>
  //        Email/Note
  //       </Typography>
  //       <div>
  //       </div>
  //       <TextField
  //       fullWidth={true}
  //       // style={{ left: '-1040px', position:"relative", top: "200px" }}
  //       multiline rows={4} className={classes.textFieldRoot} id="outlined-basic" label="Add all emails you want to send" variant="outlined" />
  //       {/* <Button style={{ left: '-615px', position:"relative", top: "120px" }} variant="outlined">Viewer</Button>
  //       <Button style={{ left: '-510px', position:"relative", top: "84px" }} variant="outlined">Send</Button> */}
  //       <Button variant="outlined">Viewer</Button>
  //       <Button variant="outlined">Send</Button>
  //     </div>

  //   {/* </div> */}
  //   </div>
  //   </div>
  // );
}
