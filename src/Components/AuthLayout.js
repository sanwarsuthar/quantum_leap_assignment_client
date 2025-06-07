import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
const AuthLayout = ({ children }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading && <Loader />}
      <div className="login_template">
        <div className="container">
          <div>
            <div className="login-box login-page">
              <Link to="/" className="logo-box">
                <img src="./assets/img/logo.png" alt="" />
              </Link>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
