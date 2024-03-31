import { Star } from "lucide-react"
import React from "react"

export default function AboutSellerTop({ gig }) {

  function scrollToAnchor(id) {
    const element = document.getElementById(id)
    element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="about-the-seller-top">
      <img className="profile-picture" src={gig.owner.imgUrl.startsWith("http") ? gig.owner.imgUrl : profilePic} alt="profile picture" />
      <div className="seller-info-text">
        <p onClick={() => scrollToAnchor("about-the-seller")}>{gig.owner.fullname}</p>
        <span>
          <Star color="black" fill="black" size={16} />
          {gig.owner.rate}
        </span>
      </div>
    </div>
  )
}
