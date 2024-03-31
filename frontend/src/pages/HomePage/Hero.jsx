import { SearchIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { store } from "../../store/store.js"
import { setFilterBy } from "../../store/actions/gig.actions.js"
import { useNavigate } from "react-router"

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const filterBy = store.getState().gigModule.filterBy
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()

  // Mock data for tags
  const allTags = [
    { description: "Website Design", href: "/explore?tags=Website%20Design" },
    { description: "WordPress", href: "/explore?tags=WordPress" },
    { description: "Logo Design", href: "/explore?tags=Logo%20Design" },
    { description: "AI Services", href: "/explore?tags=AI%20Services" },
  ]

  useEffect(() => {
    const intervalId = setInterval(() => {
      const divs = document.querySelectorAll(".hero-background")
      divs.forEach((div, index) => {
        if (index === currentIndex) {
          div.style.opacity = 1
        } else {
          div.style.opacity = 0
        }
      })

      setCurrentIndex(prevIndex => (prevIndex + 1) % divs.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [currentIndex])

  function handleClick(inputValue) {
    const updatedFilter = {
      txt: inputValue,
    }
    if (!inputValue) return
    const fieldsToUpdate = { ...filterBy, ...updatedFilter }
    setFilterBy(fieldsToUpdate)
    navigate("/explore")
    window.scrollTo(0, 0)
  }

  return (
    <section className="hero main-container">
      <div className="hero-backgrounds">
        <div className="hero max-width-container">
          <div className="hp-hero-content">
            <h1>
              <strong>Find the right</strong> <i>freelance</i> <br />
              <strong> service, right away</strong>
            </h1>
            <div className="hp-hero-search-bar">
              <form className="hp-search-form">
                <input type="search" placeholder="Search for any service..." value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                <button type="button" onClick={() => handleClick(searchValue)} className="inside-button">
                  <SearchIcon size={18} color="white" strokeWidth={3} />
                </button>
              </form>
              <div className="popular-tags">
                <p>Popular:</p>
                {allTags.map(tag => (
                  <a key={tag.description} href={tag.href}>
                    <button>{tag.description}</button>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hp-hero-trusted"></div>
        </div>
        <div className="hero-background hero-jenny" style={{ opacity: 1 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499430/jenny-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">@Jenny</div>
              <div>
                <b>Children's Voice Over</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background hero-colin" style={{ opacity: 0 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499432/colin-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">@colinstark</div>
              <div>
                <b>Creative Director</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background hero-scarlett" style={{ opacity: 0 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499428/scarlett-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">Scarlett</div>
              <div>
                <b>Business Founder</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background hero-jordan" style={{ opacity: 0 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499439/jordan-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">@jordanruncie_</div>
              <div>
                <b>Production Assistant</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background hero-christina" style={{ opacity: 0 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499422/christina-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">Christina</div>
              <div>
                <b>Jewelry Shop Owner</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
