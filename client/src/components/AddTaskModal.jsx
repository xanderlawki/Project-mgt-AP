import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import axios from "axios";
import { baseUrl } from "../config";
export default function AddTaskModal({ setTask, setReload, reload }) {
  let userData = {};
  if (typeof localStorage !== "undefined") {
    const user = localStorage.getItem("pmData");
    if (user !== null) {
      const data = JSON.parse(user);
      userData = data;
      console.log(userData, "data");
    }
  }
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("new");

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_PROJECTS);
  console.log(data, "data");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    try {
      const { data } = await axios.post(`${baseUrl}/task`, {
        name,
        description,
        clientId: userData.id,
        projectId,
        status,
      });
      console.log(data.data);

      setReload(!reload);
      setTask((task) => [...task, { ...data.data }]);

      console.log(data);
    } catch (error) {}

    setName("");
    setDescription("");
    setStatus("new");
    setProjectId("");
  };

  if (loading) return null;
  if (error) return "Something Went Wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addTaskModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Task</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addTaskModal"
            aria-labelledby="addTaskModal"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addTaskModal">
                    New Task
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Project</label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                      >
                        <option value="">Select Project</option>
                        {data.projects.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
