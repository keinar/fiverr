import { Star } from "lucide-react"
import React from "react"

export default function AboutSeller({ gig, user }) {
  return (
    <div className="seller-wrapper" id="about-the-seller">
      <div className="about-the-seller-big">
        <span>About the seller</span>
        <div className="profile-wrapper">
          <img className="profile-picture" src={gig.owner.imgUrl.startsWith("http") ? gig.owner.imgUrl : profilePic} alt="profile picture" />
          <div className="seller-info-text">
            <p>{gig.owner.fullname} </p>
            <span>
              <Star color="black" fill="black" size={16} />
              {gig.owner.rate}
            </span>
          </div>
        </div>
      </div>
      <div className="user-description">
        {user && (
          <div>
            <ul className="user-stats">
              <div>
                <li>
                  From <br />
                  <strong>{gig.owner.country}</strong>
                </li>
                <li>
                  Avg. response time <br />
                  <strong>{gig.owner.responseTime}</strong>
                </li>
                <li>
                  Languages <br />
                  <strong>{gig.owner.languages}</strong>
                </li>
              </div>
              <div>
                <li>
                  Member since <br />
                  <strong>{gig.owner.joined}</strong>
                </li>
                <li>
                  Last delivery <br />
                  <strong>{gig.owner.lastDelivery}</strong>
                </li>
              </div>
            </ul>
            <div className="user-story">
              <p>{user.userStory}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
