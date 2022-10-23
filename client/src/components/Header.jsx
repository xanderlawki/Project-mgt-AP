import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const token = localStorage.getItem("pmToken");
  let loggedIn = false;

  if (token) {
    loggedIn = true;
  }
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("pmToken");

    navigate("/login");
  };
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>ProjectMgmt</div>
          </div>
        </a>

        {loggedIn && (
          <button
            className="btn btn-secondary"
            style={{ margin: "10px" }}
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}
