import React, { useEffect, useState } from "react"
import { userService } from "../../services/user.service.js"
import { useSelector } from "react-redux"
import { loadUsers } from "../../store/actions/user.actions.js"
import { ImgUploader } from "../ImgUploader.jsx"

export default function Login(props) {
  const users = useSelector(storeState => storeState.userModule.users)
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const [isSignup, setIsSignup] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  function clearState() {
    setCredentials(userService.getEmptyUser())
    setIsSignup(false)
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  function onLogin(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username) return
    props.onLogin(credentials)
    clearState()
  }

  function onSignup(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname) return
    props.onSignup(credentials)
    clearState()
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
  }

  function onUploaded(imgUrl) {
    setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
  }

  return (
    <div className="login-area">
      {!isSignup && (
        <section>
          <h4 className="signup-header">Sign in to your account</h4>
          <p>
            Don’t have an account?
            <span className="sign-in-link" onClick={toggleSignup}>
              Join here
            </span>
          </p>
          <form className="login-form" onSubmit={onLogin}>
            <select name="username" value={credentials.username} onChange={handleChange}>
              <option value="">Select User</option>
              {users.map((user, index) => (
                <option key={index} value={user.username}>
                  {user.fullname}
                </option>
              ))}
            </select>
            <button>Continue</button>
          </form>
        </section>
      )}
      <div className="signup-section">
        {isSignup && (
          <section>
            <h4 className="login-header">Create a new account</h4>
            <p>
              Already have an account?
              <span className="sign-in-link" onClick={toggleSignup}>
                Sign in
              </span>
            </p>
            <form className="signup-form" onSubmit={onSignup}>
              <label htmlFor="fullname">Full name</label>
              <input type="text" name="fullname" id="fullname" value={credentials.fullname} placeholder="Fullname" onChange={handleChange} required />
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={credentials.username} placeholder="Username" onChange={handleChange} required />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={credentials.password} placeholder="Password" onChange={handleChange} autoComplete="on" required />
              <ImgUploader onUploaded={onUploaded} />
              <button>Continue</button>
            </form>
          </section>
        )}
      </div>
    </div>
  )
}
