import React from "react";
import X from "../../assets/imgs/x-logo.svg";
import Facebook from "../../assets/imgs/facebook.svg";
import Instagram from "../../assets/imgs/instagram.svg";
import Linkedin from "../../assets/imgs/linkedin.svg";
import Pinterest from "../../assets/imgs/pinterest.svg";
import Tiktok from "../../assets/imgs/tiktok.svg";

export default function SocialLinks() {
  return (
    <ul className="social">
      <li>
        <img src={Tiktok} alt="Tiktok Logo" />
      </li>
      <li>
        <img src={Instagram} alt="Instagram Logo" />
      </li>
      <li>
        <img src={Linkedin} alt="Linkedin Logo" />
      </li>
      <li>
        <img src={Facebook} alt="Facebook Logo" />
      </li>
      <li>
        <img src={Pinterest} alt="Pinterest Logo" />
      </li>
      <li>
        <img src={X} alt="X Logo" />
      </li>
    </ul>
  );
}
