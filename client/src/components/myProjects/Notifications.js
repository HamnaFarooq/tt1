import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import RemoveIcon from '@material-ui/icons/Remove';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import EditIcon from '@material-ui/icons/Edit';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import CancelIcon from "@material-ui/icons/Cancel";



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

export default function Notifications({ handleClose }) {


    const data = [
        { id: 0, name: "Mohammad", action: "commented on", project: "Economics", task: "Test-1", description: "We've aligned this date to make the most sense", time: "yestereday-3pm" },
        { id: 1, name: "Mohammad", action: "deleted", project: "Economics", task: "Test-2", description: "Test 2 on 12/12 has been removed and is no longger part of schedule", time: "2 weeks" },
        { id: 2, name: "Mohammad", action: "shared", project: "Economics and Science", description: "Economics and science were shared", time: "1 month" },
        { id: 3, name: "Mohammad", action: "edited", project: "Economics", task: "Exam", description: "Attachment was added. Note was edited and date was changed to 11/27", time: "1 month" },
        { id: 4, name: "Mohammad", action: "added", project: "Economics", task: "Exam-5", description: "Exam 5 was added to Economics with a due date of 11/27", time: "1 month" },
    ];

    return (
        <Paper elevation={3} style={{ overflow: 'hidden', display: 'flex', flexDirection: "column", width: 500 }}>
            <div style={styles.projectBar}>
                <Typography >Notifications</Typography>
                <IconButton
                    style={{ color: "white" }}
                    fontSize="small"
                    onClick={handleClose}
                >
                    <CancelIcon fontSize="small" />
                </IconButton>
            </div>
            <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    {data.map(element => (
                        <div key={element.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    {element.action === "commented on" && (<CommentIcon />)}
                                    {element.action === "deleted" && (<RemoveIcon />)}
                                    {element.action === "shared" && (<MobileScreenShareIcon />)}
                                    {element.action === "edited" && (<EditIcon />)}
                                    {element.action === "added" && (<NoteAddIcon />)}
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${element.name} ${element.action} ${element.task ? element.task : ""} ${element.project} `}
                                    secondary={
                                        <React.Fragment>
                                            {element.description}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <div style={{ paddingLeft: 70, paddingBottom: 8, marginTop: -8 }}>
                                <Typography name="time" variant="caption">{element.time}</Typography>
                            </div>
                            <div style={styles.notificationBar}>&nbsp;</div>
                        </div>
                    ))}
                </div>

            </div>
        </Paper>
    )
}