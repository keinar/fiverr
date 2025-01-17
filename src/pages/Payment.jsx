import React, { useState } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import { saveOrder } from "../store/actions/order.actions"

export default function Payment() {
  const params = useParams()
  const navigate = useNavigate()
  const packageType = params.package;
  const gig = useSelector(storeState => storeState.gigModule.gigs.find(gig => gig._id == params.gigId))
  const packageDetails = gig.packages[packageType]
  const totalPrice = parseFloat(packageDetails.price) + 12.5
  const buyer = useSelector(storeState => storeState.userModule.user)


  async function onPayment() {
    try {
      const orderDate = new Date().toISOString()
      // Constructing the gig object
      
      const gigTosave = {
        _id: gig._id,
        tags: gig.tags,
        title: gig.title,
        price: gig.price,
        daysToMake: gig.daysToMake,
        packages: packageType,
        imgUrl: gig.imgUrl,
      }

      // Constructing the order object
      const order = {
        // buyer: {
        //   _id: buyerDetails._id,
        //   fullname: buyerDetails.fullname,
        //   imgUrl: buyerDetails.imgUrl,
        // },
        seller: {
          _id: gig.owner._id,
          fullname: gig.owner.fullname,
          imgUrl: gig.owner.imgUrl,
        },
        gig: gigTosave,
        status: "pending",
        orderDate: orderDate,
      }
      if(!buyer) {
        alert("you must login firstly!") 
        throw new Error("buyer not found")
      }
      // Save the order
      await saveOrder(order)

      // Navigate to the order page
      navigate("/order")
    } catch (err) {
      console.log("Had issues saving order", err)
    }
  }

  function getImages() {
    if(Array.isArray(gig.imgUrl)) {
      // It's an array
      return gig.imgUrl[0]
    } else if(typeof gig.imgUrl === 'string') {
      // It's a string
      return [gig.imgUrl]
    }
  }

  if (!gig) {
    return <div>Loading...</div>
  }

  function onSelectPaypal() {
    document.querySelector(".credit-card-details-wrapper").style.display = "none"
    document.querySelector('[class="btn continue"]').style.backgroundColor = "#0070ba"
    document.querySelector('[class="btn continue"]').innerHTML = "Paypal"
  }

  function onSelectCredit() {
    document.querySelector(".credit-card-details-wrapper").style.display = "block"
    document.querySelector('[class="btn continue"]').style.backgroundColor = "black"
    document.querySelector('[class="btn continue"]').innerHTML = "Confirm & Pay"
  }


  return (
    <main className="full main-container">
      <section className="checkout">
        <section className="order-details-container">
          <article className="call-to-action buyer">
            <figure className="preview-container">
              <img src={getImages()} alt="Selected gig image preview" />
              <span className="package-desc">{gig.title}</span>
            </figure>
            <section className="package-heading">
              <span className="pack-title">{packageDetails.header}</span>
              <span className="pack-price">{`$${packageDetails.price}`}</span>
            </section>
            <ul className="feature-list">
              {gig.packages.basic.included.map((feature, index) => (
                <span key={index} className="feature-container">
                  <img className="icon check" src="https://res.cloudinary.com/de06koxrk/image/upload/v1711916058/Lancerr/check_uniadx.svg" alt="check-icon" />
                  {feature}
                </span>
              ))}
            </ul>
          </article>
          <div className="summary">
            <div className="summary-table">
              <div className="service-fee flex">
                <span className="service">Service fee</span>
                <span>$5.25</span>
              </div>
              <div className="tax-fee flex">
                <span className="vat">Vat</span>
                <span>$8.5</span>
              </div>
            </div>
            <div className="summary-footer">
              <div className="user-price flex">
                <span className="price">You’ll pay</span>                
                <span>{`$${totalPrice.toFixed(2)}`}</span>
              </div>
              <div className="user-days flex">
                <span className="time">Total delivery time</span>
                <span>1 day</span>
              </div>
              <div className="purchase-btn-container flex">
                <button className="btn continue" onClick={onPayment}>
                  Confirm & Pay
                </button>
                <span>
                  <i className="fa-solid fa-lock" aria-hidden="true"></i> SSL Secure Payment
                </span>
              </div>
            </div>
          </div>
          <div></div>
        </section>
        <section className="payment-container">
          <section className="billing-info-wrapper">
            <header>
              <h4>Billing information</h4>
            </header>
            <div className="user-details-wrapper">
              <div className="user-info-preface">
                <p>Your invoice will be issued according to the details listed here.</p>
              </div>
              <div className="user-billing-info">
                <h4>Gal1606</h4>
                <p>Israel</p>
              </div>
            </div>
          </section>
          <section className="billing-info-wrapper payment-methods-wrapper">
            <header className="billing-info-header payment-methods-wrapper">
              <h4>Payment Options</h4>
            </header>
            <section className="payment-option" onClick={() => onSelectCredit()}>
              <label>
                <input className="form-check-input radio" type="radio" name="payment-option" id="visa" />
                <p>Credit & Debit Cards </p>
                <img src="https://res.cloudinary.com/de06koxrk/image/upload/v1711916063/Lancerr/credit-cards-68469259_i1qsi6.svg" alt="cards" className="credit-card-icons" />
              </label>
            </section>
            <form className="credit-card-details-wrapper">
              <article className="credit-card-details">
                <div className="card card-number">
                  <label htmlFor="card-number">
                    <h4>Card Number</h4>
                  </label>
                  <div className="credit-card-input-wrapper">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAGFBMVEW1trpHcEy1trq1trq1tbm1tbqzt7u1trovSEaFAAAAB3RSTlPAAPBgsOBAB5ee4QAAAElJREFUGNNjEEQCDCgcYQcGGDBkMA+AsVmLGVgRqlQYkDQxoHKY4PoZFBjYy+GgAA8HRQ9uoynmoHjBXAFmJ1MZkrdZEhlwhg4AdjQddlokVkUAAAAASUVORK5CYII="
                      alt="credit-card-icon"
                      className="card-logo"
                    />
                    <input className="input" type="text" id="card-number" placeholder="5326 1000 2000 3000" value="5326-1000-2000-3000" />
                  </div>
                </div>
                <div className="card">
                  <span className="expiration-date">
                    <label htmlFor="expiration-date">
                      <h4>Expiration date</h4>
                    </label>
                    <input type="text" name="expiration-date" id="expiration-date" className="input" placeholder="MM/YY" value="03/28" />
                  </span>
                  <div className="security-code">
                    <label htmlFor="security-code">
                      <h4>Security code</h4>
                    </label>
                    <input input type="text" name="security-code" id="security-code" className="input" placeholder="NNN" value="345" />
                  </div>
                </div>
                <div className="card">
                  <div className="first-name">
                    <label htmlFor="first-name">
                      <h4>First name</h4>
                    </label>
                    <input input type="text" name="first-name" id="first-name" className="input" placeholder="Insert first name" value="Yuval Neumann" />
                  </div>
                  <div className="last-name">
                    <label htmlFor="last-name">
                      <h4>Last name</h4>
                    </label>
                    <input type="text" name="last-name" id="last-name" className="input" placeholder="Insert last name" />
                  </div>
                </div>
              </article>
            </form>
            <section className="payment-option1">
              <label htmlFor="paypal" onClick={() => onSelectPaypal()}>
                <input className="form-check-input radio" type="radio" name="payment-option" id="paypal" />
                <img src="https://res.cloudinary.com/dgsfbxsed/image/upload/v1696838077/paypal-logo_uyhsmo.svg" alt="paypal" className="paypal-logo" />
              </label>
            </section>
          </section>
        </section>
      </section>
    </main>
  )
}
