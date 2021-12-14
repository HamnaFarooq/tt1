import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';

import { InputLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import CancelIcon from "@material-ui/icons/Cancel";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment';

import DateRangeIcon from '@material-ui/icons/DateRange';
import { Popover } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createTask } from '../../store/action/project';


const styles = {
    row: { display: 'flex', flexDirection: 'row' },
    projectBar: {
        display: "flex",
        backgroundColor: "#042f66",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        paddingLeft: 12,
    },
    notificationBar: {
        display: "flex",
        backgroundColor: "grey",
        background: "#ebebe0",
        height: 1
    },
}

console.log("hello")
export default function AddNewTask({ project, handleClose }) {

    const dispatch = useDispatch();
    console.log("project id is: --------------> ", project)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [startDate, setStartDate] = useState(moment(new Date()).format("DD/MM/YYYY"));
    const [endDate, setEndDate] = useState(moment(new Date()).format("DD/MM/YYYY"));

    const [startDateToUse, setStartDateToUse] = useState(startDate);
    const [endDateToUse, setEndDateToUse] = useState(endDate);

    // const [dateDisabler, toggleDateDisabler] = useState(false);
    const [rememberChecked, setRememberChecked] = useState(false);


    const handleChangeForStartDate = (e) => {
        setStartDate(e.target.value);
        // setStartDateToUse(e.target.value);
        setStartDateToUse(moment(e.target.value).format("DD MM YYYYThh:mm"));   //change format to DD/MM/YYYY

        // dispatch(dateForTimeline({ startDateToUse: moment(e.target.value).format("MMMM Do YYYY"), endDateToUse }));
    };

    const handleChangeForEndDate = (e) => {
        setEndDate(e.target.value);
        // setEndDateToUse(e.target.value);
        setEndDateToUse(moment(e.target.value).format("DD MM YYYYThh:mm")); //change format to DD/MM/YYYY
    };


    const tasks = {
        name,
        description,
        startDate: startDateToUse, //change format
        endDate: endDateToUse //change format
    }

    let editType = "added";
    console.log(tasks);

    const executeCreateTask = () => {
        if (startDateToUse === '' || startDateToUse === null || startDateToUse === undefined || !startDateToUse) {
            console.log("running if condition")
            // setStartDateToUse(endDateToUse)
        }
        // !rememberChecked && setStartDateToUse(endDateToUse)

        dispatch(createTask(project._id, tasks, editType))
        handleClose()
    }

    // console.log("unusable dates are: ", startDate, endDate);

    console.log("** usable start date is: ", startDateToUse);
    console.log("** usable end date is: ", endDateToUse);


    return (
        <Paper elevation={3} style={{ overflow: 'hidden', display: 'flex', flexDirection: "column", width: 500 }}>
            <div style={styles.projectBar}>
                <Typography >Add new task</Typography>
                <IconButton
                    style={{ color: "white" }}
                    fontSize="small"
                    onClick={handleClose}
                >
                    <CancelIcon fontSize="small" />
                </IconButton>
            </div>
            <div style={{ padding: 16 }}>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {/* <Button aria-describedby={id}
                            onClick={handleClick}
                            size="small"
                        ><DateRangeIcon /></Button> */}
                    </div>

                    <div>
                        <InputLabel style={{ margin: 8 }}>Description</InputLabel>
                    </div>
                    <div>
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            size="small"
                            placeholder="Name"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            id="datetime-local"
                            label="Start date"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            value={startDate}
                            onChange={(e) => handleChangeForStartDate(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {/* <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberChecked}
                                    onChange={() => setRememberChecked(!rememberChecked)}
                                    name="selectStartDate"
                                    color="primary"
                                />
                            }
                            label="select start date"
                        /> */}
                    </div>

                    <div>
                        <TextField
                            id="datetime-local"
                            label="Due date"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            value={endDate}
                            onChange={(e) => handleChangeForEndDate(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
            </div>
            <Button onClick={() => executeCreateTask()} color="primary" size="small">
                Done
            </Button>

        </Paper>

    )
}