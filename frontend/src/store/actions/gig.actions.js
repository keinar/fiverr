import { store } from '../store.js'
import * as actions from '../reducers/gig.reducer.js'
import { ADD_GIG, SET_GIGS, UPDATE_GIG,SET_FILTER_BY} from "../reducers/gig.reducer.js";
import { gigService } from '../../services/gig.service.js'

export async function addGig(gig){
    try{
        const gig = gigService.
        store.dispatch({type:ADD_GIG, value:gig})
    } catch(err){
    }    
}

export async function saveGig(gigToSave) {
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = gigToSave.id ? UPDATE_GIG : ADD_GIG
    try {
        const savedGig = await gigService.save(gigToSave)
        store.dispatch({ type, gig: savedGig })
    } catch (err) {
        console.log('Had issues saving gig', err);
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export async function loadGigs() {  
    const filterBy = store.getState().gigModule.filterBy  
    try {
        const gigs = await gigService.query(filterBy)
        store.dispatch({ type: SET_GIGS, gigs })
    } catch (err) {
        console.log('Had issues loading gigs', err);
        throw err
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