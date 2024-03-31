import { ChevronLeft, ChevronRight } from "lucide-react"
import { setFilterBy } from "../store/actions/gig.actions.js"
import { useNavigate } from "react-router"

export function GigFilter() {
  const navigate = useNavigate()

  function handleTagClick(tag) {
    const updatedFilter = {
      tags: [tag],
    }

    const fieldsToUpdate = { ...updatedFilter }
    setFilterBy(fieldsToUpdate)
    navigate("/explore")
    window.scrollTo(0, 0)
  }

  const categories = [
    "Logo Design",
    "Programming & Tech",
    "Digital Marketing",
    "Video & Animation",
    "Writing & Translation",
    "Music & Audio",
    "Business",
    "Data",
    "Photography",
    "AI Services",
  ]

  return (
    <nav id="categories-menu-package" className="categories-menu-package default has-overflow">
      <ul className="categories">
       {
        categories.map(category => (
          <li key={category} onClick={() => handleTagClick(category)}>
            {category}
          </li>
        ))
}
      </ul>
    </nav>
  )
}
