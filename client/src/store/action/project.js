import { PROJECT_CREATED, TASK_CREATED, GET_PROJECTS, PROJECT_DELETED,SINGLE_PROJECT, TASK_DELETED, TASK_EDITED, USERS_COMMENT, TASK_DUPLICATED } from "../constants/actionTypes";
import axios from "axios";
import socket from "../../utils/socketConn";

export const createProject = (name, tasks, priority) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { name, tasks, priority };

    try {
        const res = await axios.post('/api/projects', body, config);
        dispatch({ type: PROJECT_CREATED, payload: res.data });

    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}


export const createTask = (project_id, tasks, editType) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { tasks, editType };

    try {
        const res = await axios.put(`/api/projects/${project_id}`, body, config);
        socket._instance && socket._instance.emit('notification', res.data)
        dispatch({ type: TASK_CREATED, payload: res.data });
        getAllProjects();
        console.log("task created successfully");

    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}


export const editTask = (project_id, task_id, projectName, comments, task, editType, priority) => async dispatch => {
   const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { name: projectName, task, comments, editType, priority };

    try {
        const res = await axios.patch(`/api/projects/${project_id}/${task_id}`, body, config);
        const resTwo = await axios.post(`/api/projects/priority/${project_id}/`, body, config);
        dispatch({ type: TASK_EDITED, payload: resTwo.data });
        console.log("task edited, priority changed and dispatched")
    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}



//Get all users who commented on a selected project
export const getAllUsersWhoCommented = (project_id) => async dispatch => {

    try {
        const res = await axios.get(`/api/projects/${project_id}`);

        dispatch({ type: USERS_COMMENT, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};
export const getSingleProject= (project_id) => async dispatch => {

    try {
        const res = await axios.get(`/api/projects/single_project/${project_id}`);
        let data = []
        data.push(res.data)
        console.log("resssss",data)
        dispatch({ type: SINGLE_PROJECT, payload: data });
    } catch (err) {
        console.log(err);
    }
};


//Get all projects of user
export const getAllProjects = () => async dispatch => {

    try {
        const res = await axios.get('/api/projects');
        console.log("getting all projects");
        dispatch({ type: GET_PROJECTS, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};



// //share project
// export const shareProject = (project_id, email) = async dispatch => {

//     try {

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         const body = { email };

//         const res = await axios.post(`/api/projects/share/${project_id}`, body, config);
//         //res not utilized
//         console.log("Task shared");

//     } catch (err) {
//         console.log(err)
//     }
// }



export const shareProject = (project_id,project_name, email, shareType, authDetail) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let userData = {
        email: email,
        projectName: project_name,
        shareType: shareType,
        senderData:authDetail
    }

    const body = { userData };

    try {
        const res = await axios.post(`/api/projects/share/${project_id}`, body, config);
        // dispatch({ type: TASK_EDITED, payload: res.data });
        console.log("res",res)
        if(res.status===200){
            alert("Project shared")
        }
    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}



//Delete task
export const deleteTask = (project_id, task_id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.delete(`/api/projects/${project_id}/${task_id}`);

        console.log("task deleted")

        dispatch({ type: TASK_DELETED, payload: res.data });        

    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}



//Duplicate a task
export const duplicateTask = (project_id, task) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { task };

    try {
        const res = await axios.post(`/api/projects/${project_id}`, body, config);
        // socket._instance && socket._instance.emit('notification', res.data)
        dispatch({ type: TASK_DUPLICATED, payload: res.data });
        console.log("task duplicated");

    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}