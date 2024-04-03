import React from "react"

export default function BreadCrumbs({ filterBy }) {
  return (
    <div className="filter-title">
      <a className="home" href="/">
        <img className="home-icon" src="https://res.cloudinary.com/de06koxrk/image/upload/v1711916071/Lancerr/home-icon_ccidd3.svg" alt="Home" title="Go to homepage" />
      </a>
      <span className="divider">/</span>
      <a className="home-title" title="Current main category from filter variable" href={filterBy?.tags && filterBy.tags.length === 0 ? "/explore" : `/explore?tags=${filterBy?.tags}`}>
        {filterBy?.tags && filterBy.tags.length === 0 ? "Explore" : filterBy?.tags}
      </a>
    </div>
  )
}
