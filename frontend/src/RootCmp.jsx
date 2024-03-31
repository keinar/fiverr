import React, { useEffect } from "react"
import { Routes, Route } from "react-router"
import routes from "./routes"
import { AppHeader } from "./cmps/AppHeader/AppHeader"
import { UserDetails } from "./pages/UserDetails"
import { AppFooter } from "./cmps/AppFooter/AppFooter"
import { loadGigs } from "./store/actions/gig.actions"

export function RootCmp() {
  useEffect(() => {
    // Sanitize filterBy
    loadGigs()
  }, [])

  return (
    <div>
      <AppHeader />
      <Routes>
        {routes.map(route => (
          <Route key={route.path} exact={true} element={route.component} path={route.path} />
        ))}
        <Route path="user/:id" element={<UserDetails />} />
      </Routes>
      <AppFooter />
    </div>
  )
}
