import React, { useEffect, useState } from "react"
import HeaderLogo from "./HeaderLogo"
import HeaderMobileMenuButton from "./HeaderMobileMenuButton"
import HeaderNavigationLinks from "./HeaderNavigationLinks"
import HeaderSearchForm from "./HeaderSearchForm"
import { useLocation } from "react-router-dom"
import { GigFilter } from "../GigFilter"

export function AppHeader() {
  const [isOnTop, setIsOnTop] = useState(true)
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      setIsOnTop(currentScrollY <= 0)
      setShowCategoriesMenu(currentScrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className={`app-header-wrapper ${location.pathname === "/" && "fixed"} `}>
      <section className={`app-header main-container full ${isOnTop && location.pathname === "/" ? "header-transparent" : ""}` }>
        <header className="navbar">
          <HeaderMobileMenuButton />
          <HeaderLogo />
          <div className={`search-form-wrapper ${location.pathname === "/" ? (showCategoriesMenu ? "display" : "") : "display"}`}>
            <HeaderSearchForm />
          </div>
          <HeaderNavigationLinks />
        </header>
      </section>
      {location.pathname !== "/order" && (
        <div className={`cat-wrapper ${location.pathname === "/" && "fixed"} full ${location.pathname === "/" ? (showCategoriesMenu ? "visible" : "") : "visible"} `}>
          <GigFilter />
        </div>
      )}
    </section>
  )
}
