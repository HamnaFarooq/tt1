import React, { useEffect, useState } from "react";
import Dashboard from "../components/myProjects/Dashboard";
import SideView from "../components/myProjects/SideView";
import Signup from "../components/myProjects/Signup";
import TaskCreate from "../components/myProjects/TaskCreate";
import Timeline from "../components/myProjects/Timeline";
import { useSelector } from "react-redux";
import Loading from "react-fullscreen-loading";

const Home = (props) => {
  console.log("props", props);
  const isAuthenticatedVal = useSelector((state) => state.auth);
  const projectObj = useSelector((state) => state.project);
  const [loading, setLoading] = useState(true);
  // console.log("projects: ", projectObj.projects?.projects?.length)
  useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    }, 3000);
  });
  if(loading)
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
        {isAuthenticatedVal.isAuthenticated ? (
          projectObj.projects?.projects?.length > 0 ? (
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
        {isAuthenticatedVal.isAuthenticated &&
          projectObj.projects?.projects?.length > 0 && (
            <Dashboard projects={projectObj.projects.projects} />
          )}
      </div>
    </div>
  );
};

export default Home;
