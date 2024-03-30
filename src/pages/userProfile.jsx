import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadOrders } from "../store/actions/order.actions.js"
import { SellerOrdersList } from "../cmps/SellerOrderList.jsx"
import { useState } from "react"


export function UserProfile() {

  const orders = useSelector(storeState => storeState.orderModule.orders)
  // const user = JSON.parse(localStorage.getItem('user'))[0]
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedInUser = userService.getLoggedinUser()
    if (loggedInUser) {    
      userService.getById(loggedInUser._id)
        .then(user => {
          setUser(user); 
          loadOrders(true); 
        })
      // loadOrders(true)
        .catch(error => {
          console.error('Error fetching user details:', error);          
        })
    }
    // loadOrders(true)
  }, [])


  if (!orders || !user) return <div>Loading..</div>
  return (
    <main className="main-container">
      <main className="user-details-container main-layout">
        <section className="details-container">
          <section className="user-details">
            <div className="user-card">
              <div className="user-profile-info">
                <div className="user-img">
                  <img src={user.imgUrl} />
                  </div>
                < div className="user-profile-label">
                  <h2>{user.fullname}</h2>
                  <h3>@{user.username}</h3>
                </div>
              </div>
            </div>
            <div className="desc-card">

            </div>
          </section>
          <section className="gigs-column user-details-layout">
            {orders.length !== 0 ? (
              <div className="manage-orders">
                <div className="order-header flex">
                  <h1>Manage Orders</h1>
                </div>
                <section>
                  <SellerOrdersList orders={orders} />
                </section>
                <div></div>
              </div>
            ) : (
              <div>
                <p>No orders to approve!</p>
              </div>
            )}
          </section>
        </section>
      </main>
    </main>
  )
}
