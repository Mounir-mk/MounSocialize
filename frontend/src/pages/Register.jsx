import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePicture from "../components/Register/ProfilePicture";
import RegisterForm from "../components/Register/RegisterForm";

function Register() {
  const navigate = useNavigate();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [profilePicture, setProfilePicture] = useState(null);
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
      image: URL.createObjectURL(profilePicture),
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
          navigate("/image");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <main className="w-screen  flex justify-center items-center h-screen md:bg-blue-dianne md:py-0 pt-8">
      <div className="w-[80%] rounded-lg flex justify-center items-center pt-4 pb-4 md:py-0">
        <section className="h-full w-full flex gap-2 md:gap-10 flex-col md:flex-row justify-center items-center">
          <article
            id="login"
            className="bg-white h-full md:w-1/3 flex flex-col md:gap-2 md:p-4 rounded-lg justify-evenly items-center"
          >
            <h1 className="text-2xl font-bold text-center">Inscription</h1>
            <ProfilePicture
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
            />
            <RegisterForm
              firstnameRef={firstnameRef}
              lastnameRef={lastnameRef}
              emailRef={emailRef}
              passwordRef={passwordRef}
              passwordConfirmRef={passwordConfirmRef}
              isPasswordVisible={isPasswordVisible}
              setIsPasswordVisible={setIsPasswordVisible}
              errors={errors}
              handleSubmit={handleSubmit}
            />
          </article>
        </section>
      </div>
    </main>
  );
}

export default Register;
