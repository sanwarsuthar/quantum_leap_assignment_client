import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { privateRoutes, notPrivateRoutes } from "./util/routes";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authSuccess, logout } from "./store/auth/action";


function App() {
  // const { request: requestVerify, response: responseVerify } = useRequest();
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(authSuccess({ loggedIn: true }));
    } else {
      dispatch(authSuccess({ loggedIn: false }));
    }
  }, [token]);

  return (
    <>
      <RouterProvider router={loggedIn ? privateRoutes : notPrivateRoutes} />
      <ToastContainer autoClose={5000} />
    </>
  );
}

export default App;
