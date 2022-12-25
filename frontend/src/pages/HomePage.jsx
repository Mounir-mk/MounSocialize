import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";

function HomePage() {
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
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
      <nav className="bg-white p-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <p href="#" className="font-bold text-2xl">
            My Blog
          </p>
          <div>
            <p
              href="#"
              className="px-4 py-2 font-bold text-blue-700 rounded-full hover:bg-blue-100 hover:text-blue-800"
            >
              Home
            </p>
            <p
              href="#"
              className="px-4 py-2 font-bold text-blue-700 rounded-full hover:bg-blue-100 hover:text-blue-800"
            >
              About
            </p>
            <p
              href="#"
              className="px-4 py-2 font-bold text-blue-700 rounded-full hover:bg-blue-100 hover:text-blue-800"
            >
              Contact
            </p>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6 mt-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-gray-700 mb-8">
          Here you will find my thoughts and musings on a variety of topics.
        </p>
        <div className="flex flex-wrap -mx-2">
          <div className="w-1/3 px-2 mb-4">
            <div className="bg-white p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Article 1
              </h2>
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                id purus in dui elementum dignissim. Etiam in elit a neque
                imperdiet condimentum.
              </p>
              <p href="#" className="font-bold text-blue-700 hover:underline">
                Read more
              </p>
            </div>
          </div>
          <div className="w-1/3 px-2 mb-4">
            <div className="bg-white p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Article 2
              </h2>
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                id purus in dui elementum dignissim. Etiam in elit a neque
                imperdiet condimentum.
              </p>
              <p href="#" className="font-bold text-blue-700 hover:underline">
                Read more
              </p>
            </div>
          </div>
          <div className="w-1/3 px-2 mb-4">
            <div className="bg-white p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Article 3
              </h2>
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                id purus in dui elementum dignissim. Etiam in elit a neque
                imperdiet condimentum.
              </p>
              <p href="#" className="font-bold text-blue-700 hover:underline">
                Read more
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
