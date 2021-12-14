import {
  Button,
  Card,
  IconButton,
  InputLabel,
  List,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Popover } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DateRange from "./DateRange";
import { createProject } from "../../store/action/project";
import moment from "moment";

const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: 500,
  },
  projectBar: {
    display: "flex",
    backgroundColor: "#042f66",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingLeft: 12,
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: 8,
  },
};

const NewProject = ({ handleClose }) => {

  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('');

  const dateValueObj = useSelector(state => state.date);
  // console.log("date val in NewProject is: ", moment(dateValueObj.date.startDateToUse).format("DD/MM/YYYY"));
  const tasks = [
    {
      name: taskName,
      description: '',
      // startDate: dateValueObj.date.startDateToUse,
      // endDate: dateValueObj.date.endDateToUse
      startDate: moment(dateValueObj.date.startDateToUse).format('DD MM YYYYThh:mm'),
      endDate: moment(dateValueObj.date.endDateToUse).format('DD MM YYYYThh:mm'),
      priority
      // startDate: moment(dateValueObj.date.startDateToUse).format("DD/MM/YYYY"),
      // endDate: moment(dateValueObj.date.endDateToUse).format("DD/MM/YYYY")
    }
  ];


  const createProjectAndReinitializeFields = () => {
    dispatch(createProject(projectName, tasks, priority));
    setProjectName('');
    setTaskName('');
    handleClose()
  }




  return (
    <Card style={styles.cardContainer}>
      <div style={styles.contentContainer}>
        <div style={styles.projectBar}>
          <Typography>Create a new project</Typography>
          <IconButton
            style={{ color: "white" }}
            fontSize="small"
            onClick={handleClose}
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        </div>
        <div
          style={{
            padding: 16,
          }}
        >
          <div style={{ paddingTop: 8, paddingBottom: 24 }}>
            <InputLabel style={{ margin: 8 }}>Project</InputLabel>
            <TextField variant="outlined" size="small" placeholder="Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          </div>
          <div style={{ paddingTop: 8, paddingBottom: 8 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 32,
              }}
            >
              <InputLabel style={{ margin: 8 }}>Task</InputLabel>
              {/* <InputLabel style={{ margin: 8 }}>Due Date</InputLabel> */}

            </div>
            {/* <List disablePadding>
              {[...Array(tasksCount)].map((x, i) => (
                <TaskRow key={i} />
              ))}
            </List> */}
            <div
              style={{
                display: "flex",
                flexDirection: 'column'
              }}
            >
              <TextField
                fullWidth={true}
                variant="outlined"
                size="small"
                placeholder="Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <InputLabel style={{ marginLeft: 8, marginTop: 10 }}>Date</InputLabel>

              <DateRange />

            </div>
          </div>
        </div>
        <Button onClick={() => { createProjectAndReinitializeFields() }} color="primary" size="small">
          Done
        </Button>

      </div>
    </Card>
  );
};

export default NewProject;
