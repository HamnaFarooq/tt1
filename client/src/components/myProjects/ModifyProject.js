import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  ButtonBase,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import CancelIcon from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/SendRounded";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editTask, getAllUsersWhoCommented, deleteTask, duplicateTask } from "../../store/action/project";

const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: 600,
    height: 600,
  },
  projectBar: {
    display: "flex",
    backgroundColor: "#042f66",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingLeft: 12,
  },
  flexRow: { display: "flex", flexDirection: "row" },
  flexColumn: { display: "flex", flexDirection: "column" },
};

const comments = [
  {
    name: "Montela",
    comment: "The fuck is this task...",
    date: moment("21-9-2021", "DD-MM-YYYY"),
  },
];

const ModifyProject = ({ handleClose, project }) => {
  const index = project.index
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth);
  const usersWhoCommented = useSelector(state => state.project.usersWhoCommented)
  const [commentToUserMapArr, setCommentToUseMapArr] = useState([]);
  let commentsArr = [];


  useEffect(() => {
    dispatch(getAllUsersWhoCommented(project._id))
  }, [dispatch])

  // console.log("users who commented are: ", usersWhoCommented);

  useEffect(() => {
    const arr = []
    project.comments.forEach(comment => {
      usersWhoCommented.map(user => (
        { user: user._id === comment.user && arr.push({ comment: comment.text, user: user.name }) }
      )
      )
    })
    setCommentToUseMapArr([...arr])
  }, [usersWhoCommented])

  const [taskDuplicate, setTaskDuplicate] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  useEffect(() => {
    setTaskDuplicate({
      name: project.tasks[index].name,
      description: project.tasks[index].description,
      startDate: project.tasks[index].startDate,
      endDate: project.tasks[index].endDate
    })
  }, [])
  // console.log("task duplicate is: ", taskDuplicate)

  // console.log("array is: ", commentToUserMapArr);
  const [edit, setEdit] = useState(true);
  const [deleteBtn, setDelete] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  const [projectName, setProjectName] = useState(project.name);
  const [taskName, setTaskName] = useState(project.tasks[index].name);
  const [descriptionText, setDescriptionText] = useState(project.tasks[index].description);
  const [commentText, setCommentText] = useState('');

  const [priority, setPriority] = useState(project.priority ? project.priority : '');

  const [startDate, setStartDate] = useState(moment(project.tasks[index].startDate, "DD MM YYYY").format("YYYY-MM-DDThh:mm"));
  const [endDate, setEndDate] = useState(moment(project.tasks[index].endDate, "DD MM YYYY").format("YYYY-MM-DDThh:mm"));

  const [startDateToUse, setStartDateToUse] = useState(moment(project.tasks[index].startDate, "DD MM YYYY").format("DD-MM-YYYYThh:mm"));
  const [endDateToUse, setEndDateToUse] = useState(moment(project.tasks[index].endDate, "DD MM YYYY").format("DD-MM-YYYYThh:mm"));

  const handleChangeForStartDate = (e) => {
    setStartDate(e.target.value);
    // setStartDateToUse(e.target.value); //if we wanna obtain normal date and time and not format it
    setStartDateToUse(moment(e.target.value).format("DD MM YYYYThh:mm"));

  };

  const handleChangeForEndDate = (e) => {
    setEndDate(e.target.value);
    setEndDateToUse(moment(e.target.value).format("DD MM YYYYThh:mm"));
  };

  // console.log("dates are: ", moment(startDateToUse).format("DD/MM/YYYY"), endDateToUse);
  // console.log(projectName, taskName, descriptionText, commentText)

  const handleChange = (event) => {
    setPriority(event.target.value);
  };


  // const tasks = [
  //   {
  //     name: taskName,
  //     description: descriptionText,
  //     startDate: startDateToUse,
  //     endDate: endDateToUse
  //   }
  // ];


  const task =
  {
    name: taskName,
    description: descriptionText,
    startDate: startDateToUse,
    endDate: endDateToUse
  }

  // console.log("task in modifyProject are ", task)

  var editType = null;

  // if (commentText) {
  //   editType = "commented on"
  //   commentsArr.push(commentText);
  // }
  // else {
  //   editType = "edited"
  //   commentsArr.pop(commentText);
  // }



  const task_id = project.tasks[index]._id;

  const alteration = [
    { editType }
  ]


  // const taskDuplicate = {
  //   name: project.tasks[index].name,
  //   description: project.tasks[index].description,
  //   startDate: project.tasks[index].startDate,
  //   endDate: project.tasks[index].endDate
  // }


  // console.log(`project id is ${project._id} and task id is ${project.tasks[index]._id}`);
  // console.log("prioruty is: ", priority)

  const HeaderBar = () => (
    <div style={styles.projectBar}>
      <ButtonGroup disableElevation>
        <Button
          onClick={() => {
            if (!edit) {
              setEdit(!edit);
              deleteBtn && setDelete(!deleteBtn);
              duplicate && setDuplicate(!duplicate);
            }
          }}
          style={{
            borderWidth: 0,
            color: edit ? "royalblue" : "white",
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            if (!deleteBtn) {
              setDelete(!deleteBtn);
              edit && setEdit(!edit);
              duplicate && setDuplicate(!duplicate);
            }
          }}
          style={{
            borderWidth: 0,
            borderLeftWidth: 1,
            borderColor: "white",
            color: "white",
            color: deleteBtn ? "royalblue" : "white",
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            if (!duplicate) {
              setDuplicate(!duplicate);
              deleteBtn && setDelete(!deleteBtn);
              edit && setEdit(!edit);
            }
          }}
          style={{
            borderWidth: 0,
            borderLeftWidth: 1,
            borderColor: "white",
            color: "white",
            color: duplicate ? "royalblue" : "white",
          }}
        >
          Duplicate
        </Button>
      </ButtonGroup>
      <IconButton
        onClick={handleClose}
        style={{ color: "white" }}
        fontSize="small"
      >
        <CancelIcon fontSize="small" />
      </IconButton>
    </div>
  );

  const CommentItem = ({ comment }) => (
    <div>
      <div
        style={{
          ...styles.flexRow,
          alignItems: "center",
          marginBottom: 8,
          marginTop: 8,
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ fontWeight: "bold", marginRight: 8 }}
        >
          {comment.user}
        </Typography>

      </div>
      <Typography style={{ color: "gray" }} variant="subtitle2">
        {comment.comment}
      </Typography>
    </div>
  );

  return (
    <Card style={styles.cardContainer}>
      <HeaderBar />
      <div style={styles.flexRow}>

        {/* <Editor /> */}

        <div style={{ ...styles.flexColumn, width: 350, padding: 8 }}>
          <div style={{ ...styles.flexRow }}>
            <div style={{ marginRight: 4 }}>
              <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
                Project Name
              </Typography>
              <TextField
                name="name"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                style={{ marginBottom: 8 }}
                variant="outlined"
                size="small"
              />
            </div>
            <div style={{ marginLeft: 4 }}>
              <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
                Task Name
              </Typography>
              <TextField
                name="name"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                style={{ marginBottom: 8 }}
                variant="outlined"
                size="small"
              />
            </div>
          </div>
          <TextField
            multiline={true}
            variant="outlined"
            value={descriptionText}
            onChange={e => setDescriptionText(e.target.value)}
            size="small"
            style={{
              backgroundColor: "white",
              borderRadius: 4,
              marginTop: 8,
              marginBottom: 8,
            }}
            rows={5}
          />
          <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
            Start Date
          </Typography>
          <TextField
            id="date"
            type="datetime-local"
            defaultValue="2021-11-15T10:30"
            value={startDate}
            style={{ marginBottom: 8 }}
            onChange={(event) => handleChangeForStartDate(event)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
            Due Date
          </Typography>
          <TextField
            id="date"
            type="datetime-local"
            defaultValue="2021-11-15T10:30"
            value={endDate}

            style={{ marginBottom: 8 }}
            onChange={(event) => handleChangeForEndDate(event)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div style={styles.flexRow}>
            <div style={{ marginRight: 16 }}>
              <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
                Priority
              </Typography>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={priority ? priority : (project.priority ? project.priority : priority)}//{project.priority ? project.priority : priority}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"high"}>high</MenuItem>
                <MenuItem value={"moderate"}>moderate</MenuItem>
                <MenuItem value={"low"}>low</MenuItem>
              </Select>

            </div>
            <div style={{ marginleft: 16, marginBottom: 16 }}>
              <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
                Color
              </Typography>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={priority ? priority : (project.priority ? project.priority : priority)}  //this depends on priority. high=purple and so on
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"high"}><div style={{ backgroundColor: "purple" }}>&nbsp;</div></MenuItem>
                <MenuItem value={"moderate"}><div style={{ backgroundColor: "red" }}>&nbsp;</div></MenuItem>
                <MenuItem value={"low"}><div style={{ backgroundColor: "green" }}>&nbsp;</div></MenuItem>
              </Select>
            </div>
          </div>
          {/* <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
        Files
      </Typography> */}
          <Button variant="contained" color="primary" onClick={() => {
            dispatch(editTask(project._id, task_id, projectName, project.comments, task, editType, priority))
            handleClose()
          }}>
            Apply Changes
          </Button>

          <Button variant="contained" color="inherit" style={{ marginTop: 20 }} onClick={() => {
            dispatch(duplicateTask(project._id, taskDuplicate))
            handleClose()
          }}>
            Duplicate task {project.tasks[index].name}
          </Button>

          <Button variant="contained" color="secondary" style={{ marginTop: 20 }} onClick={() => {
            dispatch(deleteTask(project._id, task_id))
            handleClose()
          }}>
            Delete task {project.tasks[index].name}
          </Button>
        </div>

        {/* <Comments /> */}
        <div
          style={{
            ...styles.flexColumn,
            width: 250,
            height: 540,
            backgroundColor: "lightgrey",
            padding: 8,
          }}
        >
          <Typography>Comments</Typography>
          <Divider variant="fullWidth" style={{ marginTop: 8, marginBottom: 8 }} />
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {commentToUserMapArr.map((comment) => (
                <CommentItem comment={comment} />
              ))}
            </div>

            <TextField
              multiline={true}
              variant="outlined"
              size="small"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              style={{
                backgroundColor: "white",
                borderRadius: 4,
              }}
              rows={3}
              InputProps={{
                endAdornment: (
                  <InputAdornment class="marginDense" position="end">
                    <ButtonBase onClick={() => {
                      project.comments.push({ user: userDetails.user._id, text: commentText })
                      setCommentToUseMapArr([...commentToUserMapArr, { comment: commentText, user: userDetails.user.name }])
                    }} >

                      <SendIcon style={{ color: "#042f66" }} fontSize="small" />
                    </ButtonBase>
                  </InputAdornment>
                ),
              }}
              placeholder={`Comment as ${userDetails.user.name}`}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModifyProject;
