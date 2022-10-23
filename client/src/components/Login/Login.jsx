import React, { useState } from "react";
import "./LoginUi.css";
import profile from "../assets/person.png";
import email from "../assets/email.jpg";
import pass from "../assets/pass.png";
import axios from "axios";
import { baseUrl } from "../../config";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
function LoginUi() {
  const [dataObj, setDataObj] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);

  const history = useNavigate();

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const { data } = await axios.post(`${baseUrl}/auth/login`, dataObj);
      console.log(data);
      localStorage.setItem("pmToken", data.accessToken);
      localStorage.setItem(
        "pmData",
        JSON.stringify({
          email: data.email,
          isAdmin: data.isAdmin,
          name: data.name,
          phone: data.phone,
          id: data._id,
        })
      );
      history("/home");
      setLoader(false);
    } catch (err) {}
  };

  return (
    <>
      <div className="main">
        <div className="sub-main">
          <div>
            <div className="imgs">
              <div className="container-image">
                <img src={profile} alt="profile" className="profile" />
              </div>
            </div>
            <div>
              <h4>Login Page</h4>
              <div>
                <img src={email} alt="email" className="email" />
                <input
                  type="text"
                  placeholder="user name"
                  className="name"
                  onChange={(e) =>
                    setDataObj({ ...dataObj, email: e.target.value })
                  }
                />
              </div>
              <div className="second-input">
                <img src={pass} alt="pass" className="email" />
                <input
                  type="password"
                  placeholder="user name"
                  className="name"
                  onChange={(e) =>
                    setDataObj({ ...dataObj, password: e.target.value })
                  }
                />
              </div>
              <div className="login-button">
                <button className="btn btn-secondary" onClick={handleSubmit}>
                  {loader ? <Spinner /> : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
}

export default LoginUi;
