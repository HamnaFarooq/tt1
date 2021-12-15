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
  const d = new Date();
  const [inputList, setInputList] = useState([ {name: "",
    description: '',
    // startDate: dateValueObj.date.startDateToUse,
    // endDate: dateValueObj.date.endDateToUse
    startDate: moment(d).format('DD MM YYYYThh:mm'),
    endDate: moment(d).format('DD MM YYYYThh:mm'),
    }]);

  const dateValueObj = useSelector(state => state.date);
  
	const handleInputChange = (e, index) => {
		console.log("e.target",e.target)
	const {name, value } = e.target;
	const list = [...inputList];
	console.log("List",list)
	list[index].name = value;
	setInputList(list);
	};


  const createProjectAndReinitializeFields = () => {
	  console.log("inputList",inputList);
    dispatch(createProject(projectName, inputList, priority));
    setProjectName('');
    setTaskName('');
    handleClose()
  }
  const handleAddClick = () => {
	  const d = new Date();
  setInputList([...inputList, {name: "",
    description: '',
    // startDate: dateValueObj.date.startDateToUse,
    // endDate: dateValueObj.date.endDateToUse
    startDate: moment(d).format('DD MM YYYYThh:mm'),
    endDate: moment(d).format('DD MM YYYYThh:mm'),
    }]);
};

const handleChangeForStartDate = (startDate,index) =>{
	const list = [...inputList];
	console.log("List",list)
	list[index].startDate = moment(startDate).format('DD MM YYYYThh:mm');
	setInputList(list);
}

const handleChangeForEndDate = (endDate, index) =>{
	const list = [...inputList];
	console.log("List",list)
	list[index].endDate = moment(endDate).format('DD MM YYYYThh:mm');
	setInputList(list);
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
            maxHeight: 480,
            height: "100%",
            overflow: "auto"
          }}
        >
          <div style={{ paddingTop: 8, paddingBottom: 24 }}>
            <InputLabel style={{ margin: 8 }}>Project</InputLabel>
            <TextField variant="outlined" size="small" placeholder="Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          </div>
		  <Button onClick={() => { handleAddClick() }} color="primary" size="small">
          Add Task
        </Button>
		{
			inputList.map((item,index)=>{
				return(
          <div key={index} style={{ paddingTop: 8, paddingBottom: 8 }}>
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
                value={item.name}
                onChange={(e) => handleInputChange(e, index)}
              />
              <InputLabel style={{ marginLeft: 8, marginTop: 10 }}>Date</InputLabel>

              <DateRange handleChangeStartDate={handleChangeForStartDate} index={index} handleChangeEndDate={handleChangeForEndDate} />

            </div>
	
          </div>
          		)
            })
          }
        </div>
		
        <Button onClick={() => { createProjectAndReinitializeFields() }} color="primary" size="small">
          Done
        </Button>

      </div>
    </Card>
  );
};

export default NewProject;
