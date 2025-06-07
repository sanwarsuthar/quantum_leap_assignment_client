import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logout, updateLoading, authSuccess } from "../store/auth/action";
import { API } from "../util/api";

const BACKEND_URL = API.PORT;

const useRequest = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateLoading({ loading }));
  }, [loading]);

  const startFetching = () => {
    setResponse(null);
    setLoading(true);
    setError(null);
  };

  const clear = () => {
    setResponse(null);
    setError(null);
  };

  const fetchedData = () => {
    setLoading(false);
    setError(null);
  };

  const requestData = async (method, url, data) => {
    const makeRequest = async (accessTokenOverride = null) => {
      const accessToken = accessTokenOverride || localStorage.getItem("accessToken");

      const config = {
        method,
        url: `${BACKEND_URL}/${url}`,
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {},
        data,
      };

      return axios(config);
    };

    try {
      startFetching();

      const res = await makeRequest(); // use current token
      fetchedData();
      setResponse(res?.data);
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401) {
        console.log("Access token expired. Attempting refresh...");

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token");

          const refreshRes = await axios.post(`${BACKEND_URL}/auth/refresh`, {
            refreshToken,
          });

          const newAccessToken = refreshRes?.data?.tokens?.accessToken;
          const newRefreshToken = refreshRes?.data?.tokens?.refreshToken;

          if (!newAccessToken) throw new Error("Refresh failed: No token");

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          dispatch(authSuccess({ loggedIn: true, token: newAccessToken }));

          // Retry original request with new access token
          const retryRes = await makeRequest(newAccessToken);
          fetchedData();
          setResponse(retryRes?.data);
        } catch (refreshErr) {
          console.error("Token refresh failed", refreshErr);
          dispatch(logout());
          navigate("/login");
        }
      } else if (status === 404) {
        fetchedData();
      } else if (status) {
        fetchedData();
        toast.error(err?.response?.data?.message || "Error occurred");
      } else if (err.request) {
        fetchedData();
        toast.error("Slow Network Speed. Try Again later.");
      } else {
        fetchedData();
        toast.error("Oops!! Unusual error occurred");
      }
    }
  };

  return {
    loading,
    error,
    request: requestData,
    clear,
    response,
    setError,
  };
};

export default useRequest;
