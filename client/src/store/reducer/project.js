import { PROJECT_CREATED, TASK_CREATED, GET_PROJECTS, PROJECT_DELETED, TASK_DELETED, TASK_EDITED, TASK_DUPLICATED, USERS_COMMENT } from "../constants/actionTypes";

const INIT_STATE = {
    project: {}, //the project being currently worked upon
    projects: [], //all projects of logged in user
    usersWhoCommented: [] //users who commented on selected project
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case PROJECT_CREATED:
            let nstate = { ...state };
            nstate.projects.projects = [
                ...nstate.projects.projects, action.payload.project,
            ];
            return { ...nstate };

        case TASK_CREATED:
            const index = state.projects.projects.findIndex(
                (p) => action.payload.newestproject._id === p._id
            );
            const newState = { ...state, project: action.payload.newestproject };
            index > -1 &&
            (newState.projects.projects[index] = action.payload.newestproject );
            return { ...newState };

        case GET_PROJECTS:
            return { ...state, projects: action.payload };

        case PROJECT_DELETED:
            return { ...state, project: {} };

        case TASK_DELETED:
            let prIndex = -1
            let tsIndex = -1
            state.projects.projects.map((p, x) => {
                if(p._id === action.payload.project_id){
                    prIndex = x
                    p.tasks.map((element, i) => {
                        if(element._id === action.payload.task_id){
                            tsIndex = i;
                        }
                    });
                }
            })
            let test = state.projects.projects[prIndex].tasks.splice(tsIndex, 1)
            return { ...state, project: action.payload };

        case TASK_EDITED:
            // let i = state.projects.projects.findIndex(
            //     (p) => action.payload._id === p._id
            // );
            // let newStatee = { ...state, project: action.payload };
            // i > -1 &&
            // (newStatee.projects.projects[i] = action.payload );
            // return { ...newStatee };
            // console.log("adksa", action.payload)
            // return { ...state, projects: action.payload };

        case TASK_DUPLICATED:
            let i = state.projects.projects.findIndex(
                (p) => action.payload._id === p._id
            );
            let newStatee = { ...state, project: action.payload };
            i > -1 &&
            (newStatee.projects.projects[i] = action.payload );
            return { ...newStatee };

        case USERS_COMMENT:
            return { ...state, usersWhoCommented: action.payload };

        default:
            return state;
    }
}