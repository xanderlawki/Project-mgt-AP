import { Link, useParams, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";

export default function Task() {
  const { state } = useLocation();

  console.log(state, "sssss");

  return (
    <>
      <div className="mx-auto w-75 card p-5">
        <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
          Back
        </Link>

        <h1>{state.name}</h1>
        <p>{state.description}</p>

        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{state.status}</p>

        <ClientInfo client={state.clientId} />

        <EditProjectForm project={state} />

        <DeleteProjectButton projectId={state._id} />
      </div>
    </>
  );
}
