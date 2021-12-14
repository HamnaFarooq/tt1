import { DATE_SENT } from "../constants/actionTypes";

export const dateForTimeline = (date) => dispatch => {
    dispatch({ type: DATE_SENT, payload: date });
}