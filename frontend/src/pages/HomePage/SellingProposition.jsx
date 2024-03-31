import { CheckCircle2 } from 'lucide-react'
import React from 'react'

export default function SellingProposition() {
  return (
    <section className="selling-proposition-wrapper main-container">
    <div className="selling-proposition">
      <div className="selling-proposition-left">
    <h2>The best part? Everything.</h2>
    <ul>
      <li>
        <h6>
           <CheckCircle2 size={24} color="#7A7D85"/>
           Stick to your budget
        </h6>
        <p>
        Find the right service for every price point. No hourly rates, just project-based pricing.
        </p>
      </li>
      <li>
        <h6>
           <CheckCircle2 size={24} color="#7A7D85"/>
           Get quality work done quickly
        </h6>
        <p>
        Hand your project over to a talented freelancer in minutes, get long-lasting results.
        </p>
      </li>
      <li>
        <h6>
           <CheckCircle2 size={24} color="#7A7D85"/>
           Pay when you're happy
        </h6>
        <p>
        Upfront quotes mean no surprises. Payments only get released when you approve.</p>
      </li>
      <li>
        <h6>
           <CheckCircle2 size={24} color="#7A7D85"/>
           Count on 24/7 support
        </h6>
        <p>
        Our round-the-clock support team is available to help anytime, anywhere.
        </p>
      </li>
    </ul>
    </div>
    <div className="selling-proposition-right">
    <div className="selling-proposition-img">
      <img src="https://res.cloudinary.com/de06koxrk/image/upload/v1711397678/Lancerr/cxiizfi1kzgnqepyvlm8.webp" alt="selling proposition"/>
    </div>
    </div>
    </div>
  </section>
  )
}
