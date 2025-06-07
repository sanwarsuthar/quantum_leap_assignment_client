import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../store/auth/action";
import { useNavigate } from "react-router-dom";

const Header = ({ handleToggleClass }) => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="dash_header">
      <div className="dash_logo">
        <Link to="/">
          <img src="./assets/img/logo.png" alt="" />
          <img className="logo_fold" src="./assets/img/logo-icon.png" alt="" />
        </Link>
        <div className="sidebar-toggle" onClick={handleToggleClass}>
          <img src="/assets/img/sidebar-toggle.svg" />
        </div>
        <span className="ml-5">
         Quantum Leap Assignment
        
        </span>
      </div>
      <div className="nav_dash_wrap">
        <div className="nav_dash_wrpLeft ">
          {pathname && (
            <div className="page-title-heading">
              {pathname === "/"
                ? "Dashboard"
                : pathname === "/settings"
                ? "Settings"
                : pathname === "/profile"
                ? "Profile"
                : ""}
            </div>
          )}
          <Link
            to="#"
            className="dashIconFold only-mobile-view"
            id="foldBtn"
            onClick={handleToggleClass}
          >
            <div className="notFolded">
              <svg
                width="23"
                height="17"
                viewBox="0 0 23 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.1562 8.5C22.1562 8.2265 22.0476 7.96419 21.8542 7.7708C21.6608 7.5774 21.3985 7.46875 21.125 7.46875H1.875C1.6015 7.46875 1.33919 7.5774 1.1458 7.7708C0.952399 7.96419 0.84375 8.2265 0.84375 8.5C0.84375 8.7735 0.952399 9.03581 1.1458 9.2292C1.33919 9.4226 1.6015 9.53125 1.875 9.53125H21.125C21.3985 9.53125 21.6608 9.4226 21.8542 9.2292C22.0476 9.03581 22.1562 8.7735 22.1562 8.5ZM22.1562 1.625C22.1562 1.3515 22.0476 1.08919 21.8542 0.895796C21.6608 0.702399 21.3985 0.59375 21.125 0.59375H1.875C1.6015 0.59375 1.33919 0.702399 1.1458 0.895796C0.952399 1.08919 0.84375 1.3515 0.84375 1.625C0.84375 1.8985 0.952399 2.16081 1.1458 2.3542C1.33919 2.5476 1.6015 2.65625 1.875 2.65625H21.125C21.3985 2.65625 21.6608 2.5476 21.8542 2.3542C22.0476 2.16081 22.1562 1.8985 22.1562 1.625ZM22.1562 15.375C22.1562 15.1015 22.0476 14.8392 21.8542 14.6458C21.6608 14.4524 21.3985 14.3438 21.125 14.3438H1.875C1.6015 14.3438 1.33919 14.4524 1.1458 14.6458C0.952399 14.8392 0.84375 15.1015 0.84375 15.375C0.84375 15.6485 0.952399 15.9108 1.1458 16.1042C1.33919 16.2976 1.6015 16.4062 1.875 16.4062H21.125C21.3985 16.4062 21.6608 16.2976 21.8542 16.1042C22.0476 15.9108 22.1562 15.6485 22.1562 15.375Z"
                  fill="#9EA0A5"
                />
              </svg>
            </div>
            <div className="folded ">
              <svg
                width="23"
                height="17"
                viewBox="0 0 23 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.1562 8.5C22.1562 8.2265 22.0476 7.96419 21.8542 7.7708C21.6608 7.5774 21.3985 7.46875 21.125 7.46875H1.875C1.6015 7.46875 1.33919 7.5774 1.1458 7.7708C0.952399 7.96419 0.84375 8.2265 0.84375 8.5C0.84375 8.7735 0.952399 9.03581 1.1458 9.2292C1.33919 9.4226 1.6015 9.53125 1.875 9.53125H21.125C21.3985 9.53125 21.6608 9.4226 21.8542 9.2292C22.0476 9.03581 22.1562 8.7735 22.1562 8.5ZM22.1562 1.625C22.1562 1.3515 22.0476 1.08919 21.8542 0.895796C21.6608 0.702399 21.3985 0.59375 21.125 0.59375H1.875C1.6015 0.59375 1.33919 0.702399 1.1458 0.895796C0.952399 1.08919 0.84375 1.3515 0.84375 1.625C0.84375 1.8985 0.952399 2.16081 1.1458 2.3542C1.33919 2.5476 1.6015 2.65625 1.875 2.65625H21.125C21.3985 2.65625 21.6608 2.5476 21.8542 2.3542C22.0476 2.16081 22.1562 1.8985 22.1562 1.625ZM22.1562 15.375C22.1562 15.1015 22.0476 14.8392 21.8542 14.6458C21.6608 14.4524 21.3985 14.3438 21.125 14.3438H1.875C1.6015 14.3438 1.33919 14.4524 1.1458 14.6458C0.952399 14.8392 0.84375 15.1015 0.84375 15.375C0.84375 15.6485 0.952399 15.9108 1.1458 16.1042C1.33919 16.2976 1.6015 16.4062 1.875 16.4062H21.125C21.3985 16.4062 21.6608 16.2976 21.8542 16.1042C22.0476 15.9108 22.1562 15.6485 22.1562 15.375Z"
                  fill="#9EA0A5"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="nav_dash_wrpRight">
          <div className="nav-item dropdown user_dropdown">
            <Link to="#" onClick={(e) => handleLogOut(e)}>
              <i className="ion-log-out"></i> Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
