import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import eyeOpen from "../assets/eye.svg";
import eyeClosed from "../assets/eye-off.svg";

function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    passwordConfirm: false,
  });
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});
  const handleSubmit = () => {
    const userInformations = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const newErrors = {};
    if (!userInformations.email) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/\S+@\S+\.\S+/.test(userInformations.email)) {
      newErrors.email = "L'email est invalide";
    }
    if (!userInformations.password.length) {
      newErrors.password = "Le mot de passe est obligatoire";
    } else if (userInformations.password.length < 8) {
      newErrors.password = "Le mot de passe doit faire au moins 8 caractères";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Make a POST request to the server to register the user
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/login`, userInformations)
        .then((result) => {
          if (result.data.token) {
            localStorage.setItem("token", result.data.token);
            navigate("/homepage");
            console.warn(result.data.token, "token", "connected");
          } else {
            newErrors.match = "L'email ou le mot de passe est incorrect";
            setErrors(newErrors);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <main className="w-screen flex justify-center items-center h-screen md:bg-blue-dianne md:py-0 pt-8">
      <section className="h-max-full flex gap-2 md:gap-10 flex-col md:flex-row justify-center items-center">
        <article
          id="login"
          className="bg-white h-full flex flex-col gap-6 md:p-8 rounded-lg justify-evenly items-center"
        >
          <h1 className="text-2xl font-bold text-center">Connexion</h1>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label
              htmlFor="email"
              className="font-bold after:content-['*'] after:text-red-500 after:ml-1"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={`border-2 rounded-lg p-2 ${
                errors.email ? "border-red-500" : "border-black"
              }`}
              placeholder="johnDoe@email.com"
              ref={emailRef}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <label
              htmlFor="password"
              className="font-bold after:content-['*'] after:text-red-500 after:ml-1"
            >
              Mot de passe
            </label>
            <div className="relative w-full">
              <input
                type={isPasswordVisible.password ? "text" : "password"}
                name="password"
                id="password"
                className={`border-2 rounded-lg p-2 w-full ${
                  errors.password ? "border-red-500" : "border-black"
                }`}
                placeholder="********"
                ref={passwordRef}
              />
              <button
                type="button"
                className="absolute right-0 mr-2 focus:outline-none translate-y-1/2"
                onClick={() =>
                  setIsPasswordVisible({
                    ...isPasswordVisible,
                    password: !isPasswordVisible.password,
                  })
                }
              >
                <img
                  src={isPasswordVisible.password ? eyeClosed : eyeOpen}
                  alt="eye"
                  className="w-6 h-6"
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            {errors.match && (
              <p className="text-red-500 text-sm">{errors.match}</p>
            )}
            <button
              type="submit"
              className="bg-blue-dianne text-white rounded-lg p-2"
            >
              Se connecter
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}

export default LoginPage;
