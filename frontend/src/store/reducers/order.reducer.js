export const SET_ORDERS = 'SET_ORDERS'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const SET_MODAL_DATA = 'SET_MODAL_DATA'

const initialState = {
    orders: []
}

export function orderReducer(state = initialState, action) {
    var newState = state


    switch (action.type) {
        case SET_ORDERS:
            return{
                ...state,
                orders: action.orders
            }        
        case ADD_ORDER:
            return {
                ...state,
                orders: [action.order, ...state.orders]
                // orders: state.orders ? [...state.orders, action.order] : [action.order]

            }
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order => order._id === action.order._id ? action.order : order)
            }
        case SET_MODAL_DATA:
            return {
                ...state,
                modalData: action.modalData
            }
     
        default:
            return state;
    }    
}
