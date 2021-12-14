import React, { useState, useEffect } from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import { dateForTimeline } from '../../store/action/date';
import { useDispatch } from 'react-redux';

function startDateSelector() {
    return (
        <div style={{ paddingRight: 16 }}>
            <TextField
                id="datetime-local"
                label="Start date"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
            />

        </div>
    )
}

function endDateSelector() {
    return (

        <div>
            <TextField
                id="datetime-local"
                label="End date"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    )
}


export default function DateRange() {

    const dispatch = useDispatch();

    const [dateMenu, toggleDateMenu] = useState(false)

    const [startDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

    const [startDateToUse, setStartDateToUse] = useState(startDate);
    const [endDateToUse, setEndDateToUse] = useState(endDate);


    const handleChangeForStartDate = (e) => {
        setStartDate(e.target.value);
        // setStartDateToUse(e.target.value);
        setStartDateToUse(e.target.value);

        // dispatch(dateForTimeline({ startDateToUse: moment(e.target.value).format("MMMM Do YYYY"), endDateToUse }));
        dispatch(dateForTimeline({ startDateToUse: e.target.value, endDateToUse }));

    };

    const handleChangeForEndDate = (e) => {
        setEndDate(e.target.value);
        // setEndDateToUse(e.target.value);
        setEndDateToUse(e.target.value);

        dispatch(dateForTimeline({ startDateToUse, endDateToUse: e.target.value }));
    };



    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ paddingRight: 16 }}>
                    <Button onClick={() => toggleDateMenu(!dateMenu)}><DateRangeIcon style={{ paddingRight: 6 }} />{dateMenu ? "Confirm" : `${startDate} - ${endDate}`}</Button>
                </div>
            </div>

            {dateMenu && (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ paddingRight: 16 }}>
                        <TextField
                            value={startDate}
                            onChange={(e) => handleChangeForStartDate(e)}
                            id="datetime-local"
                            label="Start date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </div>
                    <div>
                        <TextField
                            value={endDate}
                            onChange={(e) => handleChangeForEndDate(e)}
                            id="datetime-local"
                            label="End date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
            )}


        </div>

    )
};