import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_TASK } from "../mutations/taskMutations";
import { useNavigate } from "react-router-dom";
export default function TaskRow({ client }) {
  const navigate = useNavigate();

  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { id: client._id },
    onCompleted: () => navigate("/"),
  });

  return (
    <tr onClick={() => navigate("/task", { state: client })}>
      <td>{client.name}</td>
      <td>{client.description}</td>
      <td>{client.status}</td>
      <td>
        <button className="btn btn-danger btn-sm">view</button>
      </td>
    </tr>
  );
}
