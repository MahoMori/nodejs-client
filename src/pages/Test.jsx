import React, { useContext, useCallback, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Test = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "users/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUserContext((prev) => ({ ...prev, details: data }));
      } else {
        if (res.status === 401) {
          window.location.reload();
        } else {
          setUserContext((prev) => ({ ...prev, details: null }));
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, userContext.details]);

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "users/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (res) => {
      setUserContext((prev) => ({ ...prev, details: undefined, token: null }));

      // redirect
    });
  };

  //   manually refreh(with button) to get data
  const refetchHandler = () => {
    setUserContext((prev) => ({ ...prev, details: undefined }));
  };

  return userContext.details === null ? (
    "Error Loading User Details"
  ) : !userContext.details ? (
    <div>Loading...</div>
  ) : (
    <>
      <div>{userContext.details.firstName}</div>
      <button onClick={logoutHandler}>Logut</button>
    </>
  );
};

export default Test;
