import React, { useEffect, useState } from "react";
import axios from "axios";

function DisplayImageBlob() {
  const [image, setImage] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/1`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setImage(url.split("blob:").pop());
      });
  }, []);

  return (
    <div>
      <img src={image} alt="profile" />
    </div>
  );
}

export default DisplayImageBlob;
