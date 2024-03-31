import React from "react"
import googlePng from "../../assets/imgs/google.png"
import metaPng from "../../assets/imgs/meta.png"
import netflixPng from "../../assets/imgs/netflix.png"
import pgPng from "../../assets/imgs/pandg.png"
import paypalPng from "../../assets/imgs/paypal.png"

export default function TrustedBy() {
  return (
    <div className="trusted-by max-width-container">
      <span className="trusted-by-text">Trusted by: </span>
      <img src={metaPng} alt="Meta" />
      <img src={googlePng} alt="Google" />
      <img src={netflixPng} alt="Netflix" />
      <img src={pgPng} alt="PandG" />
      <img src={paypalPng} alt="Paypal" />
    </div>
  )
}
