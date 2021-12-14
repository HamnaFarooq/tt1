import { DATE_SENT } from "../constants/actionTypes";

const INIT_STATE = {
    date: {
        startDateToUse: new Date(),
        endDateToUse: new Date()
    }
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case DATE_SENT:
            return { ...state, date: action.payload };

        default:
            return state;
    }
}