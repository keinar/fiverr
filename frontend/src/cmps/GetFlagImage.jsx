import china from "../assets/imgs/china.png"
import thailand from "../assets/imgs/thailand.png"
import germany from "../assets/imgs/germany.png"
import uk from "../assets/imgs/uk.png"
import usa from "../assets/imgs/usa.png"

export function GetFlagImage(country) {
  switch (country) {
    case "China":
      return china
    case "Thailand":
      return thailand
    case "Germany":
      return germany
    case "United Kingdom":
      return uk
    case "United States":
      return usa
    default:
      // Return a default image or handle other cases as needed
      return null
  }
}
