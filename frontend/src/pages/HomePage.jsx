import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";

function HomePage() {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    // axios
    //   .get(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    //     headers: {
    //       Authorization: `Bearer ${auth.token}`,
    //     },
    //   })
    //   .then((result) => {
    //     console.log(result.data);
    //     setPosts(result.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    const fetchPostData = async () => {
      try {
        const postsData = await axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((result) => {
            return result.data;
          });

        setPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostData();
  }, []);

  return (
    <div className="bg-gray-100">
      <main className="container mx-auto ">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to MounSocialize
        </h1>
        <div className="flex flex-wrap -mx-2" id="posts">
          {posts &&
            posts.map((post) => (
              <div key={post.id} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full mr-4"
                        src="https://randomuser.me/api/portraits"
                        alt="Avatar of Jonathan Reinink"
                      />
                      <div className="text-sm">
                        <p className="text-gray-900 leading-none">
                          {post.user_id}
                        </p>
                        <p className="text-gray-600">{post.created_at}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700">{post.content}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex items-center mr-6 text-gray-600">
                        <svg
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                        </svg>
                        <span className="ml-2">{post.likes}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                        </svg>
                        <span className="ml-2">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Post
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
