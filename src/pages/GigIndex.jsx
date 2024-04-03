import { useEffect } from "react"
import { useSelector } from "react-redux"
import { GigList } from "../cmps/GigList.jsx"
import { loadGigs, setFilterBy } from "../store/actions/gig.actions.js"
import { useSearchParams } from "react-router-dom"
import { gigService } from "../services/gig.service.js"
import { store } from "../store/store.js"
import Breadcrumbs from "../cmps/Breadcrumbs.jsx"

export function GigIndex() {
  const [searchParams, setSearchParams] = useSearchParams(store.getState().gigModule.filterBy)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  const filterBy = useSelector(storeState => storeState.gigModule.filterBy)

  useEffect(() => {
    setFilterBy(gigService.getFilterFromParams(searchParams))
  }, [])

  useEffect(() => {
    // Sanitize filterBy
    loadGigs()
    setSearchParams(filterBy)
  }, [filterBy])

  if (!gigs) return <div>Loading..</div>

  return (
    <main className="main-container">
      <section className="GigIndex full main-container">
        <Breadcrumbs filterBy={filterBy} />

        <h1 className="category-header"> {filterBy?.tags && filterBy.tags.length === 0 ? "Explore" : filterBy?.tags}</h1>
        {/* <div className="top-of-gigs">
          <div className="number-of-results">(Counter 1 from service)Num of services available</div>
          <label className="sort-container">
            <span className="sort-title">Add Filter Sort by:</span>
            <span className="drop-down-btn">Recommended</span>
          </label>
        </div> */}
        <section>
          <GigList gigs={gigs} />
        </section>
      </section>
    </main>
  )
}
