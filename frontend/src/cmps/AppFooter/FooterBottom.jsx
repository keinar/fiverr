import React from "react";
import SocialLinks from "./SocialLinks";
import FooterLogo from "./FooterLogo";

export default function FooterBottom() {
  return (
    <section className="full main-container top-border">
      <div className="footer-bottom">
        <div className="left">
          <FooterLogo />
          <div className="copyright-txt">© Lancerr 2024</div>
        </div>
        <div className="right">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
