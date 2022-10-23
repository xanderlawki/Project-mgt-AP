import { useQuery } from "@apollo/client";
import TaskRow from "./TaskRow";
import Spinner from "./Spinner";
import { GET_TASKS } from "../queries/taskQueries";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
export default function Tasks({ task, setTask, reload }) {
  const [loader, setLoader] = useState(false);

  let userData = {};
  if (typeof localStorage !== "undefined") {
    const user = localStorage.getItem("pmData");
    if (user !== null) {
      const data = JSON.parse(user);
      userData = data;
      console.log(userData, "data");
    }
  }

  const handleGetTask = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(`${baseUrl}/task/${userData.id}`);
      console.log(data);
      setTask(data.data);
      setLoader(false);
    } catch (err) {}
  };
  useEffect(() => {
    handleGetTask();
  }, []);

  useEffect(() => {
    handleGetTask();
  }, [reload]);
  return (
    <>
      <h4>Task Informaton</h4>
      {task.length > 0 ? (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!loader ? (
              task.map((client) => <TaskRow key={client.id} client={client} />)
            ) : (
              <Spinner />
            )}
          </tbody>
        </table>
      ) : (
        <p>no task found</p>
      )}
    </>
  );
}
