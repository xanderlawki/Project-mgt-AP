import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_TASK } from "../mutations/taskMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_TASK, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" /> Delete
      </button>
    </div>
  );
}
