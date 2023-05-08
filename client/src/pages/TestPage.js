import React, { useState, useEffect } from "react";

export default function Test() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:8000/waw")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBackendData(data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  );
}
