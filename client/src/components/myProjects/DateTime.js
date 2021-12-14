import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import CancelIcon from "@material-ui/icons/Cancel";

export default function DateTime({ handleClose }) {

    const [state, setState] = useState({
        checkedB: true,
    });

    const [startDate, toggleStartDate] = useState(false);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const styles = {
        row: { display: 'flex', flexDirection: 'row' },
        projectBar: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
        },
    }

    return (
        <div>

            <Paper elevation={3} style={{ overflow: 'hidden', display: 'flex', flexDirection: "column", width: state.checkedB || startDate ? 550 : 320 }}>
                <div style={styles.projectBar}>
                    <IconButton
                        style={{ color: "#042f66" }}
                        fontSize="small"
                        onClick={handleClose}
                    >
                        <CancelIcon fontSize="small" />
                    </IconButton>
                </div>
                <div style={{ padding: 16 }}>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ paddingRight: 16 }}>
                            <TextField
                                id="datetime-local"
                                label="Due date"
                                type={state.checkedB ? "datetime-local" : "date"}
                                defaultValue={state.checkedB ? "2017-05-24T10:30" : "2017-05-24"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>
                        <div>
                            {startDate && (
                                <TextField
                                    id="datetime-local"
                                    label="Start date"
                                    type={state.checkedB ? "datetime-local" : "date"}
                                    defaultValue={state.checkedB ? "2017-05-24T10:30" : "2017-05-24"}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.checkedB}
                                    onChange={handleChange}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Add time"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={startDate}
                                    onChange={() => toggleStartDate(!startDate)}
                                    name="startDate"
                                    color="primary"
                                />
                            }
                            label="Add Start Date"
                        />
                    </div>

                </div>
            </Paper>

        </div>
    )
}