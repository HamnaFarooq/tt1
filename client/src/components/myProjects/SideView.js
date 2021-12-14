import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
  List,
  Card,
  Popover,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import { useState } from "react";
import { useSelector } from "react-redux";
import NewProject from "./NewProject";
import AddNewTask from "./AddNewTask";

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

const styles = {
  container: { display: "flex", flexDirection: "column", width: 300 },
  projectBar: {
    display: "flex",
    backgroundColor: "#042f66",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingLeft: 12,
  },
};

const SideView = () => {

  const projectObj = useSelector(state => state.project);
  const [project, setProject] = useState({});
  const [showShare, setShowShare] = useState(true);
  // console.log("side view projects: ", projectObj.projects.projects);

  const [anchorEl, setAnchorEl] = useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCLickShare = (event) => {
    setShowShare(true);
    handleClick(event);
  };

  const handleCLickNotif = (event, project) => {
    setProject(project)
    setShowShare(false);
    handleClick(event);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card style={styles.container}>
      <div style={styles.projectBar}>
        <Typography>Projects</Typography>
        <IconButton
          aria-describedby={id}
          onClick={handleCLickShare}
          style={{ color: "white" }}
          fontSize="small"
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
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

        {showShare ? (
          <NewProject handleClose={handleClose} />
        ) : (
          <AddNewTask handleClose={handleClose} />
        )}
      </Popover>

      <List disablePadding>
        {projectObj.projects.projects.map((project) => (
          <div key={project._id}>
            <Accordion square>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{project.name}</Typography>
              </AccordionSummary>
              {project.tasks.map((task, i) => (
                <AccordionDetails key={i}>
                  <Typography style={{ paddingLeft: 4 }}>
                    {task.name}
                  </Typography>
                </AccordionDetails>
              ))}

              <Button aria-describedby={id}
                onClick={(event) => handleCLickNotif(event, project)}
                style={{ paddingLeft: 16 }} >Add new task <AssignmentIcon fontSize='small' /></Button>


            </Accordion>
          </div>
        ))}
      </List>

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

        {showShare ? (
          <NewProject handleClose={handleClose} />
        ) : (
          <AddNewTask handleClose={handleClose} project={project} />
        )}
      </Popover>
    </Card>
  );
};

export default SideView;
