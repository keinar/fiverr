import React from "react";
import { Link } from "react-router-dom";

export default function HeaderLogo() {
  return (
    <Link to={"/"}>
      <div className="logo-wrapper">
        <div className="logo-text"> Lancerr</div>
        <div className="logo-dot">.</div>
      </div>
    </Link>
  );
}
