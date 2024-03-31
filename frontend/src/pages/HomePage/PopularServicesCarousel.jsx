import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router"

export default function PopularServicesCarousel() {
  const navigate = useNavigate()
  // Mock data
  const popularServices = [
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681616/Lancerr/ai-artists-2x_inf55f.webp",
      title: "AI Artists",
      subtitle: "Add talent to AI",
      href: "/explore?tags=AI%20Artists",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681620/Lancerr/logo-design-2x_aei2q1.webp",
      title: "Logo Design",
      subtitle: "Build your brand",
      href: "/explore?tags=Logo%20Design",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681623/Lancerr/wordpress-2x_d8a4df.webp",
      title: "WordPress",
      subtitle: "Customize your site",
      href: "/explore?tags=WordPress",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681623/Lancerr/voice-over-2x_chhqoe.webp",
      title: "Voice Over",
      subtitle: "Share your message",
      href: "/explore?tags=Voice%20Over",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681616/Lancerr/animated-explainer-2x_xlunwv.webp",
      title: "Video Explainer",
      subtitle: "Engage your audience",
      href: "/explore?tags=Animated%20Explainer",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681616/Lancerr/animated-explainer-2x_xlunwv.webp",
      title: "Social Media",
      subtitle: "Reach more customers",
      href: "/explore?tags=Social%20Media",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681622/Lancerr/seo-2x_m9gh9f.webp",
      title: "SEO",
      subtitle: "Unlock growth online",
      href: "/explore?tags=SEO",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681618/Lancerr/illustration-2x_lmz9v7.webp",
      title: "Illustration",
      subtitle: "Color your dreams",
      href: "/explore?tags=Illustration",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681622/Lancerr/translation-2x_jnjsmo.webp",
      title: "Translation",
      subtitle: "Go global",
      href: "/explore?tags=Translation",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681616/Lancerr/data-entry-2x_l4r2aj.webp",
      title: "Data Entry",
      subtitle: "Learn your business",
      href: "/explore?tags=Data%20Entry",
    },
    {
      img: "https://res.cloudinary.com/de06koxrk/image/upload/v1710681616/Lancerr/book-covers-2x_hksrku.webp",
      title: "Book Covers",
      subtitle: "Showcase your story",
      href: "/explore?tags=Book%20Covers",
    },
  ]
  // Custom Next Arrow
  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div className={className} style={{ ...style, display: "block", color: "black", right: 10 }} onClick={onClick}>
        <div className="custom-arrow">
          <ChevronRight size={24} />
        </div>
      </div>
    )
  }

  // Custom Previous Arrow
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <div className={className} style={{ ...style, display: "block", color: "black", left: -20 }} onClick={onClick}>
        <div className="custom-arrow">
          <ChevronLeft size={24} />
        </div>
      </div>
    )
  }

  function navigateAndScrollToTop(href) {
    navigate(href)
    window.scrollTo(0, 0)
  }

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {popularServices.map((service, index) => (
          <div className="slider-item" key={index} onClick={() => navigateAndScrollToTop(service.href)}>
            <h4>
              <small>{service.subtitle}</small>
              {service.title}
            </h4>
            <picture>
              <source srcSet={service.img} type="image/webp" />
              <img src={service.img} alt={service.title} />
            </picture>
          </div>
        ))}
      </Slider>
    </div>
  )
}
