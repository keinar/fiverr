
import React, { useEffect } from "react"
import Hero from "./Hero"
import TrustedBy from "./TrustedBy"
import PopularServicesCarousel from "./PopularServicesCarousel"
import {  setFilterBy } from "../../store/actions/gig.actions.js"
import SellingProposition from "./SellingProposition.jsx"

export function HomePage() {

  const category_svgs = [
   {title: "Logo Design", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178244/Lancerr/category-list-svgs/graphics-design.91dfe44_uxjbsg.svg", link: "/explore?tags=Logo+Design"},
   {title: "Digital Marketing", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178251/Lancerr/category-list-svgs/online-marketing.a3e9794_pbwdqp.svg", link: "/explore?tags=Digital+Marketing"},
   {title: "Writing & Translation", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178259/Lancerr/category-list-svgs/writing-translation.a787f2f_c7ctjw.svg", link: "/explore?tags=Writing+Translation"},
   {title: "Video & Animation", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178257/Lancerr/category-list-svgs/video-animation.1356999_snjaug.svg", link: "/explore?tags=Video+&+Animation"},
   {title: "Music & Audio", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178248/Lancerr/category-list-svgs/music-audio.ede4c90_fivo2m.svg", link: "/explore?tags=Music+&+Audio"},
   {title: "Programming & Tech", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178255/Lancerr/category-list-svgs/programming.6ee5a90_j9ggkl.svg", link: "/explore?tags=Programming+&+Tech"},
   {title: "Business", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178241/Lancerr/category-list-svgs/business.fabc3a7_e7opk0.svg", link: "/explore?tags=Business"},
   {title: "Lifestyle", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178246/Lancerr/category-list-svgs/lifestyle.112b348_ikmajn.svg", link: "/explore?tags=Lifestyle"},
   ,{title: "Data", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178243/Lancerr/category-list-svgs/data.855fe95_bpkymk.svg", link: "/explore?tags=Data"},
   {title: "Photography", svg: "https://res.cloudinary.com/de06koxrk/image/upload/v1712178252/Lancerr/category-list-svgs/photography.0cf5a3f_oyxo6l.svg", link: "/explore?tags=Photography"},
  ]

  useEffect(()=>{
        setFilterBy([])
  }, [])
  
  return (
    <main className="home-page">
      <Hero />
      <TrustedBy />
      <section className="popular-services">
        <div className="popular-services-container main-container">
        <h2>Popular Services</h2>
        <PopularServicesCarousel />
        </div>
        </section>
        <section>
       <SellingProposition/>
      </section>

      <section className="category-list-container main-container">
        <h2>You need it, we've got it</h2>
        <ul className="category-list">
          {category_svgs.map((category) => (
            <li key={category.title}>
              <a href={category.link}>
                <img src={category.svg} alt={category.title} />
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
