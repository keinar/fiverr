import React from "react"
import ImageCarousel from "../../cmps/ImageCarousel.jsx"
import PackTabs from "../../cmps/PackTabs.jsx"
import { useParams } from "react-router"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { userService } from "../../services/user.service.js"
import { useEffect, useState } from "react"
import Breadcrumbs from "../../cmps/Breadcrumbs.jsx"
import GigReviews from "./GigReviews.jsx"
import AboutSeller from "./AboutSeller.jsx"
import AboutSellerTop from "./AboutSellerTop.jsx"
import { gigService } from "../../services/gig.service.js"

export function GigDetails() {
  const params = useParams()
  const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
  const [gig, setGig] = useState(null)
  const [isSticky, setIsSticky] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(!gig) return
    fetchUser()
  }, [gig])
  
  useEffect(() => {
    if (!params.gigId) return
    loadGig()
  }, [params.gigId])
  
  useEffect(() => {
    const handleScroll = () => {
      const sideWrapper = document.querySelector(".side-wrapper")
      const top = sideWrapper.getBoundingClientRect().top
      setIsSticky(top <= 0)
    }
    
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  async function fetchUser() {
    const fetchedUser = await userService.getById(gig.owner._id)
    setUser(fetchedUser)
  }
  async function loadGig() {

    try{
      const gig = await gigService.getById(params.gigId)
      setGig(gig)

    }catch{(err)=>console.log('errror',err)}
  }

  if (!gig) {
    return <div>Gig not found</div>
  }

  console.log('gig :', gig)

  function getImages() {
    if(Array.isArray(gig.imgUrl)) {
      // It's an array
      return gig.imgUrl.slice(0)
    } else if(typeof gig.imgUrl === 'string') {
      // It's a string
      return [gig.imgUrl, gig.imgUrl, gig.imgUrl]
    }
  }
  const images = getImages()
  return (
    <div className="gig-index">
      <div className="gig-details">
        <div className="details-header">
          <Breadcrumbs filterBy={filterBy} />
          <h1>{gig.title}</h1>
          <AboutSellerTop gig={gig} />
        </div>
        <ImageCarousel images={images} />
        <div className="about-this-gig">
          <h2>About this gig</h2>
          <div className="gig-description">
            <p>{gig.description}</p>
            <h2>Services:</h2>
            <ul>{gig.services && gig.services.map((service, index) => <li key={index}>{service}</li>)}</ul>
            <p>
              <strong>Please contact us with your requirements before placing the order to avoid cancellation. If you are clear about your requirement, Place your order now.</strong>
            </p>
          </div>
        </div>
        <AboutSeller user={user} gig={gig} />
        
        <GigReviews reviews={gig.reviews} />
      </div>
      <div className={`big-side ${isSticky ? "sticky" : ""}`}>
        <div className="side-wrapper">
          <div className="package-content">
            <PackTabs gig={gig}/>
          </div>
          <div className="contact-seller">
            <button>Contact me</button>
          </div>
        </div>
      </div>
    </div>
  )
}