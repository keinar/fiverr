import React, { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import AuthDialog from "../AuthDialog"
import { logout } from "../../store/actions/user.actions"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"

export default function HeaderNavigation() {
  const [dialogState, setDialogState] = useState({ auth: false, nav: false })
  const navigate = useNavigate()
  const user = useSelector(state => state.userModule.user)
  const navDialogRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (navDialogRef.current && !navDialogRef.current.contains(event.target)) {
        setDialogState(prevState => ({
          ...prevState,
          nav: false,
          auth: false,
        }))
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
      setDialogState({ auth: false, nav: false })
      showSuccessMsg("Bye now")
    } catch (err) {
      showErrorMsg("Cannot logout")
    }
  }

  const toggleDialog = type => {
    setDialogState(prevState => ({ ...prevState, [type]: !prevState[type] }))
  }

  function navigateToPage(path) {
    navigate(path)
    window.scrollTo(0, 0)
    setDialogState({ auth: false, nav: false })
  }

  return (
    <nav className="header-links">
      <ul className="header-links-ul">
        <li className="explore-btn" onClick={() => navigateToPage("/explore")}>
          Explore
        </li>
        {!user &&
          ["Sign in", "Join"].map((action, index) => (
            <li key={index} className={`${action.toLowerCase()}-btn`} onClick={() => toggleDialog("auth")}>
              {action}
            </li>
          ))}
        {user && (
          <span className="user-info" ref={navDialogRef}>
            <Link to="/order">
              <li>Orders</li>
            </Link>
            <div>
              {user.imgUrl && <img src={user.imgUrl} alt="user-img" className="user-img" onClick={() => toggleDialog("nav")} title={user.fullname} />}
              <dialog open={dialogState.nav} className="nav-popover-items-content">
                <ul >
                  {/* <li onClick={() => navigate(`/profile/${user._id}`)}>Profile</li> */}
                  <li onClick={() => navigateToPage("/order")}>Orders</li>
                  <li onClick={() => navigateToPage("/profile")}>Profile</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </dialog>
            </div>
          </span>
        )}
        {dialogState.auth && <AuthDialog toggleDialog={() => toggleDialog("auth")} />}
      </ul>
    </nav>
  )
}
