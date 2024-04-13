import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../utils/API.js";
import {
  Alert,
} from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();

  const [pseudo, setpseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [popup, setPopup] = useState();

  function load(){
    if (password === cPassword){
      log(pseudo, email, password)
    }else{
      setPopup("les deux passwords ne sont pas les mêmes")
    }
    
  }

  async function log(pseudo, email, password){
    let result = await API.register(pseudo, email, password)
    if (result){
      setPopup(result.data)
    }else{
      navigate("/login");
      navigate(0);
    }
  }

  return (
    <>
      <section className="h-full">
        <div className="container px-6 pt-20">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* <!-- Left column container with background--> */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone"
              />
            </div>

            {/* <!-- Right column container with form --> */}
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12 text-white">
              <div>{popup ? <Alert id="error" severity="error">{popup}</Alert> : ""}aa</div>
            
              <form onSubmit={(e) => e.preventDefault()}>
                {/* <!-- Name input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <div className="flex gap-2 ">
                    <div>
                      <label className="" htmlFor="pseudo">
                        First Name
                      </label>
                      <input
                        className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                        type="text"
                        id="pseudo"
                        placeholder="First Name"
                        required
                        minLength={2}
                        value={pseudo}
                        onChange={(e) => setpseudo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- Email input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <label className="" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                    id="email"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <div className="flex gap-2 ">
                    <div>
                      <label className="" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="" htmlFor="cPassword">
                        Confirm Password
                      </label>
                      <input
                        className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                        type="password"
                        id="cPassword"
                        placeholder="Confirm Password"
                        required
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {cPassword === password || cPassword.length < 1 ? (
                  ""
                ) : (
                  <span className="text-red-600 text-center pb-2">
                    Confirm Password not matched!
                  </span>
                )}

                <div className="create-account mb-4">
                  <span>
                    Already have account ?{" "}
                    <Link
                      to={".././login"}
                      className="underline text-blue transition duration-150 ease-in-out hover:text-blue-500 focus:text-blue-500 active:text-blue-700 mx-2"
                    >
                      Login Here
                    </Link>
                  </span>
                </div>
                {/* <!-- Submit button --> */}
                <button
                  id="sign-up"
                  className="inline-block w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={load}
                >
                  Sign up
                </button>
               
            
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
