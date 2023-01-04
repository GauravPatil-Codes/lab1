import React, { useEffect, useState } from "react";
import axios from "axios";
import { response } from "express";

function MyComponent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/getNumber").then((response) => {
      setPhoneNumber(response.data.phoneNumber);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getName", {
        headers: {
          auth: "my-auth-token",
        },
      })
      .then((response) => {
        if (response.data.Error) {
          setError(response.data.Error);
        } else {
          setName(response.data.name);
        }
      });
  }, []);

  if (error) {
    return (
      <div>
        <p>Error: {error.errcode}</p>
        <p>{error.errormessage}</p>
      </div>
    );
  }

  return (
    <div>
      <p> Phone Number : {phoneNumber}</p>
      <p> Name: {name}</p>
    </div>
  );
}

export default MyComponent;
