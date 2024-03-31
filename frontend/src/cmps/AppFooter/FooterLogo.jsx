import React from "react";
import { Link } from "react-router-dom";

export default function FooterLogo() {
  return (
    <Link to={"/"}>
      <div className="footer-logo">
        <div className="logo-text"> Lancerr</div>
        <div className="logo-dot">.</div>
      </div>
    </Link>
  );
}
