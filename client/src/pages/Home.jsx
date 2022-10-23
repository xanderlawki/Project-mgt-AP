import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import AddTaskModal from "../components/AddTaskModal";
import Tasks from "../components/Tasks";
import { useState } from "react";
export default function Home() {
  const [task, setTask] = useState([]);
  const [reload, setReload] = useState(false);
  let userData = {};
  if (typeof localStorage !== "undefined") {
    const user = localStorage.getItem("pmData");
    if (user !== null) {
      const data = JSON.parse(user);
      userData = data;
      console.log(userData, "data");
    }
  }
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        {userData.isAdmin && <AddClientModal />}
        {userData.isAdmin && <AddProjectModal />}
        {!userData.isAdmin && (
          <AddTaskModal
            setTask={setTask}
            task={task}
            setReload={setReload}
            reload={reload}
          />
        )}
      </div>
      <Projects />
      <hr />
      {userData.isAdmin && <Clients />}
      {!userData.isAdmin && (
        <Tasks task={task} setTask={setTask} reload={reload} />
      )}
    </>
  );
}
