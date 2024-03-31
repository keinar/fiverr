    // OrdersList.js

    import React from 'react'
    import { saveOrder } from "../store/actions/order.actions"
    export function SellerOrdersList({ orders }) {

        function formatDueDate(orderDate) {
            const orderDateObj = new Date(orderDate)
            if (isNaN(orderDateObj.getTime())) {
                return '' // return empty string if the order date is invalid
            }

            return orderDateObj.toLocaleString("default", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })
        }


        const handleOrderFulfilled = (order) => {
            const updatedOrder = { ...order, status: 'approved' }
            
            saveOrder(updatedOrder);
        }



        return (
            <table className="order-list">
                <thead>
                    <tr>
                        <td>Buyer</td>
                        <td>Gig</td>
                        <td>Due on</td>
                        <td>Total</td>
                        <td className="order-status">Status</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>
                                <div className="user-with-img">
                                    <img src={order.buyer.imgUrl} alt="Buyer img" />
                                    {order.buyer.fullname}
                                </div>
                            </td>
                            <td className="order-title">
                                <div className="gig-img flex">
                                    <div className="long-text">
                                        <p className="book-desc">{order.gig.title}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{formatDueDate(order.orderDate)}</td>
                            <td>${order.gig.price}</td>
                            <td className="status">
                                <span className={`label ${order.status === 'pending' ? 'pending-label' : 'fulfilled-label'}`}>
                                    {order.status === 'pending' ? 'Pending' : 'approved'}
                                </span>
                                {order.status === "pending" && (
                                    <button className="fulfill-button" onClick={() => handleOrderFulfilled(order)}>
                                        Approve Order</button>

                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

