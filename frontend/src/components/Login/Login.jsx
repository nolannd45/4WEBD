import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../utils/API.js";
import { Alert } from "@mui/material";

const Login = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState();
  const navigate = useNavigate();

  function load() {
    log(pseudo, password);
  }

  async function log(pseudo, password) {
    let result = await API.login(pseudo, password);

    if (!result.token) {
      setPopup(result);
    } else {
      localStorage.setItem("token", result["token"]);
      localStorage.setItem("user", JSON.stringify(result["user"]));
      if (localStorage.getItem("user")) {
        navigate("/");
        navigate(0);
      }
    }
  }

  return (
    <>
      <section className="h-full">
        <h1 className="text-3xl font-bold text-yellow-300">Akkor Hotel Itd</h1>
        <div className="container px-6 pt-10 text-white">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* <!-- Left column container with background--> */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="anImage"
              />
            </div>

            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form onSubmit={(e) => e.preventDefault()}>
                {popup ? <Alert severity="error">{popup}</Alert> : ""}
                {/* <!-- Pseudo input --> */}

                <div
                  className="relative mb-6 mt-6 flex flex-col"
                  data-te-input-wrapper-init
                >
                  <label className="text-start " htmlFor="pseudo">
                    Pseudo
                  </label>
                  <input
                    className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                    type="pseudo"
                    id="pseudo"
                    placeholder="Pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                  />
                </div>
                {/* <!-- Password input --> */}
                <div
                  className="relative mb-6 flex flex-col"
                  data-te-input-wrapper-init
                >
                  <label className="text-start" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="create-account mb-4">
                  <span>
                    Don't have account ?{" "}
                    <Link
                      to={".././sign-up"}
                      className="underline text-blue transition duration-150 ease-in-out hover:text-blue-500 focus:text-blue-500 active:text-blue-700 mx-2"
                    >
                      Signup Here
                    </Link>
                  </span>
                </div>
                {/* <!-- Submit button --> */}
                <button
                id="connexion"
                  className="inline-block w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={load}
                >
                  Connexion
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
