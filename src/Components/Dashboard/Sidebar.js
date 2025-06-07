import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardIcon,ChatIcon } from "../../util/svg";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const navItems = [
    {
      title: "Feed",
      icon: ChatIcon,
      path: "/dashboard",
      isActive: pathname === "/dashboard",
      condition: true,
    },
    {
      title: "My Posts",
      icon: DashboardIcon,
      path: "/post",
      isActive: pathname === "/post",
      condition: true,
    },
  ];
  return (
    <div className="side_nav">
      <div className="side_nav_inner">
        <ul className="sideNav_menu">
          {navItems.map((item, index) => (
            <li className="dash_nav_item" key={index}>
              <Link to={item.path} className={item.isActive ? "active" : ""}>
                <span className="icon_holder">{item.icon}</span>
                <span className="title_dash_nav">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
