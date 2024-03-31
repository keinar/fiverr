import { useEffect, useState } from "react"
import { Label } from "@mui/icons-material"
import { gigService, gigCategories } from "../services/gig.service.js"
import { saveGig } from "../store/actions/gig.actions.js"
import { useNavigate } from "react-router"

export function NewGig() {
  const [gig, setGig] = useState(gigService.getEmptyGig())
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [subcategories, setSubcategories] = useState([])
  const [selectedSubcategory, setSelectedSubcategory] = useState("")

  useEffect(() => {
    if (selectedCategory !== "") {
      // Find the selected category object
      const selectedCategoryObject = gigCategories.find(category => category.name === selectedCategory)

      // Update the subcategories state with the subcategories of the selected category
      setSubcategories(selectedCategoryObject.subcategories)

      // Reset selected subcategory when category changes
      setSelectedSubcategory([])
    }
  }, [selectedCategory])

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value)
    setSelectedSubcategory("") // Reset selected subcategory when category changes
  }
  function handleChange({ target }) {
    let { name: field, value, type } = target
    setGig(prevGig => ({ ...prevGig, [field]: value }))
  }

  async function onSubmitGig(ev) {
    ev.preventDefault()
    try {
      await saveGig(gig)
      navigate("/explore")
    } catch (err) {
      console.log("Had issues saving gig", err)
    }
  }

  const { title, description } = gig
  return (
    <section className="new-gig">
      <section className="section-heading">
        <h1 className="heading">Add a gig </h1>
        <h2 className="sub-heading">Fill the required information and start earning today!</h2>
      </section>
      <form className="create-gig" onSubmit={onSubmitGig}>
        <label className="form-label">
          <span>Upload Images</span>
          <div>upload preview</div>
        </label>
        <label htmlFor="title" className="form-label">
          <span>
            <span>Title</span>
            <small className="sub-title">A short title for your gig</small>
          </span>
          <input value={title} onChange={handleChange} type="text" id="title" name="title" placeholder="type your title here" required />
        </label>
        <label htmlFor="description" className="form-label">
          <span>
            <span>Description</span>
            <small className="sub-title">Extended details about your provided service</small>
          </span>
          <textarea className="input-desc" value={description} onChange={handleChange} type="text" id="description" name="description" placeholder="Provided service will include..." required />
        </label>
        <label htmlFor="description" className="form-label">
          <span>
            <span>category</span>
            <small className="sub-title">Related category</small>
          </span>
          <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {gigCategories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="description" className="form-label">
          <span>
            <span>Sub categories</span>
            <small className="sub-title">Related category tags</small>
          </span>
          <select id="subcategorySelect" value={selectedSubcategory} onChange={event => setSelectedSubcategory(event.target.value)}>
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </label>
        <button>Create</button>
      </form>
    </section>
  )
}
