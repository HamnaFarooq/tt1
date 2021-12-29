import {
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  Button,
  InputLabel,
  TextField,
  Card,
  Popover,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { login } from "../../store/action/auth";
import DateRange from "./DateRange";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { createProject } from "../../store/action/project";

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    width: 300,
  },
  contentContainer: {
    display: "flex",
    paddingTop: 24,
    justifyContent: "center",
    flexDirection: "column",
  },
  signupButton: {
    borderRadius: 24,
    width: 100,
    marginBottom: 16,
    alignSelf: "center",
  },
};

const TaskCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [createSelected, setCreateSelected] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");

  const dateValueObj = useSelector((state) => state.date);
  // console.log(dateValueObj.date.endDateToUse)
  // console.log("date from end taskCreate is: ", moment(dateValueObj.date.endDateToUse, 'DD MM YYYYThh:mm').format('DD MM YYYYThh:mm'));
  // console.log(dateValueObj.date.startDateToUse)

  // console.log("date from start taskCreate is: ", moment(dateValueObj.date.startDateToUse, 'DD MM YYYYThh:mm').format('DD MM YYYYThh:mm'));
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const [rememberChecked, setRememberChecked] = useState(true);

  const tasks = [
    {
      name: taskName,
      description: "",
      // startDate: dateValueObj.date.startDateToUse,
      // endDate: dateValueObj.date.endDateToUse,
      startDate: moment(dateValueObj.date.startDateToUse).format(
        "DD MM YYYYThh:mm"
      ),
      endDate: moment(dateValueObj.date.endDateToUse).format(
        "DD MM YYYYThh:mm"
      ),
      // startDate: moment(dateValueObj.date.startDateToUse).format("DD/MM/YYYY"),
      // endDate: moment(dateValueObj.date.endDateToUse).format("DD/MM/YYYY")
    },
  ];

  // console.log(tasks)

  const createProjectAndReinitializeFields = () => {
    dispatch(createProject(projectName, tasks));
    setProjectName("");
    setTaskName("");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isAuthenticatedVal = useSelector((state) => state.auth);

  const OpenView = () => (
    <div style={styles.contentContainer}>
      <div>
        <InputLabel style={{ marginBottom: 8 }}>Enter Link</InputLabel>
        <TextField id="link-textfield" variant="outlined" size="small" />
      </div>
      <Button
        style={{ marginTop: 8 }}
        onClick={() => {}}
        color="primary"
        size="small"
      >
        Open
      </Button>
    </div>
  );

  return (
    <Card style={styles.card}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          variant={createSelected ? "contained" : "outlined"}
          style={{
            marginRight: 2,
            backgroundColor: createSelected ? "#042f66" : "white",
            color: createSelected ? "white" : "#042f66",
          }}
          size="small"
          onClick={() => !createSelected && setCreateSelected(!createSelected)}
        >
          Create
        </Button>
        <Button
          variant={createSelected ? "outlined" : "contained"}
          size="small"
          style={{
            backgroundColor: !createSelected ? "#042f66" : "white",
            color: !createSelected ? "white" : "#042f66",
            marginLeft: 2,
          }}
          onClick={() => createSelected && setCreateSelected(!createSelected)}
        >
          Open
        </Button>
      </div>

      {createSelected && isAuthenticatedVal.isAuthenticated ? (
        <div style={styles.contentContainer}>
          <div
            style={{
              padding: 16,
              paddingTop: 0,
            }}
          >
            <div style={{ paddingTop: 8, paddingBottom: 24 }}>
              <InputLabel style={{ margin: 8 }}>Project</InputLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div style={{ paddingTop: 8, paddingBottom: 8 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingRight: 16,
                }}
              >
                <InputLabel style={{ margin: 8 }}>Task</InputLabel>
                {/* <InputLabel style={{ margin: 8 }}>Due Date</InputLabel> */}
                <InputLabel style={{ marginLeft: 8, marginTop: 10 }}>
                  Date
                </InputLabel>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                <Button
                  aria-describedby={id}
                  onClick={handleClick}
                  size="small"
                >
                  <DateRangeIcon />
                </Button>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              createProjectAndReinitializeFields();
            }}
            color="primary"
            style={{ alignSelf: "flex-end", marginRight: 16 }}
          >
            Next
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <DateRange handleClose={handleClose} />
          </Popover>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            paddingTop: 24,
            flexDirection: "column",
          }}
        >
          <InputLabel style={{ marginBottom: 4 }}>Email</InputLabel>
          <TextField
            error={
              email !== '' &&(
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                ? false
                : true
              )
            }
            style={{ marginBottom: 8 }}
            variant="outlined"
            size="small"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />

          <InputLabel style={{ marginBottom: 4 }}>Password</InputLabel>
          <TextField
            style={{ marginBottom: 8 }}
            size="small"
            name="password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onChange(e)}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 8,
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberChecked}
                  onChange={() => setRememberChecked(!rememberChecked)}
                  name="rememberme"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Typography onClick={() => {}} style={{ marginTop: 8 }}>
              Forgot password?
            </Typography>
          </div>
          <Button
            style={{
              ...styles.signupButton,
              backgroundColor: "#042f66",
              color: "white",
            }}
            variant="contained"
            size="small"
            onClick={(e) => onSubmit(e)}
          >
            Login
          </Button>
          <Typography
            style={{ marginBottom: 8 }}
            align="center"
            variant="body2"
          >
            Not a member yet?{" "}
            <Link onClick={() => history.push("/signup")} variant="body2">
              {"Join us"}
            </Link>
          </Typography>
        </div>
      )}
      {!createSelected && <OpenView />}
    </Card>
  );
};

export default TaskCreate;
