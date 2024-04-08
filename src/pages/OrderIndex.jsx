import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
// import { GigList } from "../cmps/GigList.jsx"
import { loadOrders } from "../store/actions/order.actions.js"
// import { GigFilter } from "../cmps/GigFilter.jsx"
// import { useSearchParams } from "react-router-dom"
import { store } from "../store/store.js"
import { Link } from "react-router-dom"
import { socketService, SOCKET_EVENT_ORDER_UPDATED } from "../services/socket.service.js"
import {UPDATE_ORDER} from "../store/reducers/order.reducer.js"

export function OrderIndex() {
  // const [searchParams, setSearchParams] = useSearchParams(store.getState().orderModule.filterBy)
  const orders = useSelector(storeState => storeState.orderModule.orders)
  const dispatch = useDispatch() 
  // const filterBy = useSelector(storeState => storeState.orderModule.filterBy)

  // useEffect(() => {
  //   setFilterBy(orderService.getFilterFromParams(searchParams))
  // }, [])

  useEffect(() => {
    // Sanitize filterBy
    // Update
    socketService.on(SOCKET_EVENT_ORDER_UPDATED, order => {
      dispatch({
        type: UPDATE_ORDER,
        order
      })
    })


    loadOrders()
    return () => {
      socketService.off(SOCKET_EVENT_ORDER_UPDATED)

    }
    // setSearchParams(filterBy)
  }, [])

  // function onSetFilter(fieldsToUpdate) {
  //   fieldsToUpdate = { ...filterBy, ...fieldsToUpdate }
  //   setFilterBy(fieldsToUpdate)
  // }

  function getImages(gig) {
    if(Array.isArray(gig.imgUrl)) {
      // It's an array
      return gig.imgUrl[0]
    } else if(typeof gig.imgUrl === 'string') {
      // It's a string
      return [gig.imgUrl]
    }
  }
  if (!orders) return <div>Loading..</div>

  return (
    <main className="main-container">
      <section className="buyer-orders-container full">
        <div className="buyer-orders main-container">
          <div className="user-orders">
            <h1 className="orders-header">My Orders</h1>
          </div>
          {orders.length !== 0 ? (
            <section className="orders-layout">
              {orders.map(order => {
                // Calculate due date dynamically
                const orderDate = new Date(order.orderDate)
                const dueDate = new Date(orderDate)
                dueDate.setDate(dueDate.getDate() + order.gig.daysToMake)
                const formattedDueDate = dueDate.toLocaleString("default", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
                const progressWidth = order.status === "approved" ? "75%" : "25%";
                const progressClass = order.status === "approved" ? "progress-100" : "progress-25";
                return (
                  <section className="order-card-container flex" key={order._id}>
                    <div className="order-info">
                      <h5 className="card-header">Order status</h5>
                      <h4 className={`status flex ${order.status === "approved" ? "approved" : "pending"}`}>{order.status}</h4>
                      <p className="date">Due date on {formattedDueDate}</p>
                      {
                        <div className="progress-bar">
                          <div className={`progress ${progressClass}`} style={{ width: progressWidth }}></div>
                        </div>
                      }
                    </div>
                    <div className="gig flex">
                      <div className="gig-img">
                        <img src={getImages(order.gig)} alt="Gig Picture" />
                      </div>
                      <div className="gig-info">
                        <h4 className="gig-title">{order.gig.title}</h4>
                        <h5>{order.gig.tags[0]}</h5>
                        <h5 className="seller">
                          From <span className="click">{order.seller.fullname}</span>
                        </h5>
                      </div>
                    </div>
                    <div className="order-data">
                      <div className="order">
                        <h3>Order no.</h3>
                        <h3># {order._id} </h3>
                      </div>
                      <div className="order">
                        <h3>Delivery time</h3>
                        <h3>{order.gig.daysToMake} DAYS</h3>
                      </div>
                    </div>
                  </section>
                )
              })}
            </section>
          ) : (
            <div>
              <p>No orders yet</p>
              <Link to="/explore">
                <span style={{ cursor: "pointer", textDecoration: "underline" }}>Order your first gig now</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
