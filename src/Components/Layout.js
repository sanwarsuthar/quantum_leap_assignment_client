import { useState } from "react";
import {  useSelector } from "react-redux";

import Loader from "./Loader";
import Header from "./Dashboard/Header";
import Sidebar from "./Dashboard/Sidebar";

const Layout = ({ children }) => {
  const { loading } = useSelector((state) => state.auth);
  const [foldClass, setFoldClass] = useState("");

  const handleToggleClass = () => {
    foldClass ? setFoldClass("") : setFoldClass("is-folded");
  };

  return (
    <>
      {loading && <Loader />}
      <div className={`app ${foldClass}`}>
        <div className="dashBoard_overLay" onClick={handleToggleClass}></div>
        <div className="layout">
          <Header handleToggleClass={handleToggleClass} />
          <Sidebar />
          <div className="page_container">
            <div className="main_content">
              <div className="dash_contentBox">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
