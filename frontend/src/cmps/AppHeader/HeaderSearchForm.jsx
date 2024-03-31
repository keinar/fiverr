import { Search } from "lucide-react"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { setFilterBy } from "../../store/actions/gig.actions"

export default function HeaderSearchForm() {
  const [longPlaceholderValue, setLongPlaceholderValue] = useState("")
  const navigate = useNavigate()

  function handleClick(inputValue) {
    const updatedFilter = {
      txt: inputValue,
    }
    if (!inputValue) return
    const fieldsToUpdate = { ...updatedFilter }
    setFilterBy(fieldsToUpdate)
    navigate("/explore")
    window.scrollTo(0, 0)
  }
  return (
    <form>
      <input type="search" className="short-placeholder" placeholder="Find services" />
      <input type="search" className="long-placeholder" placeholder="What service are you looking for today?" value={longPlaceholderValue} onChange={e => setLongPlaceholderValue(e.target.value)} />
      <button type="button" className="submit-button" onClick={() => handleClick(longPlaceholderValue)}>
        <Search size={18} color="white" />
      </button>
    </form>
  )
}
