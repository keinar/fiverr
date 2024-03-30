import { store } from '../store.js'
import * as actions from '../reducers/order.reducer.js'
import {ADD_ORDER, SET_ORDERS, UPDATE_ORDER} from "../reducers/order.reducer.js";
import { orderService } from '../../services/order.service.js'
import {sellerOrderService} from '../../services/sellerOrder.service.js'

export async function saveOrder(orderToSave) {
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = orderToSave._id ? UPDATE_ORDER : ADD_ORDER
    try { 
        const savedOrder = await orderService.save(orderToSave)
        store.dispatch({ type, order: savedOrder })
    } catch (err) {
        console.log('Had issues saving order', err);
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function loadOrders(isSeller = false) {
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedinUser'));
  const filterBy = { loggedinUser: loggedInUser._id };

  try {
    let orders;
    if (isSeller) {
      orders = await sellerOrderService.query(filterBy);
      console.log('seeeeleer',orders)
    } else {
      orders = await orderService.query(filterBy);
    }

    store.dispatch({ type: SET_ORDERS, orders });
  } catch (err) {
    console.log('Had issues loading orders', err);
    throw err;
  } finally {
    // store.dispatch({ type: 'SET_IS_LOADING', isLoading: false })
  }
}

export function onToggleModal(modalData = null) {
    store.dispatch({
        type: SET_MODAL_DATA,
        modalData,
    })
}