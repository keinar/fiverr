
import React, { useEffect } from "react"
import Hero from "./Hero"
import TrustedBy from "./TrustedBy"
import PopularServicesCarousel from "./PopularServicesCarousel"
import {  setFilterBy } from "../../store/actions/gig.actions.js"
import SellingProposition from "./SellingProposition.jsx"

export function HomePage() {

  useEffect(()=>{
        setFilterBy([])
  }, [])
  
  return (
    <main className="home-page">
      <Hero />
      <TrustedBy />
      <div className="popular-services">
        <div className="popular-services-container main-container">
        <h2>Popular Services</h2>
        <PopularServicesCarousel />
        </div>
       <SellingProposition/>
      </div>
    </main>
  )
}
