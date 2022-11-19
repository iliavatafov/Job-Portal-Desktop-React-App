import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const userMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <i className="ri-home-7-line"></i>,
      path: "/",
    },
    {
      title: "Applied Jobs",
      onClick: () => navigate("/applied-jobs"),
      icon: <i className="ri-file-list-3-line"></i>,
      path: "/applied-jobs",
    },
    {
      title: "Poster Jobs",
      onClick: () => navigate("/poster-jobs"),
      icon: <i className="ri-file-list-2-line"></i>,
      path: "/poster-jobs",
    },
    {
      title: "Profile",
      onClick: () => navigate("/profile"),
      icon: <i className="ri-user-2-line"></i>,
      path: "/profile",
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <i className="ri-logout-box-r-line"></i>,
      path: "/login",
    },
  ];

  return (
    <div className="layout">
      <div className="sidebar justifay-content-between d-flex">
        <div className="menu" style={{ width: collapsed ? "40px" : "150px" }}>
          {userMenu.map((item, index) => {
            const isActive = window.location.pathname === item.path;

            return (
              <div
                onClick={item.onClick}
                key={index}
                className={`menu-item ${isActive && "active-menu-item"}`}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content">
        <div className="header justify-content-between d-flex">
          <div className="d-flex item-center gap-2">
            {collapsed ? (
              <i
                className="ri-menu-2-fill"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            ) : (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}

            <span className="logo">PERFECTJOBS</span>
          </div>
          <div className="d-flex gap-1 align-items-center">
            <i className="ri-shield-user-fill"></i>
            <span>{user?.name}</span>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
