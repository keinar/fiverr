import { GigDetails } from "./pages/GigDetails/GigDetails.jsx"
import { GigIndex } from "./pages/GigIndex.jsx"
import { GigSeller } from "./pages/GigSeller.jsx"
import { HomePage } from "./pages/HomePage/HomePage.jsx"
import { NewGig } from "./pages/NewGig.jsx"
import { OrderIndex } from "./pages/OrderIndex.jsx"
import { UserProfile } from "./pages/userProfile.jsx"
import Payment from "./pages/Payment.jsx"

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    component: <HomePage />,
    label: "Lancerr",
  },
  {
    path: "explore",
    component: <GigIndex />,
    label: "Explore",
  },
  {
    path: "seller",
    component: <GigSeller />,
    label: "Become a Seller",
  },
  {
    path: "details/:gigId",
    component: <GigDetails />,
    label: "Gig Details",
  },
  {
    path: "explore/edit/:gigId?",
    component: <NewGig />,
    label: "Create a new gig",
  },
  {
    path: "payment/:gigId?/:package?",
    component: <Payment />,
    label: "Payment",
  },
  {
    path: "order",
    component: <OrderIndex />,
    label: "Order",
  },
  {
    path: "profile",
    component: <UserProfile />,
    label: "profile",
  },
]

export default routes
