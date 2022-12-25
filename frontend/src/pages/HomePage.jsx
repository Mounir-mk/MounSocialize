import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";

function HomePage() {
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        console.warn(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="bg-gray-100">
      <main className="container mx-auto ">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to MounSocialize
        </h1>
        <div className="flex flex-wrap -mx-2" />
      </main>
    </div>
  );
}

export default HomePage;
