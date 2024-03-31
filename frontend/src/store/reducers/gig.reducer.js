export const SET_GIGS = 'SET_GIGS'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const SET_MODAL_DATA = 'SET_MODAL_DATA'
export const SET_FILTER_BY = 'SET_FILTER_BY'


// const initialState = {
//     gigs: [{
//         "_id": "i101",
//         "title": "I will design your logo",
//         "price": 12,
//         "owner": {
//           "_id": "u101",
//           "fullname": "Dudu Da",
//           "imgUrl": "url",
//           "level": "basic/premium",
//           "rate": 4
//         },
//         "daysToMake": 3,
//         "description": "Make unique logo...",
//         "imgUrl": "",
//         "tags": [
//           "logo-design",
//           "artisitic",
//           "proffesional",
//           "accessible"
//         ],
//         "likedByUsers": ['mini-user'] // for user-wishlist : use $in
//       }]

// }

const initialState = {
    gigs: []
}

export function gigReducer(state = initialState, action) {
    var newState = state


    switch (action.type) {
        case SET_GIGS:
            return{
                ...state,
                gigs: action.gigs
            }        
        case ADD_GIG:
            return {
                ...state,
                gigs: [action.gig, ...state.gigs]
                // gigs: state.gigs ? [...state.gigs, action.gig] : [action.gig]

            }
        case UPDATE_GIG:
            return {
                ...state,
                gigs: state.gigs.map(gig => gig._id === action.gig._id ? action.gig : gig)
            }
        case SET_MODAL_DATA:
            return {
                ...state,
                modalData: action.modalData
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }

        default:
            return state;
    }    
}
