import React, { useEffect, useState } from "react";
import Dashboard from "../components/myProjects/Dashboard";
import SideView from "../components/myProjects/SideView";
import Signup from "../components/myProjects/Signup";
import TaskCreate from "../components/myProjects/TaskCreate";
import Timeline from "../components/myProjects/Timeline";
import { useSelector } from "react-redux";
import Loading from "react-fullscreen-loading";
import { ToastContainer, toast } from "react-toastify";


const Home = (props) => {
  console.log("props", props);
  const isAuthenticatedVal = useSelector((state) => state.auth);
  const projectObj = useSelector((state) => state.project);
  // console.log("projects: ", projectObj.projects?.projects?.length)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    }, 3000);
  },[loading]);
  if(loading || isAuthenticatedVal.loading)
  {
      return <Loading loading background="" loaderColor="#000000" />
  }
      
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* <div style={{ width: "20%" }}> */}

      <div>
        {localStorage.getItem("isAthenticated") ? (
          localStorage.getItem("localproject") ? (
            <SideView />
          ) : (
            <TaskCreate />
          )
        ) : (
          <TaskCreate />
        )}
        {/* {projectObj.projects.projects.length === 0 ? <TaskCreate /> : <SideView />} */}
      </div>
      {/* <div style={{ width: "78%" }}> */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        {/* {console.log("projets: ", projectObj.projects.projects.length)} */}
        {localStorage.getItem("isAthenticated") &&
          projectObj.projects?.projects?.length > 0 && (
            <Dashboard projects={projectObj.projects.projects} />
          )}
      </div>
    </div>
  );
};

export default Home;
