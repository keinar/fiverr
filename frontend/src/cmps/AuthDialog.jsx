import React, { useEffect, useRef } from "react"
import { Check } from "lucide-react"
import Login from "../cmps/AppHeader/Login"
import { login, signup } from "../store/actions/user.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export default function AuthDialog({ toggleDialog, user }) {
  const dialogRef = useRef()

  useEffect(() => {
    const handleClickOutside = event => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        toggleDialog() // Close the dialog if the click is outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [toggleDialog])

  const handleLogin = async credentials => {
    try {
      const user = await login(credentials)
      toggleDialog()
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg("Cannot login")
    }
  }

  const handleSignup = async credentials => {
    try {
      const user = await signup(credentials)
      toggleDialog()
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg("Cannot signup")
    }
  }

  return (
    <div className="auth-dialog-container">
      <dialog open={true} className="auth-dialog" ref={dialogRef}>
        <section className="dialog-left">
          <h2>Success starts here</h2>
          <ul>
            <li>
              <span>
                <Check size={15} />
              </span>
              Over 600 categories
            </li>
            <li>
              <span>
                <Check size={15} />
              </span>
              Pay per project, not per hour
            </li>
            <li>
              <span>
                <Check size={15} />
              </span>
              Access to talent and businesses across the globe
            </li>
          </ul>
        </section>
        <section className="dialog-right">
          <section className="container">
            {!user && (
              <div className="user-info">
                <Login onLogin={handleLogin} onSignup={handleSignup} />
              </div>
            )}
          </section>
        </section>
      </dialog>
    </div>
  )
}
