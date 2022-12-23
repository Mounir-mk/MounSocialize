import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import eyeOpen from "../assets/eye.svg";
import eyeClosed from "../assets/eye-off.svg";

function Register() {
  const navigate = useNavigate();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [images, setImages] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    passwordConfirm: false,
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = () => {
    const userInformations = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const newErrors = {};
    if (!userInformations.firstname) {
      newErrors.firstname = "Le prénom est obligatoire";
    } else if (userInformations.firstname.length < 2) {
      newErrors.firstname = "Le prénom doit faire au moins 2 caractères";
    }
    if (!userInformations.lastname) {
      newErrors.lastname = "Le nom est obligatoire";
    } else if (userInformations.lastname.length < 2) {
      newErrors.lastname = "Le nom doit faire au moins 2 caractères";
    }
    if (!userInformations.email) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/\S+@\S+\.\S+/.test(userInformations.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!userInformations.password.length) {
      newErrors.password = "Le mot de passe est obligatoire";
    } else if (userInformations.password.length < 8) {
      newErrors.password = "Le mot de passe doit faire au moins 8 caractères";
    }
    if (userInformations.password !== passwordConfirmRef.current.value) {
      newErrors.passwordConfirm = "Les mots de passe ne correspondent pas";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Make a POST request to the server to register the user
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, userInformations)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <main className="w-screen  flex justify-center items-center h-screen md:bg-blue-dianne">
      <div className="w-[80%] h-[calc(100vh_-_64px)] rounded-lg flex justify-center items-center p-4">
        <section className="h-full w-full flex gap-10 flex-col md:flex-row">
          <article
            id="login_image"
            className="h-full md:w-1/2 pb-4 md:pb-0 hidden md:flex md:justify-center md:items-center"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="file"
                className="bg-white text-blue-dianne font-bold py-2 px-4 rounded-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="ml-2">Choisir une image</span>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setImages(e.target.files[0]);
                }}
              />
            </div>
            <img
              src={
                images
                  ? URL.createObjectURL(images)
                  : "https://via.placeholder.com/150"
              }
              alt="image2"
              className="h-32 w-32 rounded-full"
            />
          </article>
          <article
            id="login"
            className="bg-white h-full md:w-1/2 flex flex-col md:gap-2 md:p-4 rounded-lg justify-evenly"
          >
            <h1 className="text-2xl font-bold text-center">Inscription</h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label htmlFor="fistname" className="font-bold">
                Prénom
              </label>
              <input
                type="fistname"
                name="fistname"
                id="fistname"
                className={`border-2 rounded-lg p-2 ${
                  errors.firstname ? "border-red-500" : "border-black"
                }`}
                placeholder="John"
                ref={firstnameRef}
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname}</p>
              )}
              <label htmlFor="lastname" className="font-bold">
                Nom
              </label>
              <input
                type="lastname"
                name="lastname"
                id="lastname"
                className={`border-2 rounded-lg p-2
                 ${errors.lastname ? "border-red-500" : "border-black"}`}
                placeholder="Doe"
                ref={lastnameRef}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm">{errors.lastname}</p>
              )}
              <label htmlFor="email" className="font-bold">
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
              <label htmlFor="password" className="font-bold">
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
              <div className="relative w-full">
                <label htmlFor="passwordConfirm" className="font-bold">
                  Confirmer le mot de passe
                </label>
                <input
                  type={isPasswordVisible.passwordConfirm ? "text" : "password"}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  className="border-2 border-black rounded-lg p-2 w-full"
                  placeholder="********"
                  ref={passwordConfirmRef}
                />
                <button
                  type="button"
                  className="absolute right-0 mr-2 focus:outline-none translate-y-1/2"
                  onClick={() =>
                    setIsPasswordVisible({
                      ...isPasswordVisible,
                      passwordConfirm: !isPasswordVisible.passwordConfirm,
                    })
                  }
                >
                  <img
                    src={
                      isPasswordVisible.passwordConfirm ? eyeClosed : eyeOpen
                    }
                    alt="eye"
                    className="w-6 h-6"
                  />
                </button>
              </div>
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>
              )}
              <button
                type="submit"
                className="bg-blue-dianne text-white rounded-lg p-2"
              >
                S'inscrire
              </button>
            </form>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Register;
