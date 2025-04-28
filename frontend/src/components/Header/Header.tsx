import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./Header.css";
// import "../../App.css";

interface HeaderProps {
  isBackendWorking: boolean;
}

const Header = ({ isBackendWorking }: HeaderProps) => {
  return (
    <header className="header-column-container">
      <div className="logo">
        <img src="jb.svg" alt="logo" />
        <h1 className="title">JourBuddy</h1>
      </div>
      <div className="status-icon">
        {isBackendWorking ? (
          <FaCheckCircle className="status-icon-working" />
        ) : (
          <FaTimesCircle className="status-icon-error" />
        )}
      </div>
    </header>
  );
};

export default Header;
