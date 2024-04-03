import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadOrders } from "../store/actions/order.actions.js"
import { SellerOrdersList } from "../cmps/SellerOrderList.jsx"
import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeliveryIcon from '@mui/icons-material/LocalShipping';
import { GigList } from "../cmps/GigList.jsx"
import { GigPreview } from "../cmps/GigPreview.jsx"
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

export function UserProfile() {

  const orders = useSelector(storeState => storeState.orderModule.orders)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)

  // const user = JSON.parse(localStorage.getItem('user'))[0]
  const [user, setUser] = useState(null);

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="prev-arrow" onClick={onClick}>
        <ArrowBackIos style={{ position: 'absolute', transform: 'translateY(-50%)' }} />
      </div>
    );
  }
  
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="next-arrow" onClick={onClick}>
        <ArrowForwardIos style={{ position: 'absolute', transform: 'translateY(-50%)' }} />
      </div>
    );
  }


  const slickSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2, // Show only 1 slide at a time
    slidesToScroll: 2, // Scroll 1 slide at a time
    variableWidth: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
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


  const userGigs = gigs.filter((gig) => gig.owner._id === user._id);

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
              <div className="user-further-info">
                <ul>
                  <li>
                    <div>
                      <LocationOnIcon className="icon" /> From
                    </div>
                    <p>{user.country}</p>
                  </li>
                  <li>
                    <div>
                      <PersonIcon className="icon" /> Member Since
                    </div>
                    <p>{user.joined}</p>
                  </li>
                  <li>
                    <div>
                      <AccessTimeIcon className="icon" /> Avg. Response Time
                    </div>
                    <p>{user.responseTime}</p>
                  </li>
                  <li>
                    <div>
                      <DeliveryIcon className="icon" /> Last Delivery
                    </div>
                    <p>{user.lastDelivery}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="desc-card">

            </div>
          </section>
          <section className="user-gigs">
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
            <section className="user-gig-list">
            <h1>My Gigs</h1>
              <Slider {...slickSettings}>
                {gigs.map((gig) => (
                  <div key={gig._id}>
                    <GigPreview gig={gig} />
                  </div>
                ))}
              </Slider>
            </section>

          </section>
        </section>
      </main>
    </main>
  )
}
