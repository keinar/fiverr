import React from "react"
import { GetFlagImage } from "../../cmps/GetFlagImage"

export default function GigReviews({ reviews }) {
  function randomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  return (
    <div className="reviews">
      <h3 className="reviews-header">Reviews</h3>
      <ul>
        {reviews &&
          reviews.map((review, index) => (
            <li key={index}>
              <div className="review-img-wrapper" style={{ backgroundColor: randomColor() }}>
                <p>{review.name[0].toUpperCase()}</p>
              </div>
              <div className="review">
                <div className="review-header">
                  <p>{review.name}</p>
                  <span>
                    <img className="country-flag" src={GetFlagImage(review.country)} alt={`${review.country} flag`} />
                    {review.country}
                  </span>
                </div>
                <p>{review.review}</p>
                <p className="reviewed-at">{review.reviewedAt}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
